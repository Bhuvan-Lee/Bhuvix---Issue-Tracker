import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'




interface Props{
    open:number,
    closed:number,
    in_progress:number

}

const IssueSummary = ({open,closed,in_progress}:Props) => {

    const statuses:{label:string,value:number,status:Status}[]=[

        {label:"Open Issues",value:open,status:'OPEN'},
        {label:"Closed Issues",value:closed, status:'CLOSED'},
        {label:"In_Progress Issues",value:in_progress,status:'IN_PROGRESS'}
    ]
  return (
    <Flex gap="4">
        {statuses.map(status=>
        <Card key={status.label} className="bg-white border border-cyan-500 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
            <Flex direction="column" gap="2">
                <Link href={`/issues/?status=${status.status}`}>{status.label}</Link>
                <Text className='font-bold'>{status.value}</Text>
            </Flex>
        </Card>
    )}
    </Flex>
  )
}

export default IssueSummary