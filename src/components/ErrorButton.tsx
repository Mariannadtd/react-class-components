import { Component } from "react";

interface ErrorButtonState {
  shouldThrowError: boolean;
}

export class ErrorButton extends Component<object, ErrorButtonState> {
  state: ErrorButtonState = {
    shouldThrowError: false,
  };

  handleClick = (): void => {
    this.setState({
      shouldThrowError: true,
    });
  };

  render(): React.ReactNode {
    if (this.state.shouldThrowError) {
      throw new Error("Test application error");
    }

    return (
      <button
        className="error-test-button"
        type="button"
        onClick={this.handleClick}
      >
        Simulate Error
      </button>
    );
  }
}
