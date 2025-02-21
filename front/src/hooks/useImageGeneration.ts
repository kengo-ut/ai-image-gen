// hooks/useImageGeneration.ts
import { useState } from "react";
import { generateImggenGeneratePost } from "@/gen/default/default";
import { ImagePrompt, ImagePath } from "@/gen/schema";
import { Settings, Prompt } from "@/types";

export function useImageGeneration() {
  const [srcs, setSrcs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImages = async (prompt: Prompt, settings: Settings) => {
    setIsLoading(true);
    try {
      const imagePrompt: ImagePrompt = {
        prompt,
        ...settings,
      };

      const response = await generateImggenGeneratePost(imagePrompt);
      const newImagePath: ImagePath = response.data;
      const newImageSrc = newImagePath.image_path;

      return newImageSrc;
    } catch (err) {
      setError("Image generation failed");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { srcs, setSrcs, isLoading, error, generateImages };
}
