import React, { Component } from "react";
import Error500 from "./500";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn(error);
  }

  render() {
    if (this.state.hasError) {
      return <Error500 />;
    }

    return this.props.children;
  }
}
