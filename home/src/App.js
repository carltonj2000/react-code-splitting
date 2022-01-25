import React, { useState } from "react";

import Header from "./Header";

const MyDefaultComponent = React.lazy(() => import("./MyDefaultComponent"));

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
      <Header />
      <div>Home App</div>
      <button onClick={loadJson}>Load</button>
      <div>{JSON.stringify(names)}</div>
      {names && MyDefaultComponent && (
        <React.Suspense fallback={<div>Loading</div>}>
          <MyDefaultComponent />
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
