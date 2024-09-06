'use server';

import { redirect } from "next/navigation";
import { db } from "../db/inde";

export async function editSnippet (id:number, code: string) {
    await db.snippet.update({
        where: {id},
        data: {code},
    })
    redirect(`/snippets/${id}`)
}

export async function deleteSnippet (id:number) {
    await db.snippet.delete({
        where: {id}
    })
    redirect('/')
}

export async function createSnippet(formState: { message: string }, formData: FormData) {
    try {
    // Retrieve the title and code from formData
    const title = formData.get('title');
    const code = formData.get('code');

    // Check if title and code exist and are strings
    if (typeof title !== 'string' || typeof code !== 'string') {
        return {
            message: "Invalid data provided"
        };
    }

    // Validate the title length
    if (title.length < 3) {
        return {
            message: "Title must be longer"
        };
    }

    if(typeof code !== 'string' || code.length < 10) {
        return {
            message: 'Code must be longer'
        }
    }

    // Save the new snippet to the database
    
        const snippet = await db.snippet.create({
            data: {
                title,
                code
            }
        });
    }catch (err:unknown) {
        if(err instanceof Error) {
            return {
                message: err.message
            }
        }else{
            return {
                message: 'Somthing went wrong...'
            }
        }

    }

    // Redirect the user to the list page
    redirect('/');
 
}
