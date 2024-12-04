"use client"
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { Label } from '@radix-ui/themes/dist/esm/components/context-menu.js';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { string } from 'zod';

const IssueStatusFilter = () => {

    const statuses:{label:string, value?:Status}[] =[
        {label: "All"},
        {label:"Open", value:"OPEN"},
        {label:"Closed",value:"CLOSED"},
        {label:"In_Progress" , value:"IN_PROGRESS"}
    ]

    const router= useRouter()
    const searchParams=useSearchParams()


  return (
   <Select.Root defaultValue={searchParams.get("status") || "All"}
    onValueChange={(status)=>{
    const params= new URLSearchParams()
    if (status && status !== "All") params.append("status",status)
    if (searchParams.get("orderBy"))  params.append("orderBy",searchParams.get("orderBy")!) 

    console.log(`newurlsearchparams=${params}`)

    const query= params.toString() ? `?${params.toString()}` : "";
    router.push("/issues"+query)
    console.log(query)
    
   }}>
    <Select.Trigger placeholder='Filter......'/>
        <Select.Content  >
            {statuses.map(status=> <Select.Item key={status.label} value={status.value || "All"}>{status.label}</Select.Item>)}
        </Select.Content>

   </Select.Root>
    
  )
}

export default IssueStatusFilter