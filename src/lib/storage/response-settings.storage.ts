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

import { STORAGE_KEYS } from "@/config";
import {
  DEFAULT_RESPONSE_LENGTH,
  DEFAULT_LANGUAGE,
  DEFAULT_AUTO_SCROLL,
} from "../response-settings.constants";

export interface ResponseSettings {
  responseLength: string;
  language: string;
  autoScroll: boolean;
}

export const DEFAULT_RESPONSE_SETTINGS: ResponseSettings = {
  responseLength: DEFAULT_RESPONSE_LENGTH,
  language: DEFAULT_LANGUAGE,
  autoScroll: DEFAULT_AUTO_SCROLL,
};

/**
 * Get response settings from localStorage
 */
export const getResponseSettings = (): ResponseSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RESPONSE_SETTINGS);
    if (!stored) {
      return DEFAULT_RESPONSE_SETTINGS;
    }

    const parsedSettings = JSON.parse(stored);

    return {
      responseLength:
        parsedSettings.responseLength ||
        DEFAULT_RESPONSE_SETTINGS.responseLength,
      language: parsedSettings.language || DEFAULT_RESPONSE_SETTINGS.language,
      autoScroll:
        parsedSettings.autoScroll !== undefined
          ? parsedSettings.autoScroll
          : DEFAULT_RESPONSE_SETTINGS.autoScroll,
    };
  } catch (error) {
    console.error("Failed to get response settings:", error);
    return DEFAULT_RESPONSE_SETTINGS;
  }
};

/**
 * Save response settings to localStorage
 */
export const setResponseSettings = (settings: ResponseSettings): void => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.RESPONSE_SETTINGS,
      JSON.stringify(settings)
    );
  } catch (error) {
    console.error("Failed to save response settings:", error);
  }
};

/**
 * Update response length
 */
export const updateResponseLength = (
  responseLength: string
): ResponseSettings => {
  const currentSettings = getResponseSettings();
  const newSettings = { ...currentSettings, responseLength };
  setResponseSettings(newSettings);
  return newSettings;
};

/**
 * Update language
 */
export const updateLanguage = (language: string): ResponseSettings => {
  const currentSettings = getResponseSettings();
  const newSettings = { ...currentSettings, language };
  setResponseSettings(newSettings);
  return newSettings;
};

/**
 * Update auto-scroll
 */
export const updateAutoScroll = (autoScroll: boolean): ResponseSettings => {
  const currentSettings = getResponseSettings();
  const newSettings = { ...currentSettings, autoScroll };
  setResponseSettings(newSettings);
  return newSettings;
};
