// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import PromptInput from "../components/PromptInput";
import ImageGallery from "../components/ImageGallery";
import ImageActions from "../components/ImageActions";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import {
  retrieveImggenRetrieveGet,
  deleteImggenDeletePost,
  uploadImggenUploadPost,
} from "@/gen/default/default";

export default function Home() {
  const { srcs, setSrcs, isLoading } = useImageGeneration();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // Fetch already generated images on page load
  useEffect(() => {
    const fetchImages = async () => {
      const response = await retrieveImggenRetrieveGet();
      const imagePaths = response.data.image_paths;
      setSrcs((prev) => [...prev, ...imagePaths]);
    };
    fetchImages();
  }, [setSrcs]);

  const handleUploadSelected = async () => {
    let response = await uploadImggenUploadPost({ image_paths: selectedImages });
    if (response.status === 200) {
      // delete uploaded images
      response = await deleteImggenDeletePost({ image_paths: selectedImages });
      if (response.status === 200) {
        setSrcs((prev) => prev.filter((src) => !selectedImages.includes(src)));
        setSelectedImages([]);
      }
    }
  };

  const handleClearSelected = () => {
    setSelectedImages([]);
  };

  const handleDeleteSelected = async () => {
    const response = await deleteImggenDeletePost({ image_paths: selectedImages });
    if (response.status === 200) {
      setSrcs((prev) => prev.filter((src) => !selectedImages.includes(src)));
      setSelectedImages([]);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Image Generator</h1>

      <PromptInput
        onImageGenerated={(imageSrc: string) => setSrcs((prev) => [...prev, imageSrc])}
      />

      <ImageGallery
        srcs={srcs}
        isLoading={isLoading}
        selectedImages={selectedImages}
        onSelect={setSelectedImages}
      />

      <ImageActions
        selectedImages={selectedImages}
        onClearSelected={handleClearSelected}
        onDeleteSelected={handleDeleteSelected}
        onUploadSelected={handleUploadSelected}
      />
    </main>
  );
}
