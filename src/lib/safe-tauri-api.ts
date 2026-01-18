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
 * Safe Tauri API wrapper that handles browser environments gracefully
 */

// Check if we're in a Tauri environment
const isTauriEnvironment = (): boolean => {
  try {
    // Check for Tauri globals
    return typeof window !== 'undefined' && 
           // @ts-ignore - tauri object may not exist
           !!window.__TAURI_INTERNALS__ || 
           // @ts-ignore - __TAURI__ object may not exist
           !!window.__TAURI__;
  } catch {
    return false;
  }
};

// Safe invoke function
export const safeInvoke = async <T = any>(
  command: string, 
  args?: Record<string, unknown>
): Promise<T> => {
  if (!isTauriEnvironment()) {
    console.warn(`Tauri environment not detected. Skipping invoke: ${command}`);
    // Return mock responses based on command for browser environment
    switch (command) {
      case 'get_app_version':
        return 'browser-version' as T;
      case 'check_license_status':
      case 'validate_license_api':
        return { is_active: true, is_dev_license: false } as T;
      case 'get_selected_audio_devices':
        return { input: { id: 'default', name: 'Default Input' }, output: { id: 'default', name: 'Default Output' } } as T;
      case 'check_system_audio_access':
        return true as T;
      case 'get_registered_shortcuts':
        return {} as T;
      case 'fetch_models':
        return [] as T;
      case 'fetch_prompts':
        return { prompts: [], categories: [] } as T;
      default:
        return {} as T;
    }
  }

  try {
    // Dynamically import tauri API to avoid bundling in browser
    const { invoke } = await import('@tauri-apps/api/core');
    return await invoke<T>(command, args);
  } catch (error) {
    console.error(`Safe invoke error for command '${command}':`, error);
    throw error;
  }
};

// Safe listen function
export const safeListen = async (
  event: string,
  handler: (event: any) => void
): Promise<() => void> => {
  if (!isTauriEnvironment()) {
    console.warn(`Tauri environment not detected. Skipping listen: ${event}`);
    // Return a no-op unlisten function
    return () => {};
  }

  try {
    const { listen } = await import('@tauri-apps/api/event');
    return await listen(event, handler);
  } catch (error) {
    console.error(`Safe listen error for event '${event}':`, error);
    // Return a no-op unlisten function
    return () => {};
  }
};

// Safe getCurrentWindow function
export const safeGetCurrentWindow = async () => {
  if (!isTauriEnvironment()) {
    console.warn('Tauri environment not detected. Skipping getCurrentWindow');
    // Return a mock window object for browser
    return {
      label: 'main',
      onFocusChanged: (callback: (event: { payload: boolean }) => void) => {
        // Mock focus change listener
        const focusHandler = (focused: boolean) => {
          callback({ payload: focused });
        };
        
        window.addEventListener('focus', () => focusHandler(true));
        window.addEventListener('blur', () => focusHandler(false));
        
        return () => {
          window.removeEventListener('focus', () => focusHandler(true));
          window.removeEventListener('blur', () => focusHandler(false));
        };
      }
    };
  }

  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    return getCurrentWindow();
  } catch (error) {
    console.error('Safe getCurrentWindow error:', error);
    throw error;
  }
};

// Safe getCurrentWebviewWindow function
export const safeGetCurrentWebviewWindow = async () => {
  if (!isTauriEnvironment()) {
    console.warn('Tauri environment not detected. Skipping getCurrentWebviewWindow');
    // Return a mock webview window object for browser
    return {
      label: 'main',
      onFocusChanged: (callback: (event: { payload: boolean }) => void) => {
        // Mock focus change listener
        const focusHandler = (focused: boolean) => {
          callback({ payload: focused });
        };
        
        window.addEventListener('focus', () => focusHandler(true));
        window.addEventListener('blur', () => focusHandler(false));
        
        return () => {
          window.removeEventListener('focus', () => focusHandler(true));
          window.removeEventListener('blur', () => focusHandler(false));
        };
      }
    };
  }

  try {
    const { getCurrentWebviewWindow } = await import('@tauri-apps/api/webviewWindow');
    return getCurrentWebviewWindow();
  } catch (error) {
    console.error('Safe getCurrentWebviewWindow error:', error);
    throw error;
  }
};

// Utility function to check if running in Tauri
export const checkTauriEnvironment = (): boolean => {
  return isTauriEnvironment();
};