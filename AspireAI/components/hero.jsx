"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <section className="w-full flex justify-center items-center overflow-x-hidden pt-36 md:pt-48 pb-1" style={{ scrollbarWidth: 'none' }}>
      <div className="space-y-6 text-center" style={{ maxWidth: '100%' }}>
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-7xl gradient-title">
          Discover Your Dream Career with AspireAI
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-neutral-600 text-muted-foreground md:text-xl">
          Your personal AI career coach—guiding you with tailored advice, smart insights, and a roadmap to success.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/hero.png"
              width={1080}
              height={600}
              alt="Dashboard Preview"
              className="rounded-t-2xl shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;