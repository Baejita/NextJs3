import { db } from '@/app/db/inde'
import { notFound } from 'next/navigation'
import React from 'react'

interface SnippetShowpageProps {
    params: {
        id: string
    }
}

async function  showSnippetId(props: SnippetShowpageProps) {
    await new Promise((r)=> setTimeout(r, 2000))
    const snippet = await db.snippet.findFirst({
        where : {id : parseInt(props.params.id)}
    })

    if(!snippet) {
        return notFound();
    }
  return (<>
    <div>{snippet.title}</div>
    <p>{snippet.code}</p>
    </>
  )
}

export default showSnippetId