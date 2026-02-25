import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Dialog";

type PrivacyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            [Privacy Policy Title]
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="prose prose-sm max-w-none px-6 py-5 overflow-y-auto max-h-[60vh] text-gray-700 space-y-5">
          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">1. Introduction</h2>
          <p>
            At [Your Brand], we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">2. Information We Collect</h2>
          <p>
            We collect the following types of information:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Account Information:</strong> Name, email address, and password when you register an account.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our service, including access times, pages viewed, and features used.</li>
            <li><strong>Device Information:</strong> Information about your device, such as IP address, browser type, and operating system.</li>
            <li><strong>Content:</strong> Files, documents, and other content you upload to our service.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">3. How We Use Your Information</h2>
          <p>
            We use your information for the following purposes:
          </p>
          <ul className="list-disc pl-6">
            <li>Providing and maintaining our services</li>
            <li>Authenticating your identity and managing your account</li>
            <li>Processing transactions and managing subscriptions</li>
            <li>Sending service-related notifications</li>
            <li>Improving and personalizing our services</li>
            <li>Analyzing usage patterns and trends</li>
            <li>Detecting and preventing fraud or unauthorized access</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">4. Data Storage and Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure servers and encrypted during transmission.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">5. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information to third parties. We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6">
            <li>With service providers who help us operate our business</li>
            <li>To comply with legal obligations or respond to lawful requests</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>In connection with a business transfer, merger, or acquisition</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">6. Your Privacy Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6">
            <li>Accessing and obtaining a copy of your data</li>
            <li>Correcting inaccurate data</li>
            <li>Deleting your data</li>
            <li>Restricting or objecting to processing</li>
            <li>Data portability</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">8. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting a notice on our website or sending you an email.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6">10. Contact Us</h2>
          <p>
            If you have any questions or concerns about our Privacy Policy, please contact us at [privacy@yourbrand.com].
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
