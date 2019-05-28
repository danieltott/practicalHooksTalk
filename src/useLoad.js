import { useReducer, useEffect, useCallback } from 'react';

const initialState = {
  data: null,
  isLoading: false,
  updatedAt: null,
  error: null,
};

const reducer = (state, action) => {
  console.log({ state, action });
  switch (action.type) {
    case 'LOADING_STARTED':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOADING_SUCCEEDED':
      return {
        ...state,
        isLoading: false,
        data: action.data,
        updatedAt: new Date(),
      };

    case 'LOADING_FAILED':
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.error,
      };

    default:
      throw new Error(
        `Unrecognized action type in useLoad reducer: ${action.type}`
      );
  }
};

export default function useLoad(apiFn, { loadImmediately = true } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const load = useCallback(async () => {
    // we are loading
    dispatch({
      type: 'LOADING_STARTED',
    });

    try {
      // do the actual api call
      const data = await apiFn();

      // we are successful
      dispatch({
        type: 'LOADING_SUCCEEDED',
        data,
      });
    } catch (error) {
      // we have errored
      dispatch({
        type: 'LOADING_FAILED',
        error,
      });
    }
  }, [apiFn]);

  useEffect(() => {
    console.log('use effect');
    if (loadImmediately) {
      console.log('loadImmediately');
      load();
    }
  }, [loadImmediately, load]);

  return [state, load];
}

// const [state, load] = useLoad(apiFn)
