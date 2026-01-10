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