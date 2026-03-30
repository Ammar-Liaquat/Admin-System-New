const attempts = {};

const Limiter = (req, res, next) => {
  const ip = req.ip;
  const email = req.body.email;
  const key = ip + "_" + email;
  const currentTime = Date.now();
  const windowTime = 10 * 1000;
  const maxAttempt = 3;
  if (!attempts[key]) {
    attempts[key] = [];
  }
  attempts[key] = attempts[key].filter((time) => {
    return currentTime - time < windowTime;
  });
  attempts[key].push(currentTime);
  if (attempts[key].length > maxAttempt) {
    return res.status(429).json({
      code: 429,
      message: "Too Many Requests Try Again After 1 Minute",
    });
  }

  next();
};
module.exports = Limiter;
