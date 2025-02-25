import { Metadata } from "@/gen/schema";

export interface ImageGalleryProps {
  images: Metadata[];
  isLoading: boolean;
  onRefresh: () => void;
}

export interface SearchResultsProps {
  searchResults: Metadata[];
  setSearchResults: (results: Metadata[]) => void;
  onRefresh: () => void;
}

export interface ImageThumbnailProps {
  image: Metadata;
  isSelected: boolean;
  onSelect: () => void;
}

export interface ImageSearchProps {
  onSearchResults: (results: Metadata[]) => void;
}

export type SearchType = "text" | "image";

export interface ImageGeneratorProps {
  onImageGenerated: () => void;
}

export interface FileUploadProps {
  selectedFilePreview: string | null;
  onFileChange: (file: File | null, preview: string | null) => void;
  disabled?: boolean;
}

export interface FilePickerOptions {
  excludeAcceptAllOption?: boolean; // デフォルトは false
  suggestedName?: string; // 提案するファイル名
  types?: Array<{
    description?: string; // カテゴリーの説明（省略可能）
    accept: Record<string, string[]>; // MIME タイプと拡張子のマッピング
  }>;
}
