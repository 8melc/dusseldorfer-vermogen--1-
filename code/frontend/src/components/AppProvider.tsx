import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ChatTrigger } from "@/components/ChatTrigger";
import { ChatPanel } from "@/components/ChatPanel";
import { PhilosophyGrid } from "@/components/PhilosophyGrid";
import { useChatStore } from "../utils/chatStore";
import { motion, AnimatePresence } from "framer-motion";


export function AppProvider() {
  const { isChatOpen, activeView, closeChat } = useChatStore();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {" "}
            {/* Adjusted for fixed header */}
            <Outlet />
          </main>
          <Footer />
        </div>
        <ChatTrigger />

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
              className="fixed inset-0 bg-black/50 z-[1100] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="w-[min(92vw,980px)] h-[90vh] max-h-[90vh]"
              >
                <div className="rounded-3xl shadow-2xl h-full overflow-hidden">
                  <ChatPanel view={activeView} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Toaster />
      </Suspense>
    </>
  );
}
