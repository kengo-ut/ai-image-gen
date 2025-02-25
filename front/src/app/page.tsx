"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "@/gen/schema";
import ImageGenerator from "@/components/ImageGenerator";
import ImageSearch from "@/components/ImageSearch";
import ImageGallery from "@/components/ImageGallery";
import { listImagesApiImagesListGet } from "@/gen/images/images";
import SearchResults from "@/components/SearchResults";

export default function Home() {
  const [images, setImages] = useState<Metadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Metadata[]>([]);

  // Fetch all images on load
  useEffect(() => {
    fetchImages();
  }, []);

  // Fetch all images
  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await listImagesApiImagesListGet();
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("画像の取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // Update search results
  const handleSearchResults = (results: Metadata[]) => {
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Image Generation & Search</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side (Input Section) */}
        <div className="flex flex-col gap-4 bg-gray-100 p-6 rounded-lg border-r">
          <h2 className="text-xl font-semibold">Input</h2>
          <ImageGenerator onImageGenerated={fetchImages} />
          <ImageSearch onSearchResults={handleSearchResults} />
        </div>

        {/* Right Side (Output Section) */}
        <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Output</h2>
          {/* Image Gallery */}
          <ImageGallery images={images} isLoading={isLoading} onRefresh={fetchImages} />
          {/* Search Results */}
          {searchResults.length > 0 && <SearchResults searchResults={searchResults} />}
        </div>
      </div>
    </div>
  );
}
