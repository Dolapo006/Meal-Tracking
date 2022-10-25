import { useAuthContext } from './useAuthContext'
import { useMealsContext } from './useMealsContext'


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: mealsDispatch} = useMealsContext()


  const logout = () => {
    //Removes the user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    mealsDispatch({type: 'SET_MEALS', payload: null})//prevents the flashing of others meal logs.
  }

  return { logout }
}