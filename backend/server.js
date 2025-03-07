import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import fileupload from './routes/fileupload.js'
import cors from 'cors'
import Product from './models/productModel.js'
import multer from 'multer'
dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', fileupload)
app.use(cors())
// ✅ OR Allow only a specific origin (Replace with your frontend URL)
app.use(
  cors({
    origin: "*", // Change to your frontend domain in production
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Needed if using cookies/sessions
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all domains
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Handle preflight requests
  }
  next();
});
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.get('/productcollection',(req,res)=>{
  Product.find()
  .then((result)=>{
    res.json(result)
  })
  .catch((err)=> console(err))
})


const storage=multer.diskStorage({
  destination: (req, image, cb)=>{
    console.log(image)
      cb(null, './public')
},
filename:(req,image,cb)=>{
   cb(null, image.fieldname + "_" + Date.now() + path.extname(image.originalname))
}
})
const upload=multer({
storage:storage
})

app.post('/uploadimage',(req,res)=>{
 res.send(req.body)

})
   
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
