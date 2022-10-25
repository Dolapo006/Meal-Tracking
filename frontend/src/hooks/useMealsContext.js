import { MealsContext } from "../context/MealsContext";
import { useContext } from "react";

export const useMealsContext = () => {
    const context = useContext(MealsContext)

    if (!context) {
        throw Error('useMealsContext must be used inside of the MealsContextProvider')
    }

    return context 
}