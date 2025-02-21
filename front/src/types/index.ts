export interface Settings {
  steps: number;
  guidanceScale: number;
}

export type Prompt = string;

export interface ImageActionsProps {
  selectedImages: string[];
  onClearSelected: () => void;
  onDeleteSelected: () => void;
  onUploadSelected: () => void;
}

export interface ImageGalleryProps {
  srcs: string[];
  isLoading: boolean;
  selectedImages: string[];
  onSelect: (selectedImages: string[]) => void;
}

export interface PromptInputProps {
  onImageGenerated: (imageSrc: string) => void;
}
