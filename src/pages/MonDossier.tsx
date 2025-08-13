import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, ChevronRight, MapPin, Calculator, FileText, Phone } from "lucide-react";

interface FormData {
  location: string;
  terrainSize: string;
  historicUsage: string[];
  currentUsage: string;
  ownership: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalInfo: string;
}

const MonDossier = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    location: "",
    terrainSize: "",
    historicUsage: [],
    currentUsage: "",
    ownership: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    additionalInfo: ""
  });
  const { toast } = useToast();

  const totalSteps = 5;

  useEffect(() => {
    document.title = "Mon Dossier - Copro Solaire";
  }, []);

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

  const handleSubmit = () => {
    toast({
      title: "Dossier envoyé !",
      description: "Nous vous recontacterons sous 48h pour étudier votre projet.",
      duration: 5000,
    });
  };

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const historicUsageOptions = [
    "Carrière / mine",
    "Site industriel", 
    "Terrain cultivé",
    "Terrain de pâturage",
    "Friche / prairie",
    "Autre",
    "Je ne sais pas"
  ];

  const currentUsageOptions = [
    "Terrain cultivé",
    "Terrain de pâturage", 
    "Friche / prairie",
    "Boisé",
    "Autre",
    "Je ne sais pas"
  ];

  const ownershipOptions = [
    "Je suis propriétaire",
    "Je suis locataire/fermier",
    "Autre situation"
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
                {currentStep === 1 && <><MapPin className="w-5 h-5 text-cta" /> Localisation de votre terrain</>}
                {currentStep === 2 && <><Calculator className="w-5 h-5 text-cta" /> Usage historique du terrain</>}
                {currentStep === 3 && <><FileText className="w-5 h-5 text-cta" /> Usage actuel du terrain</>}
                {currentStep === 4 && <><FileText className="w-5 h-5 text-cta" /> Situation juridique</>}
                {currentStep === 5 && <><Phone className="w-5 h-5 text-cta" /> Vos coordonnées</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Location */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Tout d'abord, où se situe votre terrain ?</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="location">Adresse du terrain</Label>
                        <Input
                          id="location"
                          placeholder="Tapez l'adresse de votre terrain"
                          value={formData.location}
                          onChange={(e) => updateFormData("location", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="terrainSize">Taille estimée du terrain en hectares</Label>
                        <Input
                          id="terrainSize"
                          type="number"
                          placeholder="Ex: 2.5"
                          value={formData.terrainSize}
                          onChange={(e) => updateFormData("terrainSize", e.target.value)}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60 mt-4">
                      ⚠ À l'exception des projets sur toiture (hangar, serre, ombrière de parking), 
                      la surface minimale d'un parc solaire est de 1 ha.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Historic Usage */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Quel est l'usage historique du terrain ?</h3>
                    <p className="text-foreground/70 mb-4">
                      Sélectionner l'utilisation passée de votre terrain, plusieurs choix possibles.
                    </p>
                    <div className="space-y-3">
                      {historicUsageOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={option}
                            checked={formData.historicUsage.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateFormData("historicUsage", [...formData.historicUsage, option]);
                              } else {
                                updateFormData("historicUsage", formData.historicUsage.filter(u => u !== option));
                              }
                            }}
                          />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Current Usage */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Quel est l'usage actuel du terrain ?</h3>
                    <RadioGroup
                      value={formData.currentUsage}
                      onValueChange={(value) => updateFormData("currentUsage", value)}
                    >
                      {currentUsageOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 4: Ownership */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Quelle est votre situation juridique ?</h3>
                    <RadioGroup
                      value={formData.ownership}
                      onValueChange={(value) => updateFormData("ownership", value)}
                    >
                      {ownershipOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 5: Contact Info */}
              {currentStep === 5 && (
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
                      <Label htmlFor="additionalInfo">Informations complémentaires</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Précisions sur votre projet, questions particulières..."
                        value={formData.additionalInfo}
                        onChange={(e) => updateFormData("additionalInfo", e.target.value)}
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
                    className="flex items-center gap-2"
                  >
                    Envoyer mon dossier
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