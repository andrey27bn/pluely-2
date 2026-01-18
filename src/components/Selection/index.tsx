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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { Loader2 } from "lucide-react";

export const Selection = ({
  selected,
  onChange,
  options,
  placeholder,
  isLoading = false,
  disabled = false,
}: {
  selected?: string;
  onChange: (value: any) => void;
  options: { label: string; value: string; isCustom?: boolean }[] | [];
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Select value={selected || ""} onValueChange={(value) => onChange(value)}>
      <SelectTrigger
        disabled={isLoading || disabled}
        className="shadow-none w-full h-11 border-1 border-input/50 focus:border-primary/50 transition-colors"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            Loading... <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <SelectValue
            placeholder={placeholder}
            className="flex items-center gap-2"
          ></SelectValue>
        )}
      </SelectTrigger>
      <SelectContent>
        {options?.filter((provider) => provider.isCustom).length > 0 && (
          <div className="border-b border-input/50 pb-2">
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
              Custom AI Providers
            </div>
            {options
              ?.filter((provider) => provider.isCustom)
              .map((provider) => (
                <SelectItem
                  key={provider.value}
                  value={provider.value}
                  className="cursor-pointer hover:bg-accent/50"
                >
                  <span className="font-medium">{provider.label}</span>
                </SelectItem>
              ))}
          </div>
        )}
        {options
          ?.filter((provider) => !provider.isCustom)
          .map((provider) => (
            <SelectItem
              key={provider.value}
              value={provider.value}
              className="cursor-pointer hover:bg-accent/50"
            >
              <span className="font-medium">{provider.label}</span>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
