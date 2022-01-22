function loadComponent(importFunc) {
  return class WrappedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: null,
      };
    }

    componentDidMount() {
      importFunc().then(({ default: MyDefaultComponent }) =>
        this.setState({ Component: MyDefaultComponent })
      );
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  };
}
