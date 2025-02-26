import React, { useState } from "react";
import { searchImagesApiImagesSearchPost } from "@/gen/images/images";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FileUpload from "@/components/ui/FileUpload";
import {
  BodySearchImagesApiImagesSearchPost,
  SearchImagesApiImagesSearchPostParams,
} from "@/gen/schema";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import { SearchType, ImageSearchProps } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

const ImageSearch: React.FC<ImageSearchProps> = ({ onSearchResults }) => {
  const [searchType, setSearchType] = useState<SearchType>("text");
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
  const [topk, setTopk] = useState(3);
  const [isCrossModal, setIsCrossModal] = useState(false);

  // Handle file selection
  const handleFileChange = (file: File | null, preview: string | null) => {
    setSelectedFile(file);
    setSelectedFilePreview(preview);
  };

  // Search images
  const handleSearchImages = async () => {
    if (searchType === "text" && !searchText.trim()) {
      alert("a search query is required");
      return;
    }

    if (searchType === "image" && !selectedFile) {
      alert("an image file is required");
      return;
    }

    setIsSearching(true);
    try {
      const body: BodySearchImagesApiImagesSearchPost = {
        image: searchType === "image" ? selectedFile : null,
      };

      const params: SearchImagesApiImagesSearchPostParams = {
        query: searchType === "text" ? searchText : null,
        is_cross_modal: isCrossModal,
        topk,
      };

      const response = await searchImagesApiImagesSearchPost(body, params);
      onSearchResults(response.data);
    } catch (error) {
      console.error("Error searching images:", error);
      alert("failed to search images");
      onSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Card className="shadow-lg border border-gray-200 rounded-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-2xl font-semibold">Search</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex flex-row justify-between items-center gap-4 mb-4">
            {/* Search Type */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="query" className="text-md font-semibold">
                query:
              </Label>
              <RadioGroup
                defaultValue="text"
                onValueChange={(value) => setSearchType(value as SearchType)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <Label htmlFor="text" className="text-md">
                    text
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image" className="text-md">
                    image
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Cross Modal Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="cross-modal"
                checked={isCrossModal}
                onCheckedChange={() => setIsCrossModal(!isCrossModal)}
              />
              <Label htmlFor="cross-modal" className="text-md font-semibold">
                cross modal
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Enable cross-modal search to find related images from text and vice versa.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {searchType === "text" ? (
            <div className="mb-4">
              <Input
                id="search-text"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="text prompt (e.g., 'A cute, fluffy cat with striking green eyes.')"
                disabled={isSearching}
              />
            </div>
          ) : (
            <FileUpload
              selectedFilePreview={selectedFilePreview}
              onFileChange={handleFileChange}
              disabled={isSearching}
            />
          )}

          <div className="mb-4">
            <Label htmlFor="steps" className="block text-md font-semibold mb-1">
              topk: {topk}
            </Label>
            <Slider
              defaultValue={[topk]}
              min={1}
              max={10}
              onValueChange={(value) => setTopk(value[0])}
              disabled={isSearching}
            />
          </div>

          <Button
            onClick={handleSearchImages}
            disabled={
              isSearching ||
              (searchType === "text" && !searchText.trim()) ||
              (searchType === "image" && !selectedFile)
            }
            className={`w-full py-2 rounded text-md font-semibold ${
              isSearching ||
              (searchType === "text" && !searchText.trim()) ||
              (searchType === "image" && !selectedFile)
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageSearch;
