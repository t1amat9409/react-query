# @itxbornfire/react-query

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
