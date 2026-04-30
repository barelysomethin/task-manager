"use client";

import { useEffect, useState } from "react";
import { HalftoneDots } from "@paper-design/shaders-react";

export default function BackgroundShader() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (size.width === 0) return null; // Avoid rendering until we have dimensions

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }}>
      <HalftoneDots 
        width={size.width} 
        height={size.height} 
        image="https://paper.design/flowers.webp" 
        colorBack="#f2f1e8" 
        colorFront="#2b2b2b" 
        originalColors={false} 
        type="gooey" 
        grid="hex" 
        inverted={false} 
        size={0.5} 
        radius={1.25} 
        contrast={0.4} 
        grainMixer={0.2} 
        grainOverlay={0.2} 
        grainSize={0.5} 
        fit="cover" 
      />
    </div>
  );
}
