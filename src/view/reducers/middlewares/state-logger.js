/* eslint no-console: 0*/
export default store => next => action => {
  const returndValue = next(action);
  console.info(action.type, store.getState());
  return returndValue;
};