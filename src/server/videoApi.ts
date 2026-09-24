import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";
import type { Request, Response } from "express";

/**
 * Backend handlers for Veo 3 Video Generation
 * Follows the 3-step POST pattern specified in SKILL.md:
 * 1. POST /api/generate-video
 * 2. POST /api/video-status
 * 3. POST /api/video-download
 */

const getApiKey = () => {
  return process.env.GEMINI_API_KEY || "";
};

export async function handleGenerateVideo(req: Request, res: Response) {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(401).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const { prompt, imageBase64, mimeType, aspectRatio = "16:9" } = req.body || {};

    if (!prompt && !imageBase64) {
      return res.status(400).json({
        error: "A prompt or an image is required to generate video.",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const payload: any = {
      model: "veo-3.1-fast-generate-preview",
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: aspectRatio === "9:16" ? "9:16" : "16:9",
      },
    };

    if (prompt) {
      payload.prompt = prompt;
    }

    if (imageBase64) {
      // Clean base64 prefix if provided
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
      payload.image = {
        imageBytes: cleanBase64,
        mimeType: mimeType || "image/png",
      };
    }

    const operation = await ai.models.generateVideos(payload);
    return res.json({ operationName: operation.name });
  } catch (err: any) {
    console.error("Error generating video with Veo 3:", err);
    return res.status(500).json({
      error: err?.message || "Failed to initiate video generation.",
      details: err?.toString(),
    });
  }
}

export async function handleVideoStatus(req: Request, res: Response) {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(401).json({ error: "GEMINI_API_KEY is not configured." });
    }

    const { operationName } = req.body || {};
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required." });
    }

    const ai = new GoogleGenAI({ apiKey });
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    return res.json({
      done: updated.done || false,
      error: updated.error || null,
      response: updated.response || null,
    });
  } catch (err: any) {
    console.error("Error checking video status:", err);
    return res.status(500).json({
      error: err?.message || "Failed to check video status.",
    });
  }
}

export async function handleVideoDownload(req: Request, res: Response) {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(401).json({ error: "GEMINI_API_KEY is not configured." });
    }

    const { operationName } = req.body || {};
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required." });
    }

    const ai = new GoogleGenAI({ apiKey });
    const op = new GenerateVideosOperation();
    op.name = operationName;

    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: "Generated video URI not found." });
    }

    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": apiKey },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({
        error: `Failed to fetch video from storage: ${videoRes.statusText}`,
      });
    }

    res.setHeader("Content-Type", "video/mp4");
    const arrayBuffer = await videoRes.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    console.error("Error downloading video:", err);
    return res.status(500).json({
      error: err?.message || "Failed to download video.",
    });
  }
}
