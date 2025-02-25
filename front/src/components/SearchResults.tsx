import { Metadata } from "@/gen/schema";
import ImageThumbnail from "./ImageThumbnail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SearchResultsProps {
  searchResults: Metadata[];
}

const SearchResults = ({ searchResults }: SearchResultsProps) => {
  if (searchResults.length === 0) return null;

  return (
    <Card className="shadow-lg border border-gray-200 rounded-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-2xl font-semibold">Search Results</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {searchResults.map((image, index) => (
            <ImageThumbnail key={index} image={image} isSelected={false} onSelect={() => {}} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResults;
