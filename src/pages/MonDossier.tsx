import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, ChevronRight, MapPin, Home, Wrench, Phone, Mail } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface FormData {
  address: string;
  coordinates: { lat: number; lng: number } | null;
  role: string;
  syndicName: string;
  syndicContact: string;
  roofType: string;
  roofCovering: string;
  exploitableSurface: string;
  roofAccess: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fullAddress: string;
  company: string;
  message: string;
}

const MonDossier = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    address: "",
    coordinates: null,
    role: "",
    syndicName: "",
    syndicContact: "",
    roofType: "",
    roofCovering: "",
    exploitableSurface: "",
    roofAccess: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fullAddress: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);

  const totalSteps = 4;

  useEffect(() => {
    document.title = "Mon Dossier - Copro Solaire";
  }, []);

  // Initialize map when step 1 is active
  useEffect(() => {
    if (currentStep === 1 && mapContainer.current && !map.current) {
      // Fix Leaflet default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      map.current = L.map(mapContainer.current).setView([46.603354, 1.888334], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map.current);

      map.current.on('click', (e) => {
        const { lat, lng } = e.latlng;
        updateFormData("coordinates", { lat, lng });
        
        if (marker.current) {
          map.current?.removeLayer(marker.current);
        }
        
        marker.current = L.marker([lat, lng]).addTo(map.current!);
        
        // Reverse geocoding (basic approximation)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(res => res.json())
          .then(data => {
            if (data.display_name) {
              updateFormData("address", data.display_name);
            }
          })
          .catch(() => {
            // Silent fail for geocoding
          });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        marker.current = null;
      }
    };
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const submitData = {
      ...formData,
      coordinates: formData.coordinates ? `${formData.coordinates.lat}, ${formData.coordinates.lng}` : "Non spécifiées",
      subject: "Nouveau dossier copropriété solaire",
      _replyto: formData.email
    };

    try {
      const response = await fetch("https://formspree.io/f/xdkovpzy", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        toast({
          title: "Dossier envoyé !",
          description: "Nous vous recontacterons sous 48h pour étudier votre projet.",
          duration: 5000,
        });
        
        // Reset form
        setCurrentStep(1);
        setFormData({
          address: "",
          coordinates: null,
          role: "",
          syndicName: "",
          syndicContact: "",
          roofType: "",
          roofCovering: "",
          exploitableSurface: "",
          roofAccess: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          fullAddress: "",
          company: "",
          message: ""
        });
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      // Fallback to mailto
      const subject = encodeURIComponent("Nouveau dossier copropriété solaire");
      const body = encodeURIComponent(`
Bonjour,

Voici mon dossier pour un projet solaire en copropriété :

== LOCALISATION ==
Adresse : ${formData.address}
Coordonnées GPS : ${formData.coordinates ? `${formData.coordinates.lat}, ${formData.coordinates.lng}` : "Non spécifiées"}

== QUI SUIS-JE ==
Rôle : ${formData.role}
${formData.syndicName ? `Nom du syndic : ${formData.syndicName}` : ""}
${formData.syndicContact ? `Contact du syndic : ${formData.syndicContact}` : ""}

== TOITURE ==
Type de toiture : ${formData.roofType}
Revêtement : ${formData.roofCovering}
Surface exploitable : ${formData.exploitableSurface} m²
Accès toiture : ${formData.roofAccess}

== MES COORDONNÉES ==
Nom : ${formData.firstName} ${formData.lastName}
Email : ${formData.email}
Téléphone : ${formData.phone}
Adresse complète : ${formData.fullAddress}
${formData.company ? `Entreprise : ${formData.company}` : ""}

== MESSAGE ==
${formData.message}

Cordialement,
${formData.firstName} ${formData.lastName}
      `);
      
      window.location.href = `mailto:romain@claudinon.fr?subject=${subject}&body=${body}`;
      
      toast({
        title: "Ouverture de votre client email",
        description: "Votre dossier a été préparé dans un email. Envoyez-le pour finaliser votre demande.",
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof FormData, value: string | string[] | { lat: number; lng: number } | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roleOptions = [
    "Syndic professionnel",
    "Syndic bénévole", 
    "Membre du conseil syndical",
    "Copropriétaire",
    "Autre"
  ];

  const roofTypeOptions = [
    "Toiture plate",
    "Toiture en pente", 
    "Je ne sais pas"
  ];

  const roofCoveringOptions = [
    "Bitume / membrane étanche",
    "Bac acier",
    "Tuiles",
    "Je ne sais pas"
  ];

  const roofAccessOptions = [
    "Oui, accès facile",
    "Oui, mais accès difficile",
    "Non",
    "À vérifier"
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container-xl py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/assets/home-hero.png" 
                alt="Copro Solaire" 
                className="h-8"
              />
              <span className="font-display text-xl">copro solaire</span>
            </div>
            <a 
              href="tel:+33782905669" 
              className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground"
            >
              <Phone className="w-4 h-4" />
              07 82 90 56 69
            </a>
          </div>
        </div>
      </header>

      <main className="container-xl py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground/60">Étape {currentStep} sur {totalSteps}</span>
              <span className="text-sm text-foreground/60">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-cta rounded-full h-2 transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {currentStep === 1 && <><MapPin className="w-5 h-5 text-cta" /> Localisation de votre copropriété</>}
                {currentStep === 2 && <><Home className="w-5 h-5 text-cta" /> Qui êtes-vous ?</>}
                {currentStep === 3 && <><Wrench className="w-5 h-5 text-cta" /> Toiture & surface disponible</>}
                {currentStep === 4 && <><Mail className="w-5 h-5 text-cta" /> Vos coordonnées</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Location */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Où se situe votre copropriété ?</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Adresse de l'immeuble</Label>
                        <Input
                          id="address"
                          placeholder="Tapez l'adresse de votre copropriété"
                          value={formData.address}
                          onChange={(e) => updateFormData("address", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Cliquez sur la carte pour localiser précisément votre copropriété</Label>
                        <div 
                          ref={mapContainer} 
                          className="h-64 w-full rounded-md border border-input bg-muted"
                        />
                        {formData.coordinates && (
                          <p className="text-sm text-foreground/60 mt-2">
                            📍 Position sélectionnée : {formData.coordinates.lat.toFixed(6)}, {formData.coordinates.lng.toFixed(6)}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60 mt-4">
                      💡 Pour un projet solaire en copropriété, nous recommandons une surface de toiture minimum de 500 m².
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Role */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Qui êtes-vous ?</h3>
                    <p className="text-foreground/70 mb-4">
                      Précisez votre rôle dans la copropriété pour que nous puissions adapter notre approche.
                    </p>
                    <RadioGroup
                      value={formData.role}
                      onValueChange={(value) => updateFormData("role", value)}
                    >
                      {roleOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {formData.role && !formData.role.startsWith("Syndic") && (
                      <div className="mt-6 p-4 bg-muted rounded-lg space-y-4">
                        <h4 className="font-medium">Coordonnées du syndic</h4>
                        <p className="text-sm text-foreground/70">
                          Pour avancer sur le projet, nous aurons besoin de contacter le syndic de votre copropriété.
                        </p>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="syndicName">Nom du syndic ou de l'agence</Label>
                            <Input
                              id="syndicName"
                              placeholder="Ex: Cabinet Martin ou M. Dupont"
                              value={formData.syndicName}
                              onChange={(e) => updateFormData("syndicName", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="syndicContact">Téléphone ou email du syndic</Label>
                            <Input
                              id="syndicContact"
                              placeholder="01 23 45 67 89 ou contact@syndic.fr"
                              value={formData.syndicContact}
                              onChange={(e) => updateFormData("syndicContact", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Roof Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Informations sur la toiture</h3>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium">Type de toiture</Label>
                        <RadioGroup
                          value={formData.roofType}
                          onValueChange={(value) => updateFormData("roofType", value)}
                          className="mt-2"
                        >
                          {roofTypeOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`roof-${option}`} />
                              <Label htmlFor={`roof-${option}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Revêtement de la toiture</Label>
                        <RadioGroup
                          value={formData.roofCovering}
                          onValueChange={(value) => updateFormData("roofCovering", value)}
                          className="mt-2"
                        >
                          {roofCoveringOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`covering-${option}`} />
                              <Label htmlFor={`covering-${option}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label htmlFor="exploitableSurface">Surface exploitable estimée (en m²)</Label>
                        <Input
                          id="exploitableSurface"
                          type="number"
                          placeholder="Ex: 800"
                          value={formData.exploitableSurface}
                          onChange={(e) => updateFormData("exploitableSurface", e.target.value)}
                          className="mt-2"
                        />
                        <p className="text-sm text-foreground/60 mt-1">
                          Surface de toiture disponible pour l'installation (minimum recommandé : 500 m²)
                        </p>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Accès à la toiture</Label>
                        <RadioGroup
                          value={formData.roofAccess}
                          onValueChange={(value) => updateFormData("roofAccess", value)}
                          className="mt-2"
                        >
                          {roofAccessOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`access-${option}`} />
                              <Label htmlFor={`access-${option}`}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Info */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Vos coordonnées</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => updateFormData("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => updateFormData("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="fullAddress">Adresse complète *</Label>
                      <Input
                        id="fullAddress"
                        placeholder="Adresse, code postal, ville"
                        value={formData.fullAddress}
                        onChange={(e) => updateFormData("fullAddress", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Entreprise / Organisation (optionnel)</Label>
                      <Input
                        id="company"
                        placeholder="Nom de votre entreprise ou organisation"
                        value={formData.company}
                        onChange={(e) => updateFormData("company", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message libre</Label>
                      <Textarea
                        id="message"
                        placeholder="Précisions sur votre projet, contraintes particulières, questions..."
                        value={formData.message}
                        onChange={(e) => updateFormData("message", e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button 
                    variant="cta" 
                    onClick={handleNext}
                    className="flex items-center gap-2"
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    variant="cta" 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer mon dossier"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/60">
              Des questions ? Contactez-nous au{" "}
              <a 
                href="tel:+33782905669" 
                className="text-cta hover:underline font-medium"
              >
                07 82 90 56 69
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MonDossier;