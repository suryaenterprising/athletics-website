// backend/utils/asyncHandler.js
export default function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Async route error:', err);
        }
        next(err);
      });
  };
}