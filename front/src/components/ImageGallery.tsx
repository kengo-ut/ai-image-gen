import React, { useState } from "react";
import { deleteImagesApiImagesDeleteDelete } from "@/gen/images/images";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import ImageThumbnail from "./ImageThumbnail";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ImageGalleryProps } from "@/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, onRefresh }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toggle image selection
  const toggleImageSelection = (imageUrl: string) => {
    setSelectedImages((prev) =>
      prev.includes(imageUrl) ? prev.filter((url) => url !== imageUrl) : [...prev, imageUrl]
    );
  };

  const handleSaveImages = async () => {
    if (selectedImages.length === 0) {
      alert("Select images to save");
      return;
    }

    const zip = new JSZip();
    const imagePromises = selectedImages.map(async (imageUrl) => {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const filename = imageUrl.split("/").pop()?.slice(0, -1) || "image.jpg";
      zip.file(filename, blob);
    });

    await Promise.all(imagePromises);
    const zipBlob = await zip.generateAsync({ type: "blob" });

    if ("showSaveFilePicker" in window) {
      try {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: "selected_images.zip",
          types: [
            {
              description: "ZIP file",
              accept: { "application/zip": [".zip"] },
            },
          ],
        });

        if (!fileHandle) {
          return;
        }

        const writable = await fileHandle.createWritable();
        await writable.write(zipBlob);
        await writable.close();
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("File save cancelled");
        } else {
          console.error("File save failed:", error);
          alert("Failed to save images");
        }
      }
    } else {
      saveAs(zipBlob, "selected_images.zip");
    }
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
        <CardTitle className="text-2xl font-semibold mb-4">Gallery</CardTitle>
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
          <Button
            onClick={handleSaveImages}
            disabled={selectedImages.length === 0}
            className={`py-2 px-4 rounded text-md font-semibold transition-colors duration-200 ${
              isLoading || isDeleting || selectedImages.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Save ({selectedImages.length})
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
          <ScrollArea className="h-80">
            <div className="flex w-max space-x-4 p-4">
              {images.map((image, index) => (
                <ImageThumbnail
                  key={index}
                  image={image}
                  isSelected={selectedImages.includes(image.image_url)}
                  onSelect={() => toggleImageSelection(image.image_url)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGallery;
