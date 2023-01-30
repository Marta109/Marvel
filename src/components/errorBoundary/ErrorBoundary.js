import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    error: false,
  };

  componentDidCatch(error, infoError) {
    this.setState({error: true});
    console.log(error, infoError);
  }

  render() {
    if (this.state.error) {
      return <h2> Something went wrong</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
