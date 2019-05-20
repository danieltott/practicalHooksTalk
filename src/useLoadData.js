import { useReducer, useMemo, useCallback, useEffect } from 'react';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
  updatedAt: null
};

function loadDataReducer(state, action) {
  switch (action.type) {
    case 'STARTED':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'SUCCEEDED':
      return {
        ...state,
        isLoading: false,
        data: action.data,
        updatedAt: new Date()
      };

    case 'ERRORRED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        data: null
      };
    case 'RESET':
      return initialState;

    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}

export default function useLoadData(
  apiFn,
  { runImmediately } = { runImmediately: true }
) {
  const [state, dispatch] = useReducer(loadDataReducer, initialState);

  const load = useCallback(async () => {
    dispatch({
      type: 'STARTED'
    });

    try {
      const data = await apiFn();
      dispatch({
        type: 'SUCCEEDED',
        data
      });
    } catch (error) {
      dispatch({
        type: 'ERRORRED',
        error
      });
    }
  }, [apiFn]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  useEffect(() => {
    if (runImmediately) {
      load();
    }
  }, [load, runImmediately]);

  return useMemo(() => [state, load, reset], [load, state, reset]);
}
