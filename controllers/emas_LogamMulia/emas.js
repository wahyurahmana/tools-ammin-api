const puppeteer = require('puppeteer');
const Redis = require("ioredis");
const redis = new Redis({
  port: 10687, 
  host: "redis-10687.c292.ap-southeast-1-1.ec2.cloud.redislabs.com",
  username: "default", 
  password: `${process.env.PASSWORD_REDIS}`,
  db: 0,
});

module.exports = class Controller {
  static async emas(req, res, next) {
    try {
      const checkRedisEmas = await redis.get("emas")
      if(checkRedisEmas){
        res.status(200).json({
          status: true,
          message : 'Harga NPWP (+Pajak 0.45%) Dan Harga Non NPWP (+Pajak 0.90%)',
          data : JSON.parse(checkRedisEmas)
        })
        console.log("using a redis emas")
      }else{
        const browser = await puppeteer.launch({
          headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://logammulia.com/id/harga-emas-hari-ini');
        await page.waitForSelector("body > section.section-padding.n-no-padding-top > div > div:nth-child(3) > table:nth-child(3)")
        const listPrice = await page.$eval('body > section.section-padding.n-no-padding-top > div > div:nth-child(3) > table:nth-child(3)', el => el.textContent);
        const temp = listPrice.split("\n")
        const data = []
        for (let i = 12; i < 80; i++) {
          data.push({
            berat: temp[i],
            hargaDasar: temp[i + 1],
            hargaNPWP: temp[i + 2],
            hargaNonNPWP: temp[i + 3]
          })
          i += 5
        }
        await redis.set("emas", JSON.stringify(data))
        res.status(200).json({
          status: true,
          message : 'Harga NPWP (+Pajak 0.45%) Dan Harga Non NPWP (+Pajak 0.90%)',
          data
        })
        await browser.close();
        console.log("not using redis emas");
      }
    } catch (error) {
      next(error)
    }
  }
}