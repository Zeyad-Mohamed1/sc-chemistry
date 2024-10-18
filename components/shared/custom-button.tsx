"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export function CustomButton({
  className,
  children,
  pulseColor = "#00f5f5",
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  return (
    <Button
      className={cn(
        "relative text-center cursor-pointer flex justify-center items-center rounded-full px-6 py-6",
        className
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10 md:px-8 mr-2 lg:mr-5 text-base lg:text-lg font-medium">
        {children}
      </div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-full bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </Button>
  );
}
