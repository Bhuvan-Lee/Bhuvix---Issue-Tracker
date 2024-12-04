import spinner from "@/app/components/spinner"
import { Spinner } from "@radix-ui/themes"


const loading = () => {
  return (
    <div>{<Spinner />}</div>
  )
}

export default loading