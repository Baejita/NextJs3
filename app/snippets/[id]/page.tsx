import { db } from '@/app/db/inde'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import * as actions from "../../actions"

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

    const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
  return (<div>
    <div className=' flex m-4 justify-between items-center'>
    <h1 className=' text-xl font-bold'>{snippet.title}</h1>
    <div className='flex gap-6'>
        <Link href={`/snippets/${snippet.id}/edit`} className='p-2 border rounded'>Edit</Link>

        <form action = {deleteSnippetAction}>
        <button className='p-2 border rounded'>Delete</button>
        </form>

    </div>
    </div>
    <pre className='p-3 rounded bg-gray-200 border-gray-200'>
        <code>{snippet.code}</code>
    </pre>
    </div>
  )
}

export default showSnippetId