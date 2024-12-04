"use client"


import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"




interface Props{
    issueId:number
}



const DeleteIssueButton = ({issueId}:Props) => {
    const router=useRouter()
    const [error,setError]=useState(false)
    const [isDeleting,setIsDeleting]=useState(false)

    const onDelete=async ()=> {
        try {
            setIsDeleting(true)
            await axios.delete("/api/issues/" + issueId);
            router.push("/issues")
            router.refresh()
        } catch (error) {
            setError(true)
            setIsDeleting(false)
        }
        }
  return (
    <>
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red" disabled={isDeleting}>Delete Issue {isDeleting && <Spinner />}</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Issue !</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? This Issue will no longer be accessible and any
                    existing details will be removed.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" >
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={onDelete}>

                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
            <AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title color="red">Error</AlertDialog.Title>
                    <AlertDialog.Description>This cannot be deleted</AlertDialog.Description>
                    <Button color="red" onClick={()=>setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Trigger>
        </AlertDialog.Root>
    </>

    

    
  )
}

export default DeleteIssueButton