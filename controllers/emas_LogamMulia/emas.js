const puppeteer = require('puppeteer');

module.exports = class Controller {
  static async emas(req, res, next) {
    try {
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
      await browser.close();
      res.status(200).json({
        status: true,
        data
      })
    } catch (error) {
      next(error)
    }
  }
}