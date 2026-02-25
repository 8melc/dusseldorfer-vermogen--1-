import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import brain from "brain"; // Import brain client
import { Advisor } from "types"; // Import Advisor type from generated types

// Interface for Advisor Data - now matches the Pydantic model from backend (via types.ts)
// We keep this for clarity, but Advisor from "types" is the source of truth.
/*
interface Advisor {
  slug: string | null; // Updated to be optional based on Pydantic model
  full_name: string | null;
  role: string | null;
  image_url: string | null;
}
*/

interface TrustedAdvisorGridProps {}

export const TrustedAdvisorGrid: React.FC<TrustedAdvisorGridProps> = () => {
  const sectionTitle = "Trusted Advisors";
  const sectionSub = "Persönlichkeiten, die Vermögen verstehen";

  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await brain.get_advisors({}); // Call the new brain method
        if (response.ok) {
          const data = await response.json();
          setAdvisors(data || []); // Ensure data is an array
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch advisors: ${response.status} ${errorText || response.statusText}`);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred while fetching advisors.");
      }
      setLoading(false);
    };

    fetchAdvisors();
  }, []);

  // TODO: Implement parallax-tilt effect for cards if react-parallax-tilt is installed/approved.

  if (loading) {
    return (
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl">Lade Advisoren...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background text-destructive-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl">Fehler beim Laden der Advisoren: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary tracking-heading-pwf">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-xl text-foreground/80">
            {sectionSub}
          </p>
        </div>

        {advisors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <div
                key={advisor.slug || `advisor-${index}`} // Use index as fallback key if slug is null
                className="bg-background-accent border border-border rounded-pwf overflow-hidden shadow-lg transition-shadow hover:shadow-xl flex flex-col group"
              >
                <div className="aspect-square w-full bg-muted overflow-hidden">
                  <img 
                    src={advisor.image_url || "/images/advisors/placeholder.webp"} // Use actual image_url or a default placeholder
                    alt={advisor.full_name || "Advisor"}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        if (parent.querySelector(".image-fallback-div")) return;
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-red-500 text-white image-fallback-div'; 
                        fallbackDiv.innerText = 'No Image';
                        parent.appendChild(fallbackDiv);
                      }
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-primary mb-1">
                    {advisor.full_name || "N/A"}
                  </h3>
                  <p className="text-foreground/70 mb-4 text-sm flex-grow">
                    {advisor.role || "N/A"}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-auto w-full rounded-pwf border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    disabled={!advisor.slug} // Disable button if no slug
                  >
                    <Link to={advisor.slug ? `/trusted-advisors/${advisor.slug}` : "#"}>
                      Profil ansehen
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">
            Derzeit sind keine Beraterinformationen verfügbar.
          </p>
        )}
      </div>
    </section>
  );
};
