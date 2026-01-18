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

import { Input, Label } from "@/components";

export const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  notes,
}: {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  notes?: string;
}) => {
  return (
    <div className="space-y-1">
      {label ? <Label className="text-xs font-medium">{label}</Label> : null}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 border-1 border-input/50 focus:border-primary/50 transition-colors ${
          error ? "border-destructive" : ""
        }`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      {notes && <p className="text-xs text-muted-foreground">{notes}</p>}
    </div>
  );
};
