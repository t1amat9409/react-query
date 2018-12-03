# @itxbornfire/react-query

From Tim's article, and the codesandbox he peovided, this is how a basic component should look like.
Of course you can style it as you wish as shown here https://codesandbox.io/s/92n5zmoq2y?from-embed .

```JavaScript
  import React, { Fragment } from "react";
  import { Query } from "@itxbornfire/react-query";
  
  import {
    LoadingComponent,
    ErrorComponent
  } from ".../path/to/your/components";

  export const BasicQuery = () => (
    <Fragment>
      <h2>BasicQuery</h2>
      <Query url="https://api.github.com">
        {({ state: { data, loading, error }, actions }) => {
          if (loading) {
            return <LoadingComponent />;
          }

          if (error) {
            return <ErrorComponent error={error} />;
          }

          if (data) {
            return (
              <React.Fragment>
                <button onClick={actions.fetch}>
                  Reload
                </button>
                {
                  //render your data
                }
              </React.Fragment>
            );
          }

          return null;
        }}
      </Query>
    </Fragment>
  );
  
```
Here's an interactive sandbox, the original sandbox by Tim himself.

[![Edit 92n5zmoq2y](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/92n5zmoq2y)
