import { createStore } from 'redux';
import todoApp from './reducers';

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

  const store = createStore(todoApp);

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }


  return store;
};

export default configureStore;
