/* eslint no-console: 0*/
export default store => next => action => {
  const returndValue = next(action);
  if (returndValue instanceof Promise) {
    console.info('ASYNC_ACTIONS', store.getState());
  } else 
    console.info(action.type, store.getState());
  return returndValue;
};