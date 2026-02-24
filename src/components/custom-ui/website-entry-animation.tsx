/*
 * Copyright (c) 2025-2026. Tecnova
 */

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Floating particles component
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particles = Array.from({ length: 12 }, (_, i) => i);

  useEffect(() => {
    // Set initial dimensions after component mounts
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Optional: Update dimensions on resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute h-2 w-2 rounded-full bg-primary_action/20"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: 0,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated loading dots
const LoadingDots = () => (
  <div className="flex items-center justify-center space-x-2">
    {[0, 1, 2].map((dot) => (
      <motion.div
        key={dot}
        className="h-3 w-3 rounded-full bg-primary_action"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: dot * 0.2,
        }}
      />
    ))}
  </div>
);

export default function WebsiteEntryAnimation() {
  const [animationDone, setAnimationDone] = useState(false);
  const [showSecondPhase, setShowSecondPhase] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Start second phase after 1.5s
    const secondPhaseTimer = setTimeout(() => {
      setShowSecondPhase(true);
    }, 1000);

    // Complete animation after 3.5s
    const completeTimer = setTimeout(() => {
      setAnimationDone(true);
      document.body.style.overflow = originalOverflow || "auto";
    }, 1500);

    return () => {
      clearTimeout(secondPhaseTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = originalOverflow || "auto";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!animationDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="fixed left-0 top-0 z-[100] flex h-full w-full"
          style={{
            background:
              "linear-gradient(135deg, #F3F5F9 0%, #E8ECF4 50%, #F3F5F9 100%)",
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(135deg, #F3F5F9 0%, #E8ECF4 50%, #F3F5F9 100%)",
                "linear-gradient(135deg, #E8ECF4 0%, #F3F5F9 50%, #E8ECF4 100%)",
                "linear-gradient(135deg, #F3F5F9 0%, #E8ECF4 50%, #F3F5F9 100%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <FloatingParticles />

          {/* Main content container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 my-auto flex w-full flex-col items-center gap-y-12"
          >
            {/* Logo with entrance animation */}
            <motion.div
              initial={{
                scale: 0,
                rotate: -180,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 1.5,
              }}
              className="relative"
            >
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary_action/10 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: "120%",
                  height: "120%",
                  left: "-10%",
                  top: "-10%",
                }}
              />

              <motion.div
                animate={{}}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/parkwize_logo_tr.png"
                  alt="Logo"
                  width={320}
                  height={120}
                  className="drop-shadow-lg"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
