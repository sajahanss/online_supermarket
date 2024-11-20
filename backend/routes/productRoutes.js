import express from 'express'
const app = express();
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

app.use(express.json())
app.use(express.json({limit: '150mb'}));
app.use(express.urlencoded({limit: '150mb'}));

router.route('/' || '/api/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews' || '/api/:id/reviews').post(protect, createProductReview)
router.get('/top' || '/api/top', getTopProducts)
router
  .route('/:id' || '/api/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router

