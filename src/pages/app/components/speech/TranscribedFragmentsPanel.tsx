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

import { TranscribedFragment } from "@/types";
import { Button, CopyButton } from "@/components";
import { HeadphonesIcon, SendIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  transcribedFragments: TranscribedFragment[];
  sendFragmentToAI: (fragment: TranscribedFragment) => void;
  removeFragment?: (fragment: TranscribedFragment) => void;
  isAIProcessing: boolean;
};

export const TranscribedFragmentsPanel = ({
  transcribedFragments,
  sendFragmentToAI,
  removeFragment,
  isAIProcessing,
}: Props) => {
  if (transcribedFragments.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No transcribed fragments yet
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-border/50">
        <HeadphonesIcon className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-medium">Transcribed Fragments</h4>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {transcribedFragments.map((fragment, index) => (
          <div
            key={fragment.id || index}
            className={cn(
              "p-3 rounded-lg border bg-card text-card-foreground text-sm",
              fragment.processed
                ? "border-green-500/30 bg-green-500/5"
                : "border-border/50"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <HeadphonesIcon className="h-3 w-3 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Fragment {index + 1}
                  </span>
                  {fragment.processed && (
                    <span className="text-[10px] text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                      Sent
                    </span>
                  )}
                </div>
                <p className="text-sm break-words">{fragment.content}</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7 flex-shrink-0"
                  onClick={() => sendFragmentToAI(fragment)}
                  title="Send this fragment to AI"
                  disabled={isAIProcessing}
                >
                  <SendIcon className="h-3.5 w-3.5" />
                </Button>

                {removeFragment && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={() => removeFragment(fragment)}
                    title="Remove this fragment"
                  >
                    <Trash2Icon className="h-3.5 w-3.5" />
                  </Button>
                )}

                <CopyButton
                  content={fragment.content}
                  className="h-7 w-7 p-0 flex-shrink-0"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};