import React, { useState } from "react";

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

const MyDefaultComponent = loadComponent(() => import("./MyDefaultComponent"));

function App() {
  const [names, namesSet] = useState(null);
  const loadJson = async () => {
    const { default: names } = await import("./names");
    const { makeUppercase } = await import(
      "./utilities" /* webpackChunkName: "utilities" */
    );
    namesSet(makeUppercase(names));
  };

  return (
    <div>
      <div>Home App</div>
      <button onClick={loadJson}>Load</button>
      <div>{JSON.stringify(names)}</div>
      {names && MyDefaultComponent && <MyDefaultComponent />}
    </div>
  );
}

export default App;
