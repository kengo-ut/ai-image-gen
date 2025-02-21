import React from "react";
import { ImageActionsProps } from "@/types";

const ImageActions: React.FC<ImageActionsProps> = ({
  selectedImages,
  onClearSelected,
  onDeleteSelected,
  onUploadSelected,
}) => {
  if (selectedImages.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="text-sm text-gray-600 mb-2 md:mb-0">
          {selectedImages.length} {selectedImages.length === 1 ? "image" : "images"} selected
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onClearSelected}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear Selection
          </button>

          <button
            onClick={onDeleteSelected}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete Selected
          </button>

          <button
            onClick={onUploadSelected}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Upload Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageActions;
