import redis from "../../config/redis.js";

const ApiRateLimit = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const limit = 5;

  await redis.incr(ip);
  await redis.expire(ip, 5);
  const value = await redis.get(ip);

  if (+value >= limit) {
    return res.status(429).json({
      message: "Has realizado muchas solicitudes, intenta por favor más tarde",
    });
  }

  next();
};

export default ApiRateLimit;
