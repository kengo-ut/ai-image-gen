import { useState } from "react";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { Settings, Prompt, PromptInputProps } from "@/types";

const PromptInput: React.FC<PromptInputProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState<Prompt>("");
  const [settings, setSettings] = useState<Settings>({
    steps: 30,
    guidanceScale: 7.5,
  });
  const { generateImages, isLoading, error } = useImageGeneration();
  const MAX_CHARS = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const newImageSrc: string | null = await generateImages(prompt, settings);

    if (newImageSrc) {
      onImageGenerated(newImageSrc);
    }
  };

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: parseFloat(value),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-4 bg-gray-50 rounded-lg shadow"
    >
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
          Image Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={MAX_CHARS}
          placeholder="Describe the image you want to generate..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
        <div className="text-sm text-gray-500 text-right mt-1">
          {prompt.length}/{MAX_CHARS}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-1">
            Steps: {settings.steps}
          </label>
          <input
            type="range"
            id="steps"
            name="steps"
            min="10"
            max="50"
            value={settings.steps}
            onChange={handleSettingChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label htmlFor="guidanceScale" className="block text-sm font-medium text-gray-700 mb-1">
            Guidance Scale: {settings.guidanceScale.toFixed(1)}
          </label>
          <input
            type="range"
            id="guidanceScale"
            name="guidanceScale"
            min="1"
            max="20"
            step="0.5"
            value={settings.guidanceScale}
            onChange={handleSettingChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className={`w-full py-2 px-4 rounded-md text-white font-medium 
          ${
            isLoading || !prompt.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {isLoading ? "Generating..." : "Generate Image"}
      </button>
    </form>
  );
};

export default PromptInput;
