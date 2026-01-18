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
  EmptyComponent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components";
import { Loader2 } from "lucide-react";

export const Empty = ({
  icon,
  title,
  description,
  isLoading = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  isLoading?: boolean;
}) => {
  const Icon = icon;
  return isLoading ? (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="size-8 animate-spin" />
    </div>
  ) : (
    <EmptyComponent>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon icon={icon} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="-mt-2">{description}</EmptyDescription>
      </EmptyHeader>
    </EmptyComponent>
  );
};
