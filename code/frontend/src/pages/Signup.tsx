import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";
import { useCurrentUser } from "app";

import { Button } from "../components/Button";
import { TermsModal } from "../components/TermsModal";
import { PrivacyModal } from "../components/PrivacyModal";

// Form validation schema
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useCurrentUser();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  
  // Redirect to dashboard if already logged in
  if (!loading && user) {
    console.log('Signup: User already logged in, redirecting to dashboard');
    navigate('/dashboard');
    return null;
  }
  
  console.log('Signup: Page loaded, user status:', loading ? 'loading' : (user ? 'logged in' : 'not logged in'));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    if (!agreedToTerms) {
      toast.error("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    toast.success("Account erstellt");
    navigate("/dashboard");
  };

  const handleGoogleSignup = async () => {
    toast.success("Mit Google registriert");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left column - Removed pricing info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-400 to-purple-500 p-8 relative">
        {/* Back button */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-6 left-8 flex items-center text-white hover:text-white/80 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        
        <div className="flex flex-col justify-center h-full mx-auto max-w-sm">
          <h3 className="text-white text-2xl font-bold mb-4">Willkommen bei Kölner Vermögen</h3>
          <p className="text-white/80 mb-8">Registrieren Sie sich für Zugang zu exklusiven Finanzinhalten und Expertenberatung.</p>
        </div>
      </div>
      
      {/* Right column - Form */}
      <div className="w-full lg:w-1/2 flex items-start justify-center p-6 md:p-10 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-6 pt-24"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">[Create your account]</h2>
            <p className="text-gray-600">[Fill in your details to get started]</p>
          </div>



          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Full name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  disabled={isLoading}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="John Smith"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Email address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="your@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Create a secure password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Confirm password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-3 mt-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="terms" className="text-gray-700">
                    I agree to the <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        setTermsModalOpen(true);
                      }} 
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Terms of Service
                    </button> and <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        setPrivacyModalOpen(true);
                      }} 
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="marketing"
                    name="marketing"
                    type="checkbox"
                    checked={agreedToMarketing}
                    onChange={(e) => setAgreedToMarketing(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="marketing" className="text-gray-700">
                    I'd like to receive updates about new features and services
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              variant="gradient"
              size="lg"
              className="w-full mt-4 py-3 text-white font-medium rounded-full"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-5">
            <p>
              By creating an account, you agree to our terms of service and privacy policy.
              We prioritize the security of your information and will never share it with third parties.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <TermsModal isOpen={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
    </div>
  );
}
