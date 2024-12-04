"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { SiBmw } from "react-icons/si";
import classnames from 'classnames'
import {useSession} from 'next-auth/react'
import { Avatar, Box, DropdownMenu, Flex, Skeleton, Text } from '@radix-ui/themes';
import { RiLoginCircleFill } from "react-icons/ri";



const NavBar = () => {


    const links=[
        {label:"Dashboard",href:"/"},
        {label:"Issues",href:"/issues"}
        
    ]

    const currenpath = usePathname() //hook to get the current path

    const {status , data:session} = useSession()
    
    
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Flex align='center' justify="between">
        <Flex align='center' gap='5'>
          <Link href="/"><SiBmw size={60} /></Link>
          <ul className='flex space-x-6'>
              {links.map(link => <li key={link.href}><Link  
                                  className={classnames({
                                      "text-zinc-900":link.href===currenpath,
                                      "text-zinc-500":link.href!==currenpath,
                                      "hover:text-sky-500":true
                                  })}
                                  href={link.href}>{link.label}
                                  </Link></li>)}
          </ul> 
        </Flex>
        <Box>
          {status === "unauthenticated" && (<Link href="/api/auth/signin"><RiLoginCircleFill  size='30'/>Log In</Link>)} 
          {status==="loading" && <Skeleton />}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger >
              <Avatar src={session?.user!.image!} fallback="?" className='cursor-pointer' referrerPolicy='no-referrer'/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label >
                <Text>
                  {session?.user!.name!}
                </Text>
              </DropdownMenu.Label >
              <DropdownMenu.Item>{status === "authenticated" && (<Link href="/api/auth/signout">Log Out</Link>)}</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          
        </Box>
      </Flex>
    </nav>
  )
}

export default NavBar