// Interface for transcribed fragments
export interface TranscribedFragment {
  id: string;
  content: string;
  timestamp: number;
  processed: boolean; // Whether this fragment has been sent to AI
}