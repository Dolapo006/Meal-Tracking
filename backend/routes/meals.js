const express = require('express')
const {
  getMeals, 
  getMeal, 
  createMeal, 
  deleteMeal, 
  updateMeal
} = require('../controllers/mealController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


//Require Auth
router.use(requireAuth)//this is will authenticate the user before running the other routes so each user has their own information only.

// GET all meals
router.get('/', getMeals)

// GET a single meal
router.get('/:id', getMeal)

// POST a new meal
router.post('/', createMeal)

// DELETE a meal
router.delete('/:id', deleteMeal)

// UPDATE a meal
router.patch('/:id', updateMeal)

module.exports = router