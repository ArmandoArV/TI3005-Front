export interface IButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | "cancel";
}
