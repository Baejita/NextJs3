import { db } from '@/app/db/inde'
import { redirect } from 'next/navigation';
import React from 'react'

function snippetCreatePage() {
    async function createSnippet(formdata:FormData) {
        //จำเป็นเรียกใช้ server actions
        "use server"
        // ตรวจสอบว่า ผู้ใช้ กรอกข้อมูล ถูกต้อง
        const title = formdata.get('title' as string);
        const code = formdata.get('code' as string)
        // สร้างข้อมูลใหม่ในฐานข้อมูล
        const snippet = await db.snippet.create({
            data: {
                title ,
                code
            }
        })

        console.log(snippet);
        
        // นำทางผู้ใช้ไปยังหน้าจอ list
        redirect('/')
        
    }
  return (
    <form action={createSnippet}>
        <h3 className='font-bold m-3'>Crate Snippet</h3>
        <div className=' flex flex-col gap-4'>
            <div className='flex gap-4'>
                <label className="w-12" htmlFor='title'>Title</label>
                <input name='title' className='border rounded p-2 w-full' id='title'/>
            </div>

            <div className='flex gap-4'>
                <label className="w-12" htmlFor='code'>Code</label>
                <textarea name='code' className='border rounded p-2 w-full' id='code'/>
            </div>

            <button type="submit" className=' rounded bg-blue-200 p-2'>Create</button>
        </div>

    </form>
  )
}

export default snippetCreatePage