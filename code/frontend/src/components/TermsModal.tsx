import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Dialog";

type TermsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Terms of Service
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Last updated: March 5, 2025
          </DialogDescription>
        </DialogHeader>

        <div className="prose prose-sm max-w-none px-6 py-5 overflow-y-auto max-h-[60vh] text-gray-700 space-y-5">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">1. Introduction</h2>
          <p>
            Welcome to [Your Brand]. These Terms of Service govern your use of our website and
            services. By accessing or using [Your Brand], you agree to be bound by these Terms.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">2. Definitions</h2>
          <p>
            <strong>"Service"</strong> refers to the [Your Brand] application, website, and any related services.
            <br />
            <strong>"User"</strong> refers to individuals who access or use the Service.
            <br />
            <strong>"Content"</strong> refers to all information and data uploaded, stored, or shared through the Service.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">3. Account Registration</h2>
          <p>
            To use certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">4. User Content</h2>
          <p>
            You retain all rights to your Content. By uploading Content, you grant [Your Brand] a non-exclusive, worldwide, royalty-free license to use, copy, modify, and display your Content solely for the purpose of providing the Service to you.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">5. Prohibited Activities</h2>
          <p>
            Users agree not to engage in activities that:
          </p>
          <ul className="list-disc pl-6">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the intellectual property rights of others</li>
            <li>Distribute malware or other harmful code</li>
            <li>Attempt to gain unauthorized access to the Service or other accounts</li>
            <li>Interfere with or disrupt the Service or servers</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">6. Termination</h2>
          <p>
            [Your Brand] reserves the right to suspend or terminate your access to the Service at any time for violations of these Terms or for any other reason at our sole discretion.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">7. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">8. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL [YOUR BRAND] BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">9. Changes to Terms</h2>
          <p>
            [Your Brand] reserves the right to modify these Terms at any time. We will provide notice of significant changes by posting an announcement on our website or sending you an email.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at [contact@yourbrand.com].
          </p>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
          <Button variant="outline" className="px-6" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
