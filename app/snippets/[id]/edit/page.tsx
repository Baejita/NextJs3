import SnippetEditForm from '@/app/components/snippet-edit-form'
import { db } from '@/app/db/inde'
import { notFound } from 'next/navigation'
import React from 'react'

interface SnippetEditPage{
    params: {
        id: string
    }
}

async function SnippetEditPage(props: SnippetEditPage) {
    const id = parseInt(props.params.id)
    const snippet = await db.snippet.findFirst({
        where: {id}
    })

    if(!snippet) return notFound()



  return (<>
    <SnippetEditForm snippet={snippet} />
    </>
  )
}

export default SnippetEditPage