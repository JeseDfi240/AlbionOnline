const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { startGoldFetcher } = require('./jobs/goldFetcher.js')

const app = express()
const prisma = new PrismaClient()

app.use(express.static('public'))

startGoldFetcher()

app.get('/gold', async (req, res) => {
  try {
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000)

    const data = await prisma.gold_Price.findMany({
      where: {
        timestamp: {
          gte: twelveHoursAgo
        }
      },
      orderBy: { timestamp: 'desc' }
    })

    // Convertir BigInt a string para poder enviarlo en JSON
    const serializedData = data.map(d => ({
      ...d,
      id: d.id.toString()
    }))

    res.json(serializedData)
  } catch (error) {
    console.error("EXACT ERROR:", error)
    res.status(500).json({ error: 'Error obteniendo datos', details: error.message, stack: error.stack })
  }
})

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000')
})