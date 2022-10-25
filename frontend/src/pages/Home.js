import { useEffect } from "react"
import { useMealsContext } from "../hooks/useMealsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//components

import MealDetails from '../components/MealDetails'
import MealForm from '../components/MealForm'


const Home = () => {
   const {meals, dispatch} = useMealsContext()
    const { user } = useAuthContext()


    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('/api/meals', {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            })
            const json = await response.json()

            if(response.ok) {
              dispatch({type: 'SET_MEALS', payload: json})
            }
        }

        if(user) {
        fetchMeals()
        }

    }, [dispatch, user])
    return (
      <div className="home">
       <div className="meals">
        {meals && meals.map((meal) => (
           <MealDetails key={meal._id} meal={meal} />
        ))}
       </div>
       <MealForm />
      </div>
    )
  }
  
  export default Home