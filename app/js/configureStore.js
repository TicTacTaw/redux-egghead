import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {

  const addLoggingToDispatch = (store) => {
      const rawDispatch = store.dispatch;

      if(!console.group) {
        return rawDispatch;
      }

      return (action) => {
        console.group(action.type);
        console.log('%c Previous state:', 'color: gray', store.getState());
        console.log('%c Action: ', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c Next state: ', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
      };
  };

  const persistedState = loadState();
  const store = createStore(todoApp, persistedState);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    });
  }, 1000));

  return store;
};

export default configureStore;
