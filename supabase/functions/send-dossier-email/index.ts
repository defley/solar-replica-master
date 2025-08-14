
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DossierData {
  address: string;
  coordinates: string | null;
  role: string;
  syndic_name?: string;
  syndic_contact?: string;
  roof_type: string;
  roof_covering: string;
  exploitable_surface: string;
  roof_access: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  full_address?: string;
  company?: string;
  message?: string;
}

// Input validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9\s\-\+\(\)\.]{8,20}$/;
  return phoneRegex.test(phone);
};

const sanitizeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const rawBody = await req.text();
    console.log("Raw body received:", rawBody);
    
    // Check request size
    if (rawBody.length > 10000) {
      return new Response(
        JSON.stringify({ error: "Requête trop volumineuse" }),
        { status: 413, headers: corsHeaders }
      );
    }

    const dossierData: DossierData = JSON.parse(rawBody);
    console.log("Parsed dossier data:", dossierData);
    
    // Basic validation - only check what's really required
    if (!dossierData.first_name || !dossierData.last_name || !dossierData.email) {
      console.log("Missing critical fields:", {
        first_name: !dossierData.first_name,
        last_name: !dossierData.last_name,
        email: !dossierData.email
      });
      return new Response(
        JSON.stringify({ error: "Champs obligatoires manquants" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Email format validation
    if (!validateEmail(dossierData.email)) {
      return new Response(
        JSON.stringify({ error: "Format d'email invalide" }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    console.log("All validations passed, proceeding with email send");

    // Construire le contenu de l'email avec sanitisation
    const emailContent = `
      <h1>Nouveau dossier copropriété solaire</h1>
      
      <h2>Informations de contact</h2>
      <p><strong>Nom:</strong> ${sanitizeHtml(dossierData.first_name)} ${sanitizeHtml(dossierData.last_name)}</p>
      <p><strong>Email:</strong> ${sanitizeHtml(dossierData.email)}</p>
      <p><strong>Téléphone:</strong> ${dossierData.phone ? sanitizeHtml(dossierData.phone) : 'Non renseigné'}</p>
      ${dossierData.company ? `<p><strong>Entreprise:</strong> ${sanitizeHtml(dossierData.company)}</p>` : ''}
      
      <h2>Rôle dans la copropriété</h2>
      <p><strong>Rôle:</strong> ${dossierData.role ? sanitizeHtml(dossierData.role) : 'Non renseigné'}</p>
      ${dossierData.syndic_name ? `<p><strong>Nom du syndic:</strong> ${sanitizeHtml(dossierData.syndic_name)}</p>` : ''}
      ${dossierData.syndic_contact ? `<p><strong>Contact syndic:</strong> ${sanitizeHtml(dossierData.syndic_contact)}</p>` : ''}
      
      <h2>Localisation</h2>
      <p><strong>Adresse:</strong> ${dossierData.address ? sanitizeHtml(dossierData.address) : 'Non renseignée'}</p>
      ${dossierData.full_address ? `<p><strong>Adresse complète:</strong> ${sanitizeHtml(dossierData.full_address)}</p>` : ''}
      ${dossierData.coordinates ? `<p><strong>Coordonnées:</strong> ${sanitizeHtml(dossierData.coordinates)}</p>` : ''}
      
      <h2>Informations toiture</h2>
      <p><strong>Type de toiture:</strong> ${dossierData.roof_type ? sanitizeHtml(dossierData.roof_type) : 'Non renseigné'}</p>
      <p><strong>Revêtement:</strong> ${dossierData.roof_covering ? sanitizeHtml(dossierData.roof_covering) : 'Non renseigné'}</p>
      <p><strong>Surface exploitable:</strong> ${dossierData.exploitable_surface ? sanitizeHtml(dossierData.exploitable_surface) : 'Non renseignée'}</p>
      <p><strong>Accès toiture:</strong> ${dossierData.roof_access ? sanitizeHtml(dossierData.roof_access) : 'Non renseigné'}</p>
      
      ${dossierData.message ? `
      <h2>Message</h2>
      <p>${sanitizeHtml(dossierData.message)}</p>
      ` : ''}
      
      <hr>
      <p><em>Ce message a été envoyé via le formulaire de contact de Copro Solaire.</em></p>
    `;

    // Envoyer l'email à l'équipe
    console.log("Sending email to romain@claudinon.fr...");
    console.log("RESEND_API_KEY exists:", !!Deno.env.get("RESEND_API_KEY"));
    
    try {
      const emailResponse = await resend.emails.send({
        from: "Copro Solaire <onboarding@resend.dev>",
        to: ["romain@claudinon.fr"],
        subject: `Nouveau dossier: ${sanitizeHtml(dossierData.first_name)} ${sanitizeHtml(dossierData.last_name)} - ${dossierData.role || 'Rôle non précisé'}`,
        html: emailContent,
        replyTo: dossierData.email,
      });

      console.log("Email sent successfully:", emailResponse);

    } catch (emailError) {
      console.error("Error sending main email:", emailError);
      throw emailError;
    }

    // Envoyer un email de confirmation au client
    console.log("Sending confirmation email to:", dossierData.email);
    try {
      const confirmationEmail = await resend.emails.send({
        from: "Copro Solaire <onboarding@resend.dev>",
        to: [dossierData.email],
        subject: "Confirmation de réception - Votre dossier copropriété solaire",
        html: `
          <h1>Merci ${sanitizeHtml(dossierData.first_name)} !</h1>
          <p>Nous avons bien reçu votre dossier pour le projet solaire de votre copropriété.</p>
          <p>Notre équipe va étudier votre demande et vous recontacter sous 48h pour la suite du processus.</p>
          <p>En attendant, n'hésitez pas à nous contacter au <strong>07 82 90 56 69</strong> si vous avez des questions.</p>
          <p>Cordialement,<br>L'équipe Copro Solaire</p>
        `,
      });

    } catch (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError);
      // Don't throw here, main email is more important
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Dossier envoyé avec succès",
        emailId: emailResponse.data?.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in send-dossier-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erreur lors de l'envoi du dossier",
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
