const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function fetchGoldPrice() {
  try {
    const response = await fetch(
      'https://west.albion-online-data.com/api/v2/stats/gold.json?count=20'
    )
    const data = await response.json()

    for (let i = data.length - 1; i >= 0; i--) {
      const { price, timestamp } = data[i]
      const tDate = new Date(timestamp)

      const exists = await prisma.gold_Price.findFirst({
        where: { timestamp: tDate }
      })

      if (!exists) {
        await prisma.gold_Price.create({
          data: {
            price,
            timestamp: tDate,
            source: 'albion_api'
          }
        })
        console.log('✅ Guardado:', price)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

function startGoldFetcher() {
  fetchGoldPrice()
  setInterval(fetchGoldPrice, 60000)
}

module.exports = { startGoldFetcher }