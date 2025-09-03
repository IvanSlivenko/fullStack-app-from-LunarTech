import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  //   redis: Redis.fromEnv(),
  redis: redis,
  //   limiter: Ratelimit.slidingWindow(10, "10 s"),
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
