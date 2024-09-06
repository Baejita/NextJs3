'use client'

import { Editor } from "@monaco-editor/react"
import type { Snippet } from "@prisma/client"
import { useState } from "react"
import { editSnippet } from "../actions"

interface SnippetEditFormProps {
    snippet : Snippet
}

function SnippetEditForm({snippet} : SnippetEditFormProps) {
  const [code , setCode] = useState(snippet.code)
  const handleEditorChange = (value: string ="") => {
    setCode(value)
    editSnippet()
    
  }

  return (
    <div>
      <Editor 
      height='40vh'
      theme="vs-dark"
      language="javascript"
      defaultValue={snippet.code}
      options={{minimap : {enabled: false}}}
      onChange={handleEditorChange}
      />
    </div>
  )
}

export default SnippetEditForm