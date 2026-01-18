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

import {
  Header,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { useApp } from "@/contexts";
import { getPlatform } from "@/lib";
import { CursorType } from "@/lib/storage";
import { MousePointer, MousePointer2, Pointer, TextCursor } from "lucide-react";

interface CursorSelectionProps {
  className?: string;
}

export const CursorSelection = ({ className }: CursorSelectionProps) => {
  const { customizable, setCursorType } = useApp();
  const platform = getPlatform();

  return (
    <div id="cursor" className={`space-y-2 ${className}`}>
      <Header
        title="Cursor"
        description="Control pluely cursor visibility"
        isMainTitle
        rightSlot={
          <Select
            value={customizable.cursor.type}
            onValueChange={(value) => setCursorType(value as CursorType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a cursor type" />
            </SelectTrigger>
            <SelectContent position="popper" align="end">
              <SelectItem value="invisible" disabled={platform === "linux"}>
                Invisible (<MousePointer2 className="size-3 px-0" />){" "}
                {platform === "linux" && (
                  <span className="text-xs text-muted-foreground">
                    Not supported on Linux
                  </span>
                )}
              </SelectItem>
              <SelectItem value="default">
                Default (<MousePointer className="size-3" />)
              </SelectItem>
              <SelectItem value="auto">
                Auto (
                <MousePointer className="size-3" />/
                <TextCursor className="size-3" /> /
                <Pointer className="size-3" />)
              </SelectItem>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
};
