import { v4 } from "uuid"
import { createDBClient } from "../createClient"

type commentInput = {
    post_id: string,
    text: string,
    user_id: string
}

export async function submitComment(req: Bun.BunRequest) {
    try {
        const body = await req.json() as commentInput

        const id = v4()

        const today = new Date(Date.now())
        const likes = 0

        const turso = createDBClient()

        await turso.execute({
            sql: 'INSERT INTO Comments (comment_id, post_id, text, time, user_id, likes) VALUES (?, ?, ?, ?, ?, ?)',
            args: [id, body.post_id, body.text, today, body.user_id, likes]
        })

        return new Response(JSON.stringify({message: '', status: 200}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }catch(error){
        console.error('caught error trying to submit comment', error)
        return new Response(JSON.stringify({error: 'caught error while submitting comment', status: 400}),{ headers: {"Access-Control-Allow-Origin": "*"}})
    }
}

type getCommentsInput = {
    post_id: string,
}

export async function getComments(req: Bun.BunRequest){
    try {

        const {post_id} = req.params as getCommentsInput

        const turso = createDBClient()
        const res = await turso.execute({
            sql: 'SELECT * FROM Comments WHERE post_id = ?',
            args: [post_id]
        })

        return new Response(JSON.stringify({data: res.rows, status: 200}), { headers: {"Access-Control-Allow-Origin": "*"}})

    }catch(error){
        console.error('caught error while fetching comments', error)
        return new Response(JSON.stringify({error: 'mwelp we have had an error getting comments for this here post', status: 400}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }
}

type editComments = {
    comment_id: string,
    text: string
}

export async function editComment(req: Bun.BunRequest) {
    try {

        const {text, comment_id} = await req.json() as editComments

        if(!text || !comment_id) throw new Error('insufficient input')

        const turso = createDBClient()
        await turso.execute({
            sql: 'UPDATE Comments SET text = ? WHERE comment_id = ?',
            args: [text, comment_id]
        })

        return new Response(JSON.stringify({message: 'updated successfully!' , status: 200}),  { headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*", "Accept-Patch": "*/*"}})

    }catch(error){
        console.error('error editting comment. try again later', error)
        return new Response(JSON.stringify({error: 'error editting comment. try again later', status: 400}),  { headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*", "Accept-Patch": "*/*"}})
    }
}

export async function deleteComment(req: Bun.BunRequest) {

    try {

        const {comment_id} = req.params

        if(!comment_id) throw new Error('no comment id!')
        // const turso = createDBClient()
        // await turso.execute({
        //     sql: 'DELETE FROM Comments WHERE comment_id = ?',
        //     args: [comment_id]
        // })

        return new Response(JSON.stringify({message: 'successfully deleted comment' ,status: 200}),  { headers: {"Access-Control-Allow-Origin": "*"}})

    }catch(error){
        console.error('error editting comment. try again later', error)
        return new Response(JSON.stringify({error: 'error editting comment. try again later', status: 400}),  { headers: {"Access-Control-Allow-Origin": "*"}})
    }
}