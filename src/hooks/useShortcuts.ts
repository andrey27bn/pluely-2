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

import { useEffect } from "react";
import { useGlobalShortcuts } from "./useGlobalShortcuts";

interface UseShortcutsProps {
  onAudioRecording?: () => void;
  onScreenshot?: () => void;
  onSystemAudio?: () => void;
  customShortcuts?: Record<string, () => void>;
}

/**
 * Hook to manage global shortcuts for the application
 * Automatically registers callbacks for all shortcut actions
 */
export const useShortcuts = ({
  onAudioRecording,
  onScreenshot,
  onSystemAudio,
  customShortcuts = {},
}: UseShortcutsProps = {}) => {
  const {
    registerAudioCallback,
    registerScreenshotCallback,
    registerSystemAudioCallback,
    registerCustomShortcutCallback,
    unregisterCustomShortcutCallback,
  } = useGlobalShortcuts();

  // Register standard callbacks
  useEffect(() => {
    if (onAudioRecording) {
      registerAudioCallback(onAudioRecording);
    }
  }, [onAudioRecording, registerAudioCallback]);

  useEffect(() => {
    if (onScreenshot) {
      registerScreenshotCallback(onScreenshot);
    }
  }, [onScreenshot, registerScreenshotCallback]);

  useEffect(() => {
    if (onSystemAudio) {
      registerSystemAudioCallback(onSystemAudio);
    }
  }, [onSystemAudio, registerSystemAudioCallback]);

  // Register custom shortcut callbacks
  useEffect(() => {
    Object.entries(customShortcuts).forEach(([actionId, callback]) => {
      registerCustomShortcutCallback(actionId, callback);
    });

    // Cleanup on unmount
    return () => {
      Object.keys(customShortcuts).forEach((actionId) => {
        unregisterCustomShortcutCallback(actionId);
      });
    };
  }, [
    customShortcuts,
    registerCustomShortcutCallback,
    unregisterCustomShortcutCallback,
  ]);

  return useGlobalShortcuts();
};
