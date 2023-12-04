export interface IFilePickerProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
  readFile: (name: string) => void;
}
