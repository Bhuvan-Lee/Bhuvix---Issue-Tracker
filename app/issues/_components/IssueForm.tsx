"use client"
import dynamic from 'next/dynamic';
import { Button, Callout, TextArea,Text, TextField, Spinner } from '@radix-ui/themes'
import {useForm,Controller} from 'react-hook-form';
import React, { useState } from 'react'

import "easymde/dist/easymde.min.css";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { error } from 'console';
import {zodResolver} from '@hookform/resolvers/zod'
import { IssueSchema } from '@/app/ValidationSchema';
import {z} from 'zod'
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';



type IssueFormData = z.infer<typeof IssueSchema>;


interface Props{
  issue?:Issue           //Optional because only needed on the edit page
}



const IssueForm = ({issue}:Props) => {
  const router=useRouter()
  const {register,control,handleSubmit,formState:{errors}}= useForm<IssueFormData>({resolver:zodResolver(IssueSchema)}); //if used <IssueForm>, only props of Issue Form can be passed to useForm
  const [Error,setError]=useState("");
  const [isSubmitting,setIsSubmitting]=useState(false)
  console.log(register("title"))



  return (
    <div className='max-w-xl'>
      {Error && (<Callout.Root color='red'><Callout.Text>{Error}</Callout.Text></Callout.Root >)}
      <form className='space-y-3' 
            onSubmit={handleSubmit(async (data)=> {
              console.log ("data=",data)
              try {
                setIsSubmitting(true)
                if(issue)
                  await axios.patch("/api/issues/" + issue.id,data)
                else
                  await axios.post("/api/issues",data); 
                router.push("/issues")
                router.refresh()
                
              } catch (error) {
                setIsSubmitting(false)
                setError("An unexpected Error Occured...")
                console.log(Error)
              }
              })}>
          
          <TextField.Root defaultValue ={issue?.title} placeholder='Enter Issue' {...register("title")}/>
          {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
          <Controller 
            defaultValue={issue?.description}
            name="description"
            control={control}
            render={({field})=><SimpleMDE placeholder='Description' {...field} />} // field contains the properties like Onchange,Onblur etc
          />
          {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
          
          <Button disabled={isSubmitting}>
            {issue ? "Update Issue":"Submit New Issue"}{' '}{isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default IssueForm