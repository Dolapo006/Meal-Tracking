import { useMealsContext } from '../hooks/useMealsContext'
import { useAuthContext } from '../hooks/useAuthContext'



//Date Format
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const MealDetails = ({ meal }) => {
    const { dispatch } = useMealsContext()
    const { user } = useAuthContext()


    const handleClick = async () => {
        if(!user) {
            return
        }

        const response = await fetch('/api/meals/' + meal._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_MEAL', payload: json})
        }
    }
    return (
        <div className="meal-details">
            <h4>{meal.title}</h4>
            <p><strong>Calories:</strong>{meal.calories}</p>
            <p><strong>Serving:</strong>{meal.serving}</p>
            <p>{formatDistanceToNow(new Date(meal.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span> 
        </div>
    )
}

export default MealDetails;