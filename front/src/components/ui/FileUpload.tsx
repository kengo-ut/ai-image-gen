import Image from "next/image";
import React, { useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploadProps } from "@/types";

const FileUpload: React.FC<FileUploadProps> = ({
  selectedFilePreview,
  onFileChange,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileChange(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearFile = () => {
    onFileChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-4">
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled}
      />

      <div className="flex flex-col items-center">
        {selectedFilePreview ? (
          <div className="mb-2 relative">
            <Image
              src={selectedFilePreview}
              alt="Selected"
              width={200}
              height={200}
              className="h-50 object-contain rounded border"
            />
            <X
              size={24}
              onClick={handleClearFile}
              className="absolute top-2 left-2 cursor-pointer
            bg-red-500 rounded-full p-1 shadow-md text-white"
            />
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="h-40 w-full border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <div className="text-lg text-center text-gray-500">Click to select a image file</div>
          </div>
        )}

        {selectedFilePreview ? (
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 px-4 py-1 rounded text-md font-semibold bg-blue-500 text-white hover:bg-blue-600"
            disabled={disabled}
          >
            Select another
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default FileUpload;
