import { useState } from "react";
import { Button } from "./Button";

export function ErrorButton(): React.ReactNode {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("Test error");
  }

  return (
    <Button
      className="error-button"
      onClick={() => {
        setHasError(true);
      }}
    >
      Throw error
    </Button>
  );
}
