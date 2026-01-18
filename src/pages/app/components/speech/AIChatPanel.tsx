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

import { ChatConversation } from "@/types";
import { Markdown, CopyButton, Button } from "@/components";
import { BotIcon, Loader2, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  lastAIResponse: string;
  isAIProcessing: boolean;
  conversation: ChatConversation;
  cancelAIProcessing?: () => void;
};

export const AIChatPanel = ({
  lastAIResponse,
  isAIProcessing,
  conversation,
  cancelAIProcessing,
}: Props) => {
  const hasResponse = lastAIResponse || isAIProcessing;
  const hasHistory = conversation.messages.length > 0;

  if (!hasResponse && !hasHistory) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No AI responses yet
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-border/50">
        <BotIcon className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-medium">AI Responses</h4>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {/* Current AI Response */}
        {hasResponse && (
          <div className="rounded-lg border bg-background p-3">
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <BotIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  AI Response
                </span>
              </div>
              {isAIProcessing && cancelAIProcessing && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelAIProcessing}
                  className="h-6 text-[10px] px-2"
                >
                  Cancel
                </Button>
              )}
            </div>
            
            {isAIProcessing && !lastAIResponse ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Generating response...
                </span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <Markdown>{lastAIResponse}</Markdown>
                {isAIProcessing && (
                  <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 align-middle" />
                )}
              </div>
            )}
            
            {lastAIResponse && !isAIProcessing && (
              <div className="mt-2 flex justify-end">
                <CopyButton content={lastAIResponse} />
              </div>
            )}
          </div>
        )}

        {/* Previous Conversation History */}
        {hasHistory && (
          <div className="space-y-3">
            <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide pt-2 border-t border-border/50">
              Conversation History
            </h5>
            
            {conversation.messages
              .filter(msg => msg.role === 'assistant') // Only show AI responses
              .map((message, index) => (
                <div 
                  key={message.id || index} 
                  className="rounded-lg border bg-background p-3"
                >
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <div className="flex items-center gap-1.5">
                      <BotIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        AI Response
                      </span>
                    </div>
                    <CopyButton content={message.content} className="h-6 w-6 p-0" />
                  </div>
                  
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <Markdown>{message.content}</Markdown>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};