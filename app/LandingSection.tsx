import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function LandingSection() {
  const { theme } = useTheme();
  const isLightBg = theme === "light";

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Vibrant Gradient Background */}
      <div className="absolute inset-0 z-0" style={{
        background: isLightBg
          ? "linear-gradient(120deg, #660033 0%, #E673AC 40%, #469110 80%, #00520A 100%)"
          : "linear-gradient(120deg, #5A002A 0%, #C35A8B 40%, #3A770E 80%, #003E08 100%)"
      }} />
      {/* Optional: keep image for texture, but reduce opacity for vibrancy */}
      <Image
        src="/hero-background.jpg"
        alt="Community shopping together"
        fill
        className="object-cover w-full h-full z-0 opacity-10"
        priority
      />
      {/* Softer overlay for readability, but let colors show through */}
      <div className="absolute inset-0 z-10" style={{
        background: isLightBg
          ? "rgba(255,255,255,0.30)"
          : "rgba(18,18,18,0.40)"
      }} />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto px-4">
        <h1 className={`text-5xl md:text-7xl font-bold leading-tight tracking-tighter drop-shadow-lg ${isLightBg ? 'text-primary' : 'text-primary-foreground'}`}> 
          मिलकर खरीदें, <span className="text-secondary">पैसे बचाएं</span>
        </h1>
        <p className={`mt-6 text-lg md:text-xl max-w-2xl drop-shadow-md ${isLightBg ? 'text-text-primary' : 'text-text-primary'}`}> 
          Join group deals on your favorite products. The more people that join, the bigger the discount for everyone.
        </p>
        <p className={`mt-6 text-lg md:text-xl max-w-2xl drop-shadow-md ${isLightBg ? 'text-text-secondary' : 'text-text-secondary'}`}> 
          Start Saving today !
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-primary hover:bg-secondary text-white">
            Explore Active Deals
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className={`${isLightBg ? 'text-primary border-primary hover:bg-secondary/10' : 'text-secondary border-secondary hover:bg-primary/10'}`}> 
            Learn How It Works
          </Button>
        </div>
      </div>
    </section>
  );
}
