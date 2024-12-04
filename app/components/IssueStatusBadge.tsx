import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'




interface Props{
    status:Status
}
const IssueStatusBadge = ({status}:Props) => {

    if(status==="OPEN")
        return <Badge color='red'>OPEN</Badge>
    if(status=== "IN_PROGRESS")
        return <Badge color='violet'>IN_PROGRESS</Badge>
    if(status==="CLOSED")
        return <Badge color='green'>CLOSED</Badge>
  return (
    <div>IssueStatusBadge</div>
  )
}

export default IssueStatusBadge