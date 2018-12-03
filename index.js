import React, { Component, createContext } from "react";

const initialState = {
  data: null,
  loading: false,
  error: null
};

const initialQueryContextValue = {
  state: initialState,
  actions: {}
};

const QueryContext = createContext(
  initialQueryContextValue
);

export class Query extends Component {
  static Consumer = QueryContext.Consumer;
  static defaultProps = {
    fetch,
    disableInitialFetch: false,
    stateReducer: (update, state, props) => update,
    deserialize: async res => res.json()
  };

  state = initialState;

  setReducedState = update => {
    const { stateReducer } = this.props;
    this.setState(state =>
      stateReducer(update, state, this.props)
    );
  };

  request = async optionsPart => {
    const {
      fetch,
      url: propUrl,
      options,
      deserialize
    } = this.props;

    this.setReducedState({ loading: true });

    // use the url from the request argument or fallback to the url from props
    let url = (optionsPart && optionsPart.url) || propUrl;
    let fetchOptions = options;
    if (optionsPart) {
      // strip the url key from the fetch options if it is provided
      const { url, ...restOptions } = optionsPart;
      fetchOptions = { ...options, ...restOptions };
    }

    try {
      const res = await fetch(url, fetchOptions);

      const data = await deserialize(res);
      this.setReducedState({
        data,
        loading: false,
        error: null
      });
    } catch (error) {
      this.setReducedState({
        loading: false,
        error
      });
    }
  };

  actions = {
    fetch: this.request
  };

  componentDidMount() {
    if (!this.props.disableInitialFetch) {
      this.request();
    }
  }

  render() {
    const { children } = this.props;

    const value = {
      state: this.state,
      actions: this.actions
    };

    return (
      <QueryContext.Provider value={value}>
        {typeof children === "function"
          ? children(value)
          : children}
      </QueryContext.Provider>
    );
  }
}
