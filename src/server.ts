import dotenv from 'dotenv'
import express from 'express'
import type { Request, Response } from 'express'
import { createClient } from 'redis'

dotenv.config()

const app = express()

if (!process.env.REDIS_URL) {
  throw new Error('Missing REDIS_URL environment variable!')
}

const user: { name: string; age: number } = {
  name: 'AKM Zakaria',
  age: '20',
}

const redis = createClient({
  url: process.env.REDIS_URL,
})

const connectRedis = async () => {
  await redis.connect()
  console.log('redis connected')
}

connectRedis()

// app.post('/redis', async (req: Request, res: Response) => {
//   // ------------- STRING -------------

//   //   await redis.set('name', 'akm zakaria', {
//   //     EX: 30,
//   //   })

//   // --------------- HASH (OBJECT) -------------

//   //   await redis.hSet('user-1', {
//   //     name: 'abdullah',
//   //     age: 20,
//   //     email: 'abdullah@gmail.com',
//   //   })

//   // ----------------- GET --------------------

//   //   const user_1 = await redis.hGetAll('user-1')
//   //   console.log(user_1)

//   //   ----------------- LIST -------------------

//   //   await redis.lPush('todo', 'assignment')
//   //   await redis.rPush('todo', 'docker')

//   //   await redis.lPush('todo', 'exam')
//   //   await redis.lPush('todo', 'CT')

//   //   const todo = await redis.lRange('todo', 0, 3)
//   //   console.log(todo)

//   // ---------------- SET (Unique Value) -----------------

//   //   await redis.sAdd('skills', ['node.js', 'tsc', 'autocad', 'autocad'])

//   const skills = await redis.sMembers('skills')
//   console.log(skills)

//   res.send('Job Submitted!')
// })

app.get('/', async (req: Request, res: Response) => {
  console.log('server is running!')
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
