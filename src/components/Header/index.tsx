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

import { Button, Label } from "@/components";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  description: string;
  isMainTitle?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  rightSlot?: React.ReactNode | null;
  showBorder?: boolean;
  className?: string;
  allowBackButton?: boolean;
}

export const Header = ({
  title,
  description,
  isMainTitle = false,
  titleClassName,
  descriptionClassName,
  rightSlot = null,
  showBorder = false,
  className,
  allowBackButton = false,
}: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        `flex ${
          rightSlot ? "flex-row justify-between items-center" : "flex-col"
        } ${
          isMainTitle && (showBorder || !rightSlot)
            ? "border-b border-input/50 pb-2"
            : ""
        }`,
        className
      )}
    >
      <div className="flex items-center gap-2">
        {allowBackButton && (
          <Button size="icon" variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="size-3 lg:size-4 transition-all duration-300" />
          </Button>
        )}
        <div className="flex flex-col">
          <Label
            className={`${cn(
              "font-semibold line-clamp-1",
              isMainTitle
                ? "text-md lg:text-lg"
                : "text-xs lg:text-sm transition-all duration-300"
            )} ${titleClassName}`}
          >
            {title}
          </Label>
          <p
            className={cn(
              `select-none text-muted-foreground leading-relaxed ${
                isMainTitle
                  ? "text-xs lg:text-sm"
                  : "text-[10px] lg:text-xs transition-all duration-300"
              } ${descriptionClassName}`
            )}
          >
            {description}
          </p>
        </div>
      </div>
      {rightSlot}
    </div>
  );
};
