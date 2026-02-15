"use client";

import { useEffect, useState } from "react";
import { BentoCard } from "@/components/bento-card";
import { MapPin } from "lucide-react";

export function MapCard() {
const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
        setTime(
            new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Bahia",
            }),
        );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <BentoCard
        className="md:col-span-1 relative overflow-hidden h-[200px]"
        delay={0.4}
        >
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-background/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-lg">
            <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-xs font-mono font-bold text-foreground">
            {time} UTC-3
            </span>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
            <h3 className="text-sm font-bold text-white drop-shadow-md flex items-center gap-1">
            <MapPin className="h-3 w-3 text-red-500" /> Bahia, Brazil
            </h3>
            <p className="text-xs text-white/80 drop-shadow-md ml-4">
            Irará / Feira de Santana
            </p>
        </div>
        <div className="absolute inset-0 z-10 h-full w-full bg-zinc-900/20" />{" "}
        <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            title="map"
            marginHeight={0}
            marginWidth={0}
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=100%&hl=en&q=Feira%20de%20Santana%2C%20Bahia&ie=UTF8&t=&z=11&iwloc=B&output=embed"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            style={{ filter: "grayscale(1) invert(1)" }}
        />
        </BentoCard>
    );
}
