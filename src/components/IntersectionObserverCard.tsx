/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";

interface IntersectionObserverCardProps {
  children: React.ReactNode;
  key?: React.Key;
  className?: string;
  delay?: number; // Delay in milliseconds
  direction?: "up" | "left" | "right" | "none";
  distance?: number; // Offset in px (default 24)
  duration?: number; // Transition duration in ms (default 700)
  threshold?: number;
  rootMargin?: string;
  style?: React.CSSProperties;
}

/**
 * IntersectionObserverCard
 * 
 * Uses the browser's native Intersection Observer API to detect when a card
 * enters the viewport, applying an ultra-smooth, subtle fade-in, upward drift,
 * and de-blur effect for a high-end, premium portfolio experience.
 */
export default function IntersectionObserverCard({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 700,
  threshold = 0.12,
  rootMargin = "0px 0px -50px 0px",
  style = {},
}: IntersectionObserverCardProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Compute transform based on direction
  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1)";
    switch (direction) {
      case "up":
        return `translate3d(0, ${distance}px, 0) scale(0.985)`;
      case "left":
        return `translate3d(-${distance}px, 0, 0) scale(0.985)`;
      case "right":
        return `translate3d(${distance}px, 0, 0) scale(0.985)`;
      case "none":
        return "translate3d(0, 0, 0) scale(0.985)";
      default:
        return `translate3d(0, ${distance}px, 0) scale(0.985)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: isVisible ? "blur(0px)" : "blur(4px)",
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? "auto" : "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}
