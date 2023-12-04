export interface IAIPickerProps {
  generating?: boolean;
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleSubmit: (type: string) => void;
}
