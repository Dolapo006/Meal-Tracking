import { useState } from "react"
import { useMealsContext } from "../hooks/useMealsContext"
import { useAuthContext } from '../hooks/useAuthContext'



const MealForm = () => {
    const { dispatch } = useMealsContext()
    const { user } = useAuthContext()



    const [title, setTitle] = useState('')
    const [calories, setCalories] = useState('')
    const [serving, setServing] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must login first')
            return
        }

        const meal = {title, calories, serving}

        const response = await fetch('/api/meals', {
            method: 'POST',
            body: JSON.stringify(meal),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)//setting this to the useState
        }
        if(response.ok) {
            setTitle('')
            setCalories('')
            setServing('')
            setError(null)
            console.log('New meal added', json)
            dispatch({type: 'CREATE_MEAL',payload: json})



        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Log a New Meal</h3>

            <label>Meal Title:</label>
            <input
                drink="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                />

            <label>Calories</label>
            <input
                drink="number"
                onChange={(e) => setCalories(e.target.value)}
                value={calories}
                className={emptyFields.includes('calories') ? 'error' : ''}
                />

            <label>Serving</label>
            <input
                drink="number"
                onChange={(e) => setServing(e.target.value)}
                value={serving}
                className={emptyFields.includes('serving') ? 'error' : ''}
                />
        
                
                <button>Add New Meal</button>
                {error && <div className="error">{error}</div>}
        </form>
    )
}

export default MealForm