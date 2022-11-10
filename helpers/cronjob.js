const cron = require('node-cron');
const Redis = require("ioredis");
const redis = new Redis({
  port: 10687, 
  host: `${process.env.HOST_REDIS}`,
  username: "default", 
  password: `${process.env.PASSWORD_REDIS}`,
  db: 0,
});

const task = cron.schedule('30 8 * * *', async () =>  {
  await redis.del("emas")
})

module.exports = task