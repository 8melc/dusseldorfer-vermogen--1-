// New Stripe configuration file with a different name
import { useState, useEffect } from "react";
import brain from "brain";
import { toast } from "sonner";

// Default config with placeholder values (will be replaced after fetching)
export const defaultStripeConfig = {
  pricingTableId: "",
  publishableKey: "",
};

// Export a constant for backward compatibility
export const stripeConfig = {
  pricingTableId: "",
  publishableKey: "",
};

// Hook to fetch Stripe configuration
export const useStripeConfig = () => {
  const [config, setConfig] = useState(defaultStripeConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await brain.get_stripe_public_keys();
        const data = await response.json();

        const newConfig = {
          pricingTableId: data.pricing_table_id,
          publishableKey: data.publishable_key,
        };

        // Update both the state and the exported constant
        setConfig(newConfig);
        stripeConfig.pricingTableId = newConfig.pricingTableId;
        stripeConfig.publishableKey = newConfig.publishableKey;
      } catch (err) {
        console.error("Failed to fetch Stripe configuration:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        toast.error("Failed to load Stripe configuration");
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
};
