"use client"
import {useState,createContext,useContext} from "react"

const RadioContext = createContext()

export const RadioProvider = ({children})=>{
   const [selectedOption,handleSelectedOption] = useState("allProvRadio")

   function handleSelectedOption(value){
     setSelectedOption(value)
   }

   return(
      <RadioContext.Provider value={{selectedOption,handleSelectedOption}}>
      {children}
    </RadioContext.Provider>
   )
}


export const useRadio=()=>{
    const context = useContext(RadioContext)
    if(!context){
        throw new Error("useRadio must be used with in a RadioProvider")
    }
    return context
}
