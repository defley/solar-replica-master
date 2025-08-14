"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormDataMap = { [k: string]: string };

const STEPS = [1, 2, 3, 4, 5] as const;

export default function ContactWizard() {
  const [step, setStep] = useState<(typeof STEPS)[number]>(1);
  const [formData, setFormData] = useState<FormDataMap>({});
  const [sending, setSending] = useState(false);
  const [isSyndic, setIsSyndic] = useState<boolean | null>(null);

  // ---- Leaflet map (client-only) ----
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!mapDivRef.current) return;

    (async () => {
      const L = await import("leaflet");
      
      // Fix for default markers in leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // default Cannes
      const map = L.map(mapDivRef.current).setView([43.5528, 7.0174], 12);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      map.on("click", (e: any) => {
        if (markerRef.current) map.removeLayer(markerRef.current);
        markerRef.current = L.marker(e.latlng).addTo(map);
        const coords = `${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`;
        setFormValue("coords", coords);
      });
    })();

    return () => {
      try {
        mapRef.current?.remove();
        mapRef.current = null;
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- helpers ----
  const setFormValue = (name: string, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValue(name, value);
    if (name === "role") {
      const syndic = value === "syndic_pro" || value === "syndic_benevole";
      setIsSyndic(syndic);
    }
  };

  const progressPercent = useMemo(() => Math.round((step / STEPS.length) * 100), [step]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length) as typeof STEPS[number]);
  const prev = () => setStep((s) => Math.max(s - 1, 1) as typeof STEPS[number]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      fd.append("_subject", "Nouveau dossier projet solaire copropriété");
      fd.append("_replyto", formData.email || "");

      // Formspree endpoint for romain@claudinon.fr
      const endpoint = "https://formspree.io/f/xdkokdgy";

      const res = await fetch(endpoint, { 
        method: "POST", 
        body: fd, 
        headers: { Accept: "application/json" } 
      });

      if (res.ok) {
        alert("Merci ! Votre demande a bien été envoyée. Nous revenons vers vous rapidement.");
        setFormData({});
        setIsSyndic(null);
        setStep(1);
        // clear marker
        try {
          if (markerRef.current && mapRef.current) {
            mapRef.current.removeLayer(markerRef.current);
            markerRef.current = null;
          }
        } catch {}
      } else {
        // Fallback mailto
        window.location.href = `mailto:romain@claudinon.fr?subject=Dossier%20projet%20solaire%20copro&body=${encodeURIComponent(
          Object.entries(formData)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n")
        )}`;
      }
    } catch {
      window.location.href = `mailto:romain@claudinon.fr?subject=Dossier%20projet%20solaire%20copro&body=${encodeURIComponent(
        Object.entries(formData)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      )}`;
    } finally {
      setSending(false);
    }
  };

  // ---- UI ----
  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );

  const Section = ({ n, children, title }: { n: number; title: string; children: React.ReactNode }) => (
    <section className={step === n ? "block" : "hidden"}>
      <h2 className="text-xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Simuler un projet solaire pour votre copropriété
        </h1>
        <p className="text-muted-foreground mb-6">
          Répondez à quelques questions (1–2 minutes). Nous revenons vers vous rapidement.
        </p>
        <div className="h-2 rounded-full bg-muted overflow-hidden max-w-md mx-auto">
          <div 
            className="h-full bg-cta transition-all duration-300 ease-out" 
            style={{ width: `${progressPercent}%` }} 
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Étape {step} sur {STEPS.length}
        </p>
      </div>

      <form onSubmit={submit} className="bg-card border border-border rounded-xl p-8 shadow-lg">
        {/* Étape 1 */}
        <Section n={1} title="Localisation de votre copropriété">
          <div ref={mapDivRef} className="h-80 rounded-lg border border-border shadow-sm" />
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Adresse de l'immeuble">
              <Input
                name="adresse"
                required
                placeholder="12 av. de la République, 06400 Cannes"
                value={formData.adresse || ""}
                onChange={onChange}
              />
            </Field>
            <Field label="Coordonnées (lat, lon)">
              <Input
                name="coords"
                readOnly
                placeholder="Cliquez sur la carte"
                className="bg-muted"
                value={formData.coords || ""}
                onChange={onChange}
              />
            </Field>
          </div>
          <p className="text-sm text-muted-foreground">
            💡 Astuce : cliquez sur la carte pour positionner précisément le toit.
          </p>
        </Section>

        {/* Étape 2 */}
        <Section n={2} title="Êtes-vous le syndic ?">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Vous êtes ?">
              <select
                name="role"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.role || ""}
                onChange={onChange}
              >
                <option value="">— Sélectionner —</option>
                <option value="syndic_pro">Syndic professionnel</option>
                <option value="syndic_benevole">Syndic bénévole</option>
                <option value="conseil_syndical">Membre du conseil syndical</option>
                <option value="coproprietaire">Copropriétaire</option>
                <option value="autre">Autre</option>
              </select>
            </Field>
          </div>

          {/* Coordonnées syndic si NON-syndic */}
          {isSyndic === false && (
            <div className="grid md:grid-cols-2 gap-6 p-4 bg-muted rounded-lg">
              <Field label="Nom du syndic">
                <Input
                  name="syndic_nom"
                  placeholder="Ex. FONCIA / NEXITY / Citya…"
                  value={formData.syndic_nom || ""}
                  onChange={onChange}
                />
              </Field>
              <Field label="Email / Téléphone du syndic">
                <Input
                  name="syndic_contact"
                  placeholder="contact@syndic.fr / 01 23 45 67 89"
                  value={formData.syndic_contact || ""}
                  onChange={onChange}
                />
              </Field>
            </div>
          )}
        </Section>

        {/* Étape 3 */}
        <Section n={3} title="Toiture & surface disponible">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Type de toiture">
              <select
                name="type_toiture"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.type_toiture || ""}
                onChange={onChange}
              >
                <option value="">— Sélectionner —</option>
                <option>Toiture plate</option>
                <option>Toiture en pente</option>
                <option>Je ne sais pas</option>
              </select>
            </Field>
            <Field label="Revêtement">
              <select
                name="revetement"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.revetement || ""}
                onChange={onChange}
              >
                <option value="">— Sélectionner —</option>
                <option>Bitume / membrane</option>
                <option>Bac acier</option>
                <option>Tuiles</option>
                <option>Je ne sais pas</option>
              </select>
            </Field>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Surface exploitable (m²)">
              <Input
                name="surface_m2"
                type="number"
                min="0"
                placeholder="Ex. 600"
                required
                value={formData.surface_m2 || ""}
                onChange={onChange}
              />
            </Field>
            <Field label="Accès toiture">
              <select
                name="acces_toiture"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.acces_toiture || ""}
                onChange={onChange}
              >
                <option>Oui</option>
                <option>Non</option>
                <option>À vérifier</option>
              </select>
            </Field>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              ℹ️ Surface minimale requise : <strong>500 m²</strong>
            </p>
          </div>
        </Section>

        {/* Étape 4 */}
        <Section n={4} title="Détails techniques & calendrier">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Ombrages significatifs ?">
              <select
                name="ombrages"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.ombrages || ""}
                onChange={onChange}
              >
                <option>Non</option>
                <option>Oui</option>
                <option>À vérifier</option>
              </select>
            </Field>
            <Field label="Local technique / TGBT accessible ?">
              <select
                name="tgbt"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.tgbt || ""}
                onChange={onChange}
              >
                <option>Oui</option>
                <option>Non</option>
                <option>À vérifier</option>
              </select>
            </Field>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Échéance d'AG (si connue)">
              <Input
                name="ag_date"
                type="month"
                value={formData.ag_date || ""}
                onChange={onChange}
              />
            </Field>
            <Field label="Préférence de rémunération">
              <select
                name="remuneration"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.remuneration || ""}
                onChange={onChange}
              >
                <option value="">— Sélectionner —</option>
                <option>Paiement unique (30–50 k€ selon surface)</option>
                <option>Loyer annuel sur 30 ans</option>
                <option>À discuter</option>
              </select>
            </Field>
          </div>

          <Field label="Message libre">
            <textarea
              name="message"
              rows={4}
              placeholder="Précisions (ex : projets de travaux, contraintes, contacts syndic…)"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.message || ""}
              onChange={onChange}
            />
          </Field>
        </Section>

        {/* Étape 5 */}
        <Section n={5} title="Vos coordonnées">
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Prénom">
              <Input
                name="prenom"
                required
                value={formData.prenom || ""}
                onChange={onChange}
              />
            </Field>
            <Field label="Nom">
              <Input
                name="nom"
                required
                value={formData.nom || ""}
                onChange={onChange}
              />
            </Field>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Email">
              <Input
                name="email"
                type="email"
                required
                value={formData.email || ""}
                onChange={onChange}
              />
            </Field>
            <Field label="Téléphone">
              <Input
                name="tel"
                type="tel"
                required
                value={formData.tel || ""}
                onChange={onChange}
              />
            </Field>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              🔒 Les informations ci-dessus seront transmises à <strong>romain@claudinon.fr</strong>
            </p>
          </div>
        </Section>

        {/* Controls */}
        <div className="flex gap-4 pt-8 border-t border-border">
          <Button 
            type="button" 
            variant="outline" 
            onClick={prev} 
            disabled={step === 1}
            className="flex-1"
          >
            Précédent
          </Button>
          {step < STEPS.length ? (
            <Button 
              type="button" 
              variant="cta"
              onClick={next}
              className="flex-1"
            >
              Suivant
            </Button>
          ) : (
            <Button 
              type="submit" 
              variant="cta"
              disabled={sending}
              className="flex-1"
            >
              {sending ? "Envoi..." : "Envoyer ma demande"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}