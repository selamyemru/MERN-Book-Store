import express from 'express'
import connection from './db.js'
import router from './route/book.js';
import { routers } from './route/user.js';
import cors from 'cors'
connection();
const app = express()
//custom origin resource sharing
app.use(cors(
  {
    origin:'http://localhost:5173',
    method:['GET','POST','PUT','DELETE'],
    AllowedHeaders:['Content-Type']
  }
))
app.use(express.json())
app.use('/', router)
app.use('/',routers)
const port = 4000
app.get('/', async (req, res) => {
  res.json({ meg: 'hello world!' })
})
app.listen(port, () => console.log(
  `The server runing on ${port}`
)) 
