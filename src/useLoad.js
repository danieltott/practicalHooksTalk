import { useReducer, useEffect, useCallback, useRef } from 'react';

const initialState = {
  data: null,
  isLoading: false,
  updatedAt: null,
  error: null,
};

const reducer = (state, action) => {
  console.log({ ...action });
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

    case 'RESET':
      return initialState;

    default:
      throw new Error(
        `Unrecognized action type in useLoad reducer: ${action.type}`
      );
  }
};

export default function useLoad(apiFn, { loadImmediately = true } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const requestedTime = useRef();

  const load = useCallback(async () => {
    requestedTime.current = Date.now();
    const localRequestedTime = requestedTime.current;
    // we are loading
    dispatch({
      type: 'LOADING_STARTED',
    });

    try {
      // do the actual api call
      const data = await apiFn();

      if (localRequestedTime === requestedTime.current) {
        // we are successful
        dispatch({
          type: 'LOADING_SUCCEEDED',
          data,
        });
      }
    } catch (error) {
      // we have errored
      if (localRequestedTime === requestedTime.current) {
        dispatch({
          type: 'LOADING_FAILED',
          error,
        });
      }
    }
  }, [apiFn]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  useEffect(() => {
    if (loadImmediately) {
      load();
    }
  }, [loadImmediately, load]);

  return [state, load, reset];
}

// const [state, load] = useLoad(apiFn)
