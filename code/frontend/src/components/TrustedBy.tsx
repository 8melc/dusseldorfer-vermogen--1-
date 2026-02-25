import React from "react";
import { 
  SiSlack, 
  SiShopify, 
  SiDropbox, 
  SiAsana,
  SiMeta,
  SiAmazon,
  SiMicrosoft,
  SiIbm
} from "react-icons/si";

export function TrustedBy() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-gray-600 text-lg">Top companies trust us to automate work that solves their unique business problems—no coding required.</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {/* Use professionally rendered SVG icons from react-icons */}
          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <SiSlack className="h-9 w-auto text-gray-500" />
          </div>
          
          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <SiMeta className="h-8 w-auto text-gray-500" />
          </div>
          
          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <SiShopify className="h-9 w-auto text-gray-500" />
          </div>
          
          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <SiDropbox className="h-8 w-auto text-gray-500" />
          </div>
          
          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <SiAsana className="h-8 w-auto text-gray-500" />
          </div>

          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <SiAmazon className="h-8 w-auto text-gray-500" />
          </div>
          
          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <SiMicrosoft className="h-8 w-auto text-gray-500" />
          </div>
          
          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <SiIbm className="h-8 w-auto text-gray-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
