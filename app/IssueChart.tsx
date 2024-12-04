"use client"
import { Card } from '@radix-ui/themes'
import React from 'react'
import {ResponsiveContainer,BarChart, Bar, XAxis, YAxis,} from 'recharts'




interface Props{
    open:number,
    closed:number,
    in_progress:number

}

const IssueChart = ({open,closed,in_progress}:Props) => {


    const data=[
        {label:"Open Issues",value:open,},
        {label:"Closed Issues",value:closed},
        {label:"In_Progress Issues",value:in_progress}
    ]



  return (
    <Card className="bg-white border border-cyan-500 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
        <ResponsiveContainer width="100%" height={450}>
            <BarChart data={data}>
                <XAxis dataKey="label" />
                <YAxis />
                <Bar dataKey="value" barSize={60} fill='red' />
            </BarChart>
        </ResponsiveContainer>

    </Card>
  )
}

export default IssueChart