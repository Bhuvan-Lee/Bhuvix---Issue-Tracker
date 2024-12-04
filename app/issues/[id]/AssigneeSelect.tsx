"use client"
import { Issue, User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const AssigneeSelect = ({issue}:{issue:Issue}) => {

  const {data:users,error,isLoading}= useUsers()
      if (error) return null;

      if(isLoading) return <Skeleton />
  



    // const [users,setUsers]=useState<User[]>([]);

    // useEffect(()=>{
    //     const fetchUsers = async()=>{
    //         const data = await axios.get<User[]>("/api/users")
    //         setUsers(data.data)
    //     }
    //     fetchUsers();        
    // }     
    // ,[])

  return (
    <Select.Root defaultValue={issue.assignedToUserId || "unassigned"} onValueChange={async (userId)=>{
      try {
         const assignedToUserId = userId === "unassigned" ? null : userId;
        await axios.patch("/api/issues/"+ issue.id,{assignedToUserId});
      } catch (error) {
        toast.error("Changes could not be saved")
         
      }
    }}>
	<Select.Trigger placeholder='Assign.......' />
	<Select.Content>
		<Select.Group>
			<Select.Label>Suggestions</Select.Label>
        <Select.Item value="unassigned">Unassigned</Select.Item>
        
            {users?.map((user)=> <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
		</Select.Group>
		<Select.Separator />
	</Select.Content>
</Select.Root>

  )
}

export default AssigneeSelect



const useUsers=()=>
  useQuery<User[]>({
    queryKey:['users'],
    queryFn:async()=>{
      const response = await axios.get('/api/users')
      return response.data
    },
    staleTime:60 *3,
    retry:3

  })
