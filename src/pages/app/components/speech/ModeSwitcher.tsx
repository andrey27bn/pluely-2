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

import { cn } from "@/lib/utils";
import { AudioWaveformIcon, MicIcon } from "lucide-react";

interface ModeSwitcherProps {
  isVadMode: boolean;
  onModeChange: (vadEnabled: boolean) => void;
  disabled?: boolean;
}

export const ModeSwitcher = ({
  isVadMode,
  onModeChange,
  disabled = false,
}: ModeSwitcherProps) => {
  return (
    <div
      className={cn(
        "flex bg-muted rounded-lg w-full p-0.5 gap-0.5",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <button
        type="button"
        onClick={() => onModeChange(true)}
        disabled={disabled}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-md transition-all",
          isVadMode
            ? "bg-background shadow-sm text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <AudioWaveformIcon className="w-4 h-4 flex-shrink-0" />
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium leading-tight">Auto-detect</span>
          <span className="text-[9px] font-normal opacity-60 leading-tight">
            (voice activity)
          </span>
        </div>
      </button>
      <button
        type="button"
        onClick={() => onModeChange(false)}
        disabled={disabled}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-md transition-all",
          !isVadMode
            ? "bg-background shadow-sm text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <MicIcon className="w-4 h-4 flex-shrink-0" />
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium leading-tight">Manual</span>
          <span className="text-[9px] font-normal opacity-60 leading-tight">
            (press to record)
          </span>
        </div>
      </button>
    </div>
  );
};
