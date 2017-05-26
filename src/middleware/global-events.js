export default (store) => {
  return (next) => (action) => next(action);
}
