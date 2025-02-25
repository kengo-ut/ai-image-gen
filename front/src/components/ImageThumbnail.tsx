import React from "react";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { FileText } from "lucide-react";

import { ImageThumbnailProps } from "@/types";

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ image, isSelected, onSelect }) => {
  return (
    <div
      className={`flex flex-col items-center relative cursor-pointer ${
        isSelected ? "border-2 border-blue-500 bg-blue-50" : "border border-transparent"
      } rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg p-4`}
    >
      <Image
        src={image.image_url}
        alt={image.prompt}
        width={200}
        height={200}
        className="rounded-lg object-cover mb-2" // 下にマージンを追加
        onClick={onSelect}
      />
      <Popover>
        <PopoverTrigger>
          <FileText size={20} className="hover:text-gray-400" />
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <p>{image.prompt}</p>
        </PopoverContent>
      </Popover>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
          <Check size={16} />
        </div>
      )}
    </div>
  );
};

export default ImageThumbnail;
