const cron = require('node-cron');
const Redis = require("ioredis");
const redis = new Redis({
  port: 10687, 
  host: "redis-10687.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  username: "default", 
  password: `${process.env.PASSWORD_REDIS}`,
  db: 0,
});

const task = cron.schedule('30 8 * * *', () =>  {
  await redis.del("emas")
  console.log("rediskey emas dihapus")
})

module.exports = task