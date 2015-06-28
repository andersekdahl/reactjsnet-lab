import React from 'react';

global.React = React;
global.App = React.createClass({
  displayName: 'App',
  getInitialState() {
    return {
      count: this.props.count
    };
  },
  componentDidMount() {
    setInterval(() => this.setState({count: this.state.count + 1}), 1000);
  },
  render() {
    return <div>Rendered {this.state.count}</div>;
  }
});
