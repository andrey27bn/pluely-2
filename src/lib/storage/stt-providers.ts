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
import { TYPE_PROVIDER } from "@/types";

export function getCustomSttProviders(): TYPE_PROVIDER[] {
  try {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_SPEECH_PROVIDERS);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((p: any) => p.id && p.isCustom);
  } catch (error) {
    console.error("Error retrieving custom STT providers:", error);
    return [];
  }
}

export function setCustomSttProviders(providers: TYPE_PROVIDER[]): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      STORAGE_KEYS.CUSTOM_SPEECH_PROVIDERS,
      JSON.stringify(providers)
    );
  } catch (error) {
    console.error("Error setting custom STT providers:", error);
  }
}

export function addCustomSttProvider(
  newProvider: Omit<TYPE_PROVIDER, "id" | "isCustom">
): TYPE_PROVIDER | null {
  try {
    const providers = getCustomSttProviders();
    const id = `custom-stt-${Date.now()}`;
    const provider: TYPE_PROVIDER = {
      ...newProvider,
      id,
      isCustom: true,
    };
    providers.push(provider);
    setCustomSttProviders(providers);
    return provider;
  } catch (error) {
    console.error("Error adding custom STT provider:", error);
    return null;
  }
}

export function updateCustomSttProvider(
  id: string,
  updates: Partial<TYPE_PROVIDER>
): boolean {
  try {
    const providers = getCustomSttProviders();
    const index = providers.findIndex((p) => p.id === id && p.isCustom);
    if (index === -1) return false;
    providers[index] = { ...providers[index], ...updates };
    setCustomSttProviders(providers);
    return true;
  } catch (error) {
    console.error("Error updating custom STT provider:", error);
    return false;
  }
}

export function removeCustomSttProvider(id: string): boolean {
  try {
    const providers = getCustomSttProviders();
    const filtered = providers.filter((p) => p.id !== id);
    if (filtered.length === providers.length) return false;
    setCustomSttProviders(filtered);
    return true;
  } catch (error) {
    console.error("Error removing custom STT provider:", error);
    return false;
  }
}
