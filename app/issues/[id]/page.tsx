import prisma from '@/prisma/client'
import { Grid, Box,Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import delay from 'delay'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import AuthOptions from '@/app/auth/AuthOptions'
import AssigneeSelect from './AssigneeSelect'
import { Toaster } from 'react-hot-toast'


interface Props{
    params:{id:string}
}


const fetchUser = cache((IssueId:number)=>prisma.issue.findUnique({where:{id:IssueId}}))


  const IssueDetailPage = async ({params}:Props) => {
      const session = await getServerSession(AuthOptions)
      console.log("Params received:", params);
      const Resolvedparams=await params

      const issue = await fetchUser(parseInt(Resolvedparams.id))


      if (!issue) return notFound();
      await delay(3000)


    return (
      <>
      <Toaster />
      <Grid columns={{initial:"1" ,sm:"5"}} gap="5"> {/* To adjust size in Mobile and PC */}
        <Box className='md:col-span-4'>
          <IssueDetails issue={issue} />
        </Box>
        {session && <Box>
          <Flex direction='column' gap="5">
            <AssigneeSelect issue={issue}/>
            <EditIssueButton issueId={issue.id}/>
            <DeleteIssueButton issueId={issue.id}/>
          </Flex>
        </Box>}
      </Grid>
      </>
    )
  }

  export default IssueDetailPage



  export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id))

    return {
        title:  `Issue-${issue?.title}`,
        description: 'Details of issue ' + issue?.id,
    };
  }
