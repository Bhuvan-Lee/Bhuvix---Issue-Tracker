"use client"
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { pages } from 'next/dist/build/templates/app-page';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'



interface Props{
    ItemCount:number;
    Pagesize:number;
    Currentpage:number

}

const Pagination = ({ItemCount,Currentpage,Pagesize}:Props) => {
    const router = useRouter();
    const searchParams= useSearchParams();



    const ChangePage=(page:number)=>{
        const params= new URLSearchParams(searchParams);
        params.set("page",page.toString())
        router.push("?"+params.toString())
    }




    const Pagecount= Math.ceil(ItemCount/Pagesize)
    if (Pagecount<=1) return null;
  return (
    <Flex align="center" gap="2" >
        <Text>Page {Currentpage} of {Pagecount} </Text>
        <Button disabled={Currentpage===1} onClick={()=>ChangePage(1)}><DoubleArrowLeftIcon  /></Button>
        <Button disabled={Currentpage===1} onClick={()=>ChangePage(Currentpage-1)}><ChevronLeftIcon /></Button>
        <Button disabled={Currentpage===Pagecount} onClick={()=>ChangePage(Currentpage+1)}><ChevronRightIcon /></Button>
        <Button disabled={Currentpage===Pagecount} onClick={()=>ChangePage(Pagecount)}><DoubleArrowRightIcon /></Button>
        
    </Flex>
    
  )
}

export default Pagination