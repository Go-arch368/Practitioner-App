"use client"

import {Provider} from 'react-redux'
import {store} from '@/redux/store'
import React from "react"

interface Props{
    children : React.ReactNode
}

export default function ReduxProviderWrapper({children}:Props){
    return <Provider store={store}>{children}</Provider>
        
    
}