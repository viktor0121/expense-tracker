import React from "react";
import { ButtonWithSpinner } from "@/components/button-with-spinner";

interface SaveButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function SaveButton({ onClick, isLoading }: SaveButtonProps) {
  return (
    <ButtonWithSpinner
      size="sm"
      onClick={onClick}
      variant="secondary"
      className="absolute right-0 top-2 rounded-sm"
      btnText="Save"
      isLoading={isLoading}
      loadingText="Saving..."
    />
  );
}
