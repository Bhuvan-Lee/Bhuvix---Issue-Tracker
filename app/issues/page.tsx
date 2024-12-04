
import React from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from '../components/Link'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import { IssueAction } from './new/IssueAction'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '../components/Pagination'
import { Metadata } from 'next'





interface Props{
  searchParams:{status?:Status, orderBy:keyof Issue, page:string}
}

  const coloumns:{label:string,value: keyof Issue ,className:string}[] = [
    {label:"Issue",value:'title',className:'hidden md:table-cell'},
    {label:"Status",value:'status',className:'hidden md:table-cell'},
    {label:"CreatedAt",value:'createdAt',className:'hidden md:table-cell'}
  ]


const IssuesPage = async({ searchParams }: Props) => {
  const awaitedsearchparam =   await searchParams
  const statuses = Object.values(Status)
  const checkedstatus = awaitedsearchparam.status && statuses.includes(awaitedsearchparam.status) ? awaitedsearchparam.status : undefined;
  const orderBy = coloumns.map(coloumns=>coloumns.value).includes(awaitedsearchparam.orderBy) ? {[awaitedsearchparam.orderBy]:"asc"} : undefined


  const page=parseInt(awaitedsearchparam.page) || 1;
  const pagesize=10
  
  const issues = await prisma.issue.findMany({
    where:{
      status:checkedstatus
    },
    orderBy,
    skip:(page-1)*pagesize,
    take:pagesize 
  })
  await delay(2000);


  const issuecount= await prisma.issue.count({where:{status:checkedstatus}})



  return (
    <div>
      <IssueAction />
      
      <Table.Root variant='surface'>
        <Table.Header>
            <Table.Row>
              {coloumns.map(coloumn=> <Table.ColumnHeaderCell key={coloumn.label} className={coloumn.className}>
                <NextLink href={{query:{...awaitedsearchparam,orderBy:coloumn.value}}}>{coloumn.label}</NextLink>
                {coloumn.value===awaitedsearchparam.orderBy && <ArrowUpIcon className='inline' />}
                
                </Table.ColumnHeaderCell>)}
             
            </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => 
          <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='blocked md:hidden'>
                    <IssueStatusBadge status={issue.status}/>
                </div>
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table.Root>
      <Pagination Currentpage={page} Pagesize={pagesize} ItemCount={issuecount}/>
    </div>
  )
}

export const dynamic="force-dynamic"




export  const metadata:Metadata={
  title:"Bhuvix || Issues",
  description:"Issues"
}

export default IssuesPage