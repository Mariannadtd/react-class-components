import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "../ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Application error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="error-boundary">
          <h2>Something went wrong</h2>
          <p>The application caught an unexpected error.</p>
          <Button onClick={this.handleReset}>
            Try again
          </Button>
        </section>
      );
    }

    return this.props.children;
  }
}
