/*
 * This file is part of Pluely.
 *
 * Pluely is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pluely is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Pluely.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Button } from "@/components";
import { LaptopMinimalIcon, Loader2, MousePointer2Icon } from "lucide-react";
import { MAX_FILES } from "@/config";
import { useApp } from "@/contexts";

interface ChatScreenshotProps {
  screenshotConfiguration: any;
  attachedFiles: any[];
  isLoading: boolean;
  captureScreenshot: () => Promise<void>;
  isScreenshotLoading: boolean;
  disabled: boolean;
}

export const ChatScreenshot = ({
  screenshotConfiguration,
  attachedFiles,
  isLoading,
  captureScreenshot,
  isScreenshotLoading,
  disabled,
}: ChatScreenshotProps) => {
  const { supportsImages, selectedAIProvider, allAiProviders } = useApp();

  const captureMode = screenshotConfiguration.enabled
    ? "Screenshot"
    : "Selection";
  const processingMode = screenshotConfiguration.mode;

  // Check if AI provider is required but not selected (for auto mode)
  const aiProviderRequired = screenshotConfiguration.enabled &&
                             screenshotConfiguration.mode === "auto" &&
                             (!selectedAIProvider?.provider &&
                              !allAiProviders?.find((p: any) => p.id === selectedAIProvider?.provider));

  const title = aiProviderRequired
    ? "Please select an AI provider in settings"
    : !supportsImages
      ? "Screenshot not supported by current AI provider"
      : `${captureMode} mode (${processingMode}) - ${attachedFiles.length}/${MAX_FILES} files`;

  return (
    <Button
      size="icon"
      variant="outline"
      className="size-7 lg:size-9 rounded-lg lg:rounded-xl"
      title={title}
      onClick={captureScreenshot}
      disabled={
        attachedFiles.length >= MAX_FILES ||
        isLoading ||
        isScreenshotLoading ||
        disabled ||
        aiProviderRequired
      }
    >
      {isScreenshotLoading ? (
        <Loader2 className="size-3 lg:size-4 animate-spin" />
      ) : screenshotConfiguration.enabled ? (
        <LaptopMinimalIcon className="size-3 lg:size-4" />
      ) : (
        <MousePointer2Icon className="size-3 lg:size-4" />
      )}
    </Button>
  );
};
