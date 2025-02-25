import React, { useState } from "react";
import { Metadata } from "@/gen/schema";
import { deleteImagesApiImagesDeleteDelete } from "@/gen/images/images";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import ImageThumbnail from "./ImageThumbnail";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: Metadata[];
  isLoading: boolean;
  onRefresh: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, onRefresh }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toggle image selection
  const toggleImageSelection = (imageUrl: string) => {
    setSelectedImages((prev) =>
      prev.includes(imageUrl) ? prev.filter((url) => url !== imageUrl) : [...prev, imageUrl]
    );
  };

  // Delete selected images
  const handleDeleteImages = async () => {
    if (selectedImages.length === 0) {
      alert("select images to delete");
      return;
    }

    if (!confirm(`delete ${selectedImages.length} images?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteImagesApiImagesDeleteDelete({
        image_urls: selectedImages,
      });

      // Refresh the image list and clear selection
      onRefresh();
      setSelectedImages([]);
    } catch (error) {
      console.error("Error deleting images:", error);
      alert("failed to delete images");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="shadow-lg border border-gray-200 rounded-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-2xl font-semibold">Gallery</CardTitle>
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={onRefresh}
            disabled={isLoading || isDeleting}
            className={`py-2 px-4 rounded text-md font-semibold ${
              isLoading || isDeleting
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Refresh
          </Button>

          <Button
            onClick={handleDeleteImages}
            disabled={isLoading || isDeleting || selectedImages.length === 0}
            className={`py-2 px-4 rounded text-md font-semibold transition-colors duration-200 ${
              isLoading || isDeleting || selectedImages.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Delete ({selectedImages.length})
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {isLoading || isDeleting ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No images found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <ImageThumbnail
                key={index}
                image={image}
                isSelected={selectedImages.includes(image.image_url)}
                onSelect={() => toggleImageSelection(image.image_url)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGallery;
