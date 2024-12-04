import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from './components/IssueStatusBadge'




const LatestIssues = async () => {


    const issues = await prisma.issue.findMany({
        orderBy:{createdAt:'desc'},
        take:8,
        include:{
            assignedToUser:true
        }

    })
  return (
    <Card >
    <Heading>Latest Issues</Heading>
    <Table.Root >
        <Table.Body >
            {issues.map(issue =>  
            <Table.Row>
                <Table.Cell key={issue.id}>
                    <Flex justify="between">
                       <Flex direction="column" align="start" >
                            <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                            <IssueStatusBadge status={issue.status}/>
                       </Flex>
                       {issue.assignedToUser && (<Avatar size="2" src={issue.assignedToUser.image!} fallback="?"/>)}
                       
                    </Flex>
                </Table.Cell>
            </Table.Row>)}
        </Table.Body>
    </Table.Root>
    </Card>
  )
}

export default LatestIssues