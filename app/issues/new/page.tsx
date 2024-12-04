"use client"; 

import dynamic from "next/dynamic";
import Skeleton from "@/app/components/Skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), //Lazy Loading (Loading SimpleMDE only when needed to avoid ssr conflict)
    {ssr: false,
    loading : ()=><Skeleton />
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;



