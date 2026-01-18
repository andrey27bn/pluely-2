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

/**
 * Get current platform
 */
export const getPlatform = (): "macos" | "windows" | "linux" => {
  // Try modern API first (if available)
  if ((navigator as any).userAgentData?.platform) {
    const platform = (navigator as any).userAgentData.platform.toLowerCase();
    if (platform.includes("mac")) return "macos";
    if (platform.includes("win")) return "windows";
    return "linux";
  }

  // Fallback to deprecated API
  const platform = navigator.platform.toLowerCase();
  if (platform.includes("mac")) return "macos";
  if (platform.includes("win")) return "windows";
  return "linux";
};

/**
 * Check if current platform is macOS
 */
export const isMacOS = (): boolean => getPlatform() === "macos";

/**
 * Check if current platform is Windows
 */
export const isWindows = (): boolean => getPlatform() === "windows";

/**
 * Check if current platform is Linux
 */
export const isLinux = (): boolean => getPlatform() === "linux";
