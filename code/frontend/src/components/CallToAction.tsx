import React from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function CallToAction() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            [CTA HEADLINE]
          </h2>
          <p className="text-xl text-white/90 mb-10">
            [Compelling call-to-action description that motivates users to take the next step.]
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="solid"
              size="xl"
              onClick={() => navigate("/signup")}
              className="bg-white text-blue-700 hover:bg-gray-100"
            >
              [PRIMARY BUTTON]
            </Button>
            <Button 
              variant="outline"
              size="xl"
              onClick={() => navigate("/demo")}
              className="border-white text-white hover:bg-white/10"
            >
              [SECONDARY BUTTON]
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-white/80">
            [Additional information or incentive]
          </p>
        </motion.div>
      </div>
    </section>
  );
}
