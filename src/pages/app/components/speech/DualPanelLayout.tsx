import { useState } from "react";
import { TranscribedFragmentsPanel } from "./TranscribedFragmentsPanel";
import { AIChatPanel } from "./AIChatPanel";
import { TranscribedFragment, ChatConversation } from "@/types";
import { Button } from "@/components";
import { SplitIcon, Columns3Icon } from "lucide-react";

type Props = {
  transcribedFragments: TranscribedFragment[];
  sendFragmentToAI: (fragment: TranscribedFragment) => void;
  removeFragment?: (fragment: TranscribedFragment) => void;
  lastAIResponse: string;
  isAIProcessing: boolean;
  conversation: ChatConversation;
  cancelAIProcessing?: () => void;
};

export const DualPanelLayout = ({
  transcribedFragments,
  sendFragmentToAI,
  removeFragment,
  lastAIResponse,
  isAIProcessing,
  conversation,
  cancelAIProcessing,
}: Props) => {
  const [layout, setLayout] = useState<"split" | "fragments" | "chat">("split");

  return (
    <div className="flex flex-col h-full">
      {/* Layout Controls */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-border/50">
        <h3 className="text-sm font-medium">Audio Assistant</h3>
        
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={layout === "split" ? "default" : "outline"}
            onClick={() => setLayout("split")}
            title="Split view"
            className="h-7 w-7 p-0"
          >
            <Columns3Icon className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant={layout === "fragments" ? "default" : "outline"}
            onClick={() => setLayout("fragments")}
            title="Show fragments only"
            className="h-7 w-7 p-0"
          >
            <SplitIcon className="h-4 w-4 rotate-90" />
          </Button>
          
          <Button
            size="sm"
            variant={layout === "chat" ? "default" : "outline"}
            onClick={() => setLayout("chat")}
            title="Show chat only"
            className="h-7 w-7 p-0"
          >
            <SplitIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Panels */}
      <div className="flex-1 overflow-hidden">
        {layout === "split" ? (
          <div className="flex h-full gap-3">
            <div className="w-1/2 overflow-hidden">
              <TranscribedFragmentsPanel
                transcribedFragments={transcribedFragments}
                sendFragmentToAI={sendFragmentToAI}
                removeFragment={removeFragment}
                isAIProcessing={isAIProcessing}
              />
            </div>
            <div className="w-1/2 overflow-hidden">
              <AIChatPanel
                lastAIResponse={lastAIResponse}
                isAIProcessing={isAIProcessing}
                conversation={conversation}
                cancelAIProcessing={cancelAIProcessing}
              />
            </div>
          </div>
        ) : layout === "fragments" ? (
          <div className="h-full">
            <TranscribedFragmentsPanel
              transcribedFragments={transcribedFragments}
              sendFragmentToAI={sendFragmentToAI}
              removeFragment={removeFragment}
              isAIProcessing={isAIProcessing}
            />
          </div>
        ) : (
          <div className="h-full">
            <AIChatPanel
              lastAIResponse={lastAIResponse}
              isAIProcessing={isAIProcessing}
              conversation={conversation}
              cancelAIProcessing={cancelAIProcessing}
            />
          </div>
        )}
      </div>
    </div>
  );
};