"use client"
import React from 'react'
import ProviderSearchApp from '@/components/features/providerSearch/ProviderSearchApp'
import ReduxProviderWrapper from '@/app/providers/ProviderWrapper'

export default function Page (){
  return (
<ReduxProviderWrapper>

  
       <ProviderSearchApp/>
  
 
</ReduxProviderWrapper>
 
  )
}
