import { Component } from "react";

export class Loader extends Component {
  render(): React.ReactNode {
    return (
      <div className="loader-wrapper" aria-live="polite">
        <div className="loader" />
        <span>Loading...</span>
      </div>
    );
  }
}
