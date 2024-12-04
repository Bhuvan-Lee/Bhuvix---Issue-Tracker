"use client"
import React, { PropsWithChildren } from 'react'
import {QueryClient,QueryClientProvider as ReactQueryClientProvider} from '@tanstack/react-query'


const client = new QueryClient()

const QueryClientProvider = ({children}:PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={client}>
        {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider