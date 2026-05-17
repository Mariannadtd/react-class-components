import { useState } from "react";

export function ErrorButton(): React.ReactNode {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("Test error");
  }

  return (
    <button
      className="error-button"
      type="button"
      onClick={() => {
        setHasError(true);
      }}
    >
      Throw error
    </button>
  );
}
