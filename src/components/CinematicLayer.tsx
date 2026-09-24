/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface CinematicLayerProps {
  glowColor?: string;
}

// GLSL Vertex Shader for Fullscreen Quad
const quadVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.999, 1.0);
  }
`;

// GLSL Fragment Shader: Pure Fusion of Uploaded Image 1 (Cosmic Earth & Moon) + Image 2 (3D Isometric Analytics Laptop)
const cinematicFragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_scroll;
  uniform float u_pulse;
  varying vec2 vUv;

  // 2D Simplex Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractional Brownian Motion (fBm)
  float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5000 * snoise(p); p = p * 2.02;
    f += 0.2500 * snoise(p); p = p * 2.03;
    f += 0.1250 * snoise(p); p = p * 2.01;
    f += 0.0625 * snoise(p);
    return f;
  }

  // Isometric 3D box projection
  // p: relative 2D coordinate, b: size (width, depth, height)
  float sdIsoBox(vec2 p, vec2 origin, vec3 b, out float faceId, out vec3 faceShading) {
    vec2 q = p - origin;
    // Isometric 30 degree projection:
    // x_screen = (x - y) * cos(30)
    // y_screen = (x + y) * sin(30) + z
    float cos30 = 0.866025;
    float sin30 = 0.500000;
    
    // Test top face (diamond)
    vec2 topCenter = vec2(0.0, b.z);
    vec2 pt = q - topCenter;
    float topDist = (abs(pt.x / cos30) + abs(pt.y / sin30)) * 0.5 - b.x;
    
    // Test left vertical face
    float leftSide = (q.x < 0.0 && q.x > -b.x * cos30 && q.y > (q.x * (sin30 / cos30)) && q.y < (q.x * (sin30 / cos30) + b.z)) ? 1.0 : 0.0;
    
    // Test right vertical face
    float rightSide = (q.x >= 0.0 && q.x < b.x * cos30 && q.y > (-q.x * (sin30 / cos30)) && q.y < (-q.x * (sin30 / cos30) + b.z)) ? 1.0 : 0.0;
    
    if (topDist < 0.0) {
      faceId = 1.0; // Top face
      faceShading = vec3(1.15, 1.15, 1.25);
      return 1.0;
    } else if (leftSide > 0.5) {
      faceId = 2.0; // Left face
      faceShading = vec3(0.85, 0.90, 1.00);
      return 1.0;
    } else if (rightSide > 0.5) {
      faceId = 3.0; // Right face
      faceShading = vec3(0.55, 0.60, 0.70);
      return 1.0;
    }
    
    return 0.0;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;

    // Smooth subtle mouse parallax
    vec2 m = (u_mouse - 0.5) * 0.024;
    vec2 pos = uv - m;
    pos.y += u_scroll * 0.04;

    // -------------------------------------------------------------
    // 1. BASE BACKGROUND: Deep Obsidian Space Void & Isometric Cyber Depth
    // -------------------------------------------------------------
    vec3 spaceVoid = mix(vec3(0.003, 0.002, 0.008), vec3(0.010, 0.006, 0.022), 1.0 - uv.y);
    vec3 col = spaceVoid;

    // Subtle fine stardust in background void (crisp & photographic, not noisy)
    float fineStars = pow(clamp(snoise(pos * 180.0) * 0.5 + 0.5, 0.0, 1.0), 12.0) * 0.45;
    col += vec3(0.92, 0.96, 1.0) * fineStars;

    // Isometric Cyber Grid Floor in bottom perspective space (Image 2 style)
    if (uv.y < 0.36) {
      vec2 gridP = vec2((uv.x - 0.65) * aspect, uv.y - 0.02);
      vec2 isoGrid = vec2(gridP.x * 1.732 + gridP.y * 3.0, -gridP.x * 1.732 + gridP.y * 3.0) * 12.0;
      float lineU = abs(fract(isoGrid.x) - 0.5);
      float lineV = abs(fract(isoGrid.y) - 0.5);
      float gridGlow = (smoothstep(0.06, 0.0, lineU) + smoothstep(0.06, 0.0, lineV)) * 0.14;
      float gridFade = smoothstep(0.36, 0.04, uv.y) * smoothstep(-0.02, 0.08, uv.y);
      vec3 gridColor = mix(vec3(0.0, 0.6, 1.0), vec3(0.8, 0.2, 0.4), uv.x);
      col += gridColor * gridGlow * gridFade;
    }

    // -------------------------------------------------------------
    // 2. IMAGE 1: DUAL-ENERGY COSMIC NEBULA (Electric Blue & Fiery Flare)
    // -------------------------------------------------------------
    vec2 centerP = uv - 0.5;

    // 2a. Electric Cyan/Blue Nebula Streak (Left side of Image 1)
    vec2 blueAxis = normalize(vec2(-0.84, -0.54));
    float blueDist = abs(dot(centerP - vec2(-0.24, -0.08), vec2(-blueAxis.y, blueAxis.x)));
    float blueRibbon = exp(-pow(blueDist / 0.16, 2.0));
    float blueTurb = fbm(uv * 6.0 + vec2(u_time * 0.012, -u_time * 0.008));
    float blueDetail = snoise(uv * 20.0 + vec2(u_time * 0.025, 0.0)) * 0.5 + 0.5;
    vec3 colBlueNebula = mix(vec3(0.0, 0.45, 1.0), vec3(0.0, 0.85, 1.0), blueDetail);
    float blueMask = smoothstep(0.60, 0.10, uv.x);
    col += colBlueNebula * blueRibbon * pow(blueTurb * 0.7 + blueDetail * 0.3, 1.4) * blueMask * 0.95;

    // 2b. Fiery Crimson / Solar Flare Nebula (Right side of Image 1)
    vec2 redAxis = normalize(vec2(0.82, 0.58));
    float redDist = abs(dot(centerP - vec2(0.24, 0.20), vec2(-redAxis.y, redAxis.x)));
    float redRibbon = exp(-pow(redDist / 0.22, 2.0));
    float redTurb = fbm(uv * 5.2 - vec2(u_time * 0.010, u_time * 0.014));
    float redDetail = snoise(uv * 18.0 - vec2(u_time * 0.020, 0.0)) * 0.5 + 0.5;
    vec3 colRedNebula = mix(vec3(0.92, 0.08, 0.15), vec3(1.0, 0.42, 0.05), redDetail);
    float redMask = smoothstep(0.35, 0.88, uv.x);
    col += colRedNebula * redRibbon * pow(redTurb * 0.7 + redDetail * 0.3, 1.35) * redMask * 0.90;

    // -------------------------------------------------------------
    // 3. IMAGE 1: PHOTOREALISTIC 3D PLANET EARTH & MOON
    // -------------------------------------------------------------
    vec2 earthCenter = vec2(0.48, 0.58) + m * 0.4;
    vec2 ep = (uv - earthCenter) * vec2(aspect, 1.0);
    float R = 0.215; // Earth radius
    float distEarth = length(ep);

    // 3a. Earth Atmospheric Outer Glow & Solar Rim Scatter
    if (distEarth >= R && distEarth < R + 0.16) {
      float haloD = distEarth - R;
      // Electric cyan Rayleigh scattering on left limb
      float leftScatter = exp(-haloD * 30.0) * smoothstep(0.04, -0.20, ep.x);
      vec3 leftHalo = vec3(0.0, 0.75, 1.0) * leftScatter * 2.2;

      // Fiery solar flare corona on right limb
      float coronaAngle = atan(ep.y, ep.x);
      float coronaFlare = 1.0 + 0.3 * snoise(vec2(coronaAngle * 6.0, u_time * 0.7));
      float rightScatter = exp(-haloD * 20.0) * coronaFlare * smoothstep(-0.04, 0.18, ep.x);
      vec3 rightHalo = vec3(1.0, 0.32, 0.03) * rightScatter * 2.5;

      col += leftHalo + rightHalo;
    }

    // 3b. Earth Surface Raycasting
    if (distEarth < R) {
      float z = sqrt(max(0.0, R * R - distEarth * distEarth));
      vec3 norm = vec3(ep.x / R, ep.y / R, z / R);

      // Planetary rotation
      float phi = atan(norm.x, norm.z) + u_time * 0.032;
      float theta = asin(clamp(norm.y, -1.0, 1.0));
      vec2 sphereUv = vec2(phi / 3.14159, theta / 1.57079);

      // Continent landmasses & ocean shelves
      float continentFbm = fbm(sphereUv * vec2(2.5, 3.2));
      float continentFine = snoise(sphereUv * vec2(6.8, 8.8)) * 0.22;
      float land = smoothstep(0.03, 0.13, continentFbm + continentFine);

      vec3 colOcean = mix(vec3(0.015, 0.08, 0.28), vec3(0.03, 0.18, 0.48), clamp(norm.z, 0.0, 1.0));
      vec3 colLand = mix(vec3(0.12, 0.28, 0.15), vec3(0.38, 0.30, 0.16), snoise(sphereUv * 11.0) * 0.5 + 0.5);
      vec3 earthBase = mix(colOcean, colLand, land);

      // Drifting atmospheric cloud formations
      float clouds = pow(clamp(fbm(sphereUv * vec2(3.4, 4.2) + vec2(u_time * 0.018, 0.0)), 0.0, 1.0), 1.55);
      earthBase = mix(earthBase, vec3(0.96, 0.98, 1.0), clouds * 0.85);

      // Solar lighting vector (from right-front solar flare)
      vec3 sunDir = normalize(vec3(0.80, 0.18, 0.58));
      float diff = max(0.0, dot(norm, sunDir));
      float terminator = smoothstep(-0.06, 0.14, dot(norm, sunDir));

      // Golden city lights on dark night hemisphere
      float cityLights = pow(clamp(snoise(sphereUv * 24.0), 0.0, 1.0), 4.4) * land * (1.0 - terminator) * 2.6;
      vec3 colCityLights = vec3(1.0, 0.80, 0.38) * cityLights;

      vec3 earthLit = earthBase * (diff * 0.86 + 0.06) + colCityLights;

      // Limb Fresnel scattering
      vec3 view = vec3(0.0, 0.0, 1.0);
      float fresnel = 1.0 - max(0.0, dot(norm, view));

      float leftRim = pow(fresnel, 2.5) * smoothstep(0.12, -0.32, norm.x);
      vec3 leftAtmosphere = vec3(0.0, 0.78, 1.0) * leftRim * 3.6;

      float rightRim = pow(fresnel, 2.0) * smoothstep(-0.12, 0.32, norm.x);
      vec3 rightAtmosphere = vec3(1.0, 0.34, 0.04) * rightRim * 4.0;

      col = earthLit + leftAtmosphere + rightAtmosphere;
    }

    // 3c. Companion Moon (orbiting in the solar flare haze)
    vec2 moonCenter = earthCenter + vec2(0.27, 0.03) + vec2(cos(u_time * 0.07) * 0.018, sin(u_time * 0.07) * 0.010);
    vec2 mp = (uv - moonCenter) * vec2(aspect, 1.0);
    float Rm = 0.026;
    float distMoon = length(mp);

    if (distMoon < Rm) {
      float mz = sqrt(max(0.0, Rm * Rm - distMoon * distMoon));
      vec3 mNorm = vec3(mp.x / Rm, mp.y / Rm, mz / Rm);
      float mCraters = fbm(mp * 140.0) * 0.28 + snoise(mp * 50.0) * 0.5 + 0.5;
      vec3 mCol = mix(vec3(0.40, 0.38, 0.36), vec3(0.70, 0.66, 0.62), mCraters);
      float mDiff = max(0.0, dot(mNorm, normalize(vec3(0.84, 0.22, 0.52))));
      col = mCol * (mDiff * 0.88 + 0.12);
      col += vec3(1.0, 0.36, 0.06) * 0.30 * mDiff; // amber solar reflection
    } else if (distMoon < Rm + 0.016) {
      col += vec3(1.0, 0.52, 0.20) * exp(-(distMoon - Rm) * 90.0) * 0.45;
    }

    // -------------------------------------------------------------
    // 4. IMAGE 2: 3D ISOMETRIC LAPTOP & HOLOGRAPHIC BUSINESS ANALYTICS
    // -------------------------------------------------------------
    // Placed in the lower-right area as in Image 2
    vec2 laptopBase = vec2(0.74, 0.18) + m * 0.25;
    vec2 lp = (uv - laptopBase) * vec2(aspect, 1.0);

    // 4a. 3D Isometric Laptop Chassis (Base diamond plate)
    // Isometric base dimensions
    float cos30 = 0.866025;
    float sin30 = 0.500000;
    
    // Project lp into isometric space
    float isoX = (lp.x / cos30);
    float isoY = (lp.y / sin30);
    float laptopW = 0.14;
    float laptopD = 0.09;
    
    // Laptop base diamond
    float baseDist = abs(isoX) + abs(isoY - 0.02);
    if (baseDist < laptopW && lp.y >= -0.04 && lp.y <= 0.08) {
      // Laptop chassis metallic dark slate
      vec3 colChassis = mix(vec3(0.08, 0.10, 0.18), vec3(0.12, 0.16, 0.26), (lp.y + 0.04) / 0.12);
      // Keyboard area inset
      if (baseDist < laptopW * 0.78 && lp.y > -0.01 && lp.y < 0.06) {
        colChassis = vec3(0.05, 0.06, 0.12);
        // Key grid glow
        float keyGlow = smoothstep(0.02, 0.0, abs(fract(lp.x * 65.0) - 0.5)) +
                        smoothstep(0.02, 0.0, abs(fract(lp.y * 75.0) - 0.5));
        colChassis += vec3(0.0, 0.6, 1.0) * keyGlow * 0.12;
      }
      // Trackpad
      if (abs(lp.x) < 0.025 && lp.y >= -0.035 && lp.y <= -0.015) {
        colChassis = vec3(0.07, 0.09, 0.15);
      }
      // Chassis neon rim
      float rimBase = smoothstep(0.005, 0.0, abs(baseDist - laptopW));
      col = colChassis + vec3(0.0, 0.8, 1.0) * rimBase * 0.6;
    }

    // 4b. Laptop Open Screen (Inclined in 3D isometric perspective)
    vec2 screenRoot = vec2(0.0, 0.055);
    vec2 sp = lp - screenRoot;
    // Screen rectangle in perspective: height ~0.11, width ~0.18
    float screenW = 0.10;
    float screenH = 0.11;
    float screenDistX = abs(sp.x + sp.y * 0.35);
    float screenDistY = sp.y;
    
    if (screenDistX < screenW && screenDistY >= 0.0 && screenDistY <= screenH) {
      // Screen bezel
      vec3 colScreen = vec3(0.04, 0.05, 0.10);
      
      // Screen Active Display Area
      if (screenDistX < screenW * 0.90 && screenDistY > 0.012 && screenDistY < screenH * 0.92) {
        // High-tech holographic business dashboard inside screen
        vec2 dUv = vec2((sp.x + sp.y * 0.35) / (screenW * 0.90) + 0.5, (screenDistY - 0.012) / (screenH * 0.80));
        
        // Dark dashboard base with cyan/blue gradient
        colScreen = mix(vec3(0.02, 0.06, 0.16), vec3(0.05, 0.12, 0.28), dUv.y);
        
        // Animated area chart on screen (like in Image 2)
        float chartCurve = 0.35 + 0.18 * sin(dUv.x * 6.28 + u_time * 1.2) + 0.08 * cos(dUv.x * 12.0);
        if (dUv.y < chartCurve) {
          colScreen = mix(colScreen, vec3(0.0, 0.7, 1.0), 0.35 * (dUv.y / chartCurve));
        }
        float chartLine = smoothstep(0.025, 0.0, abs(dUv.y - chartCurve));
        colScreen += vec3(0.0, 0.95, 1.0) * chartLine * 0.85;

        // Second metric trendline (Coral red)
        float chartCurve2 = 0.48 + 0.15 * cos(dUv.x * 5.0 - u_time * 0.9);
        float chartLine2 = smoothstep(0.022, 0.0, abs(dUv.y - chartCurve2));
        colScreen += vec3(1.0, 0.35, 0.45) * chartLine2 * 0.80;
      }
      
      // Screen cyan glowing outer border
      float screenRim = smoothstep(0.006, 0.0, abs(screenDistX - screenW)) +
                        smoothstep(0.006, 0.0, abs(screenDistY - screenH));
      col = colScreen + vec3(0.0, 0.85, 1.0) * screenRim * 0.7;
    }

    // 4c. Floating Holographic Glass HUD Cards (Image 2 style)
    // Floating HUD Card 1: Growth line chart hovering above laptop
    vec2 hudCenter1 = laptopBase + vec2(-0.16, 0.14);
    vec2 hp1 = (uv - hudCenter1) * vec2(aspect, 1.0);
    if (abs(hp1.x) < 0.085 && abs(hp1.y) < 0.055) {
      // Glass panel translucency
      vec3 hudGlass = mix(vec3(0.05, 0.08, 0.20), vec3(0.08, 0.14, 0.32), hp1.y + 0.5);
      
      // Multi-series line graph in HUD
      float hUvX = (hp1.x / 0.085) * 0.5 + 0.5;
      float hUvY = (hp1.y / 0.055) * 0.5 + 0.5;
      
      // Cyan live line
      float lineY1 = 0.45 + 0.25 * sin(hUvX * 5.5 + u_time * 1.4);
      float lineMask1 = smoothstep(0.04, 0.0, abs(hUvY - lineY1));
      hudGlass += vec3(0.0, 0.9, 1.0) * lineMask1 * 0.75;
      
      // Coral live line
      float lineY2 = 0.35 + 0.22 * cos(hUvX * 4.8 - u_time * 1.1);
      float lineMask2 = smoothstep(0.04, 0.0, abs(hUvY - lineY2));
      hudGlass += vec3(1.0, 0.3, 0.4) * lineMask2 * 0.75;
      
      // Glass border glow
      float glassBorder = smoothstep(0.004, 0.0, abs(abs(hp1.x) - 0.085)) +
                          smoothstep(0.004, 0.0, abs(abs(hp1.y) - 0.055));
      col = mix(col, hudGlass, 0.85) + vec3(0.0, 0.8, 1.0) * glassBorder * 0.6;
    }

    // 4d. 3D Stepped Isometric Bar Columns (from Image 2)
    // Left group: 4 Stepped Cyan/Blue Bar Columns
    for (int i = 0; i < 4; i++) {
      float fi = float(i);
      vec2 barOrigin = vec2(0.12 + fi * 0.042, 0.14 + fi * 0.024);
      vec2 bp = (uv - barOrigin) * vec2(aspect, 1.0);
      float barH = 0.048 + fi * 0.020 + sin(u_time * 1.2 + fi * 0.7) * 0.006;
      
      float faceId = 0.0;
      vec3 faceShading = vec3(1.0);
      float hit = sdIsoBox(bp, vec2(0.0, 0.0), vec3(0.016, 0.016, barH), faceId, faceShading);
      if (hit > 0.5) {
        vec3 barColor = mix(vec3(0.0, 0.55, 0.95), vec3(0.0, 0.95, 1.0), bp.y / barH);
        col = barColor * faceShading * 0.85;
      }
    }

    // Right group: 4 Stepped Coral/Crimson Bar Columns
    for (int j = 0; j < 4; j++) {
      float fj = float(j);
      vec2 barOrigin = vec2(0.68 + fj * 0.042, 0.12 + fj * 0.024);
      vec2 bp = (uv - barOrigin) * vec2(aspect, 1.0);
      float barH = 0.045 + fj * 0.022 + cos(u_time * 1.1 + fj * 0.8) * 0.006;
      
      float faceId = 0.0;
      vec3 faceShading = vec3(1.0);
      float hit = sdIsoBox(bp, vec2(0.0, 0.0), vec3(0.016, 0.016, barH), faceId, faceShading);
      if (hit > 0.5) {
        vec3 barColor = mix(vec3(0.92, 0.15, 0.22), vec3(1.0, 0.48, 0.18), bp.y / barH);
        col = barColor * faceShading * 0.85;
      }
    }

    // -------------------------------------------------------------
    // 5. READABILITY SCRIM & OPTICAL VIGNETTE
    // -------------------------------------------------------------
    // Gentle darkening directly behind the hero text & navigation zone so typography is 100% crisp & readable
    float textScrim = 1.0 - 0.32 * exp(-pow((uv.y - 0.54) / 0.32, 2.0)) * exp(-pow((uv.x - 0.50) / 0.40, 2.0));
    col *= textScrim;

    // Cinematic edge vignette
    float vignette = smoothstep(1.70, 0.55, length(uv - 0.5));
    col *= vignette;

    // Subtle interactive pulse on click
    col += u_pulse * 0.06 * (vec3(0.0, 0.75, 1.0) * blueMask + vec3(1.0, 0.35, 0.1) * redMask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function CinematicLayer({ glowColor }: CinematicLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const scrollRef = useRef({ y: 0, targetY: 0 });
  const pulseRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 2. WebGL Renderer with High-Performance Settings
    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: false,
      stencil: false,
      depth: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Fullscreen Dynamic Cosmic & Isometric Quad
    const quadGeometry = new THREE.PlaneGeometry(2, 2);
    const cinematicUniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_scroll: { value: 0 },
      u_pulse: { value: 0.0 },
    };

    const cinematicMaterial = new THREE.ShaderMaterial({
      vertexShader: quadVertexShader,
      fragmentShader: cinematicFragmentShader,
      uniforms: cinematicUniforms,
      depthWrite: false,
      depthTest: false,
    });

    const quadMesh = new THREE.Mesh(quadGeometry, cinematicMaterial);
    scene.add(quadMesh);

    // 4. Mouse & Scroll Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = 1.0 - e.clientY / window.innerHeight;
    };

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      scrollRef.current.targetY = progress;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 5. Interactive Ambient Pulse on Click
    const handleWindowClick = () => {
      pulseRef.current = 1.0;
    };
    window.addEventListener("click", handleWindowClick);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Smooth scroll easing
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.06;

      // Pulse decay
      pulseRef.current = Math.max(0, pulseRef.current - 0.025);

      // Update Shader Uniforms
      cinematicUniforms.u_time.value = elapsedTime;
      cinematicUniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      cinematicUniforms.u_scroll.value = scrollRef.current.y;
      cinematicUniforms.u_pulse.value = pulseRef.current;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Window Resize Handling
    const handleResize = () => {
      if (!rendererRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      cinematicUniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 8. Resource Disposal on Component Unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleWindowClick);
      cancelAnimationFrame(animationFrameId);

      quadGeometry.dispose();
      cinematicMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
      style={{
        background: "#020108",
      }}
      id="cosmic-analytics-stage"
      aria-hidden="true"
    />
  );
}
