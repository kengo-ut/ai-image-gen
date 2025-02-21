import { useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ImageGalleryProps } from "@/types";

const ImageGallery: React.FC<ImageGalleryProps> = ({
  srcs,
  isLoading,
  selectedImages,
  onSelect,
}) => {
  const toggleImageSelection = (imageSrc: string) => {
    if (selectedImages.includes(imageSrc)) {
      onSelect(selectedImages.filter((src) => src !== imageSrc));
    } else {
      onSelect([...selectedImages, imageSrc]);
    }
  };

  // Update parent component when selection changes
  useEffect(() => {
    onSelect(selectedImages);
  }, [selectedImages, onSelect]);

  if (isLoading && srcs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (srcs.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No images generated yet. Enter a prompt to get started.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {srcs.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`relative rounded-lg overflow-hidden border-2 hover:shadow-md transition-all
              ${selectedImages.includes(src) ? "border-blue-500 shadow-lg" : "border-transparent"}`}
            onClick={() => toggleImageSelection(src)}
          >
            <div className="aspect-w-1 aspect-h-1 w-full">
              <Image
                src={src}
                alt={`Generated image ${index + 1}`}
                width={512}
                height={512}
                className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
              />
              <div className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-md p-1 text-xs">
                Image {index + 1}
              </div>
            </div>

            {selectedImages.includes(src) && (
              <div className="absolute top-2 right-2 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
