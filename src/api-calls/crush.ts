import { v4 } from "uuid"
import { createDBClient } from "../createClient"

export async function getCrushes(req: Bun.BunRequest) {
    try {
        const {instance_id} = req.params 

        if(!instance_id) throw new Error('insufficient parameters')

        const turso = createDBClient()

        const res = await turso.execute({
            sql: 'SELECT * from Crush WHERE instance_id = ?',
            args: [instance_id]
        })

        // maybe circle back on calculating crush info

        return new Response(JSON.stringify({data: res.rows, status: 200}),  { headers: {"Access-Control-Allow-Origin": "*"}})
    }catch(error){
        console.error('caught an error while trying to pull crushes', error)
        return new Response(JSON.stringify({error: 'error returning list of crushes', status: 400}),  { headers: {"Access-Control-Allow-Origin": "*"}})
    }
}


export async function getCrushesUpdates(req: Bun.BunRequest) {

    try {
        const {id, instance_id} = req.params

        if(!id || !instance_id) throw new Error('incorrect params')
        
        const turso = createDBClient()
        const response = await turso.execute({
            sql: 'SELECT (post_id, text, post_date) FROM Post WHERE id=? and instance_id=?',
            args: [id, instance_id]
        })


        return new Response(JSON.stringify({data: response.rows, status: 200}),  { headers: {"Access-Control-Allow-Origin": "*"}})
    }catch(error){
        console.error('caught an error wheeeooo', error)
        return new Response(JSON.stringify({error: 'whoosps caught an error trying to get updates', status: 400}),  { headers: {"Access-Control-Allow-Origin": "*"}})
    }
}

type crushInput = {
    name: string,
    description: string,
    status: string,
    pros: string,
    cons: string,
    instance_id: string
}

export async function submitCrush(req: Bun.BunRequest) {
    try {
        const body = await req.json() as crushInput

        const id = v4()

        const turso = createDBClient()

        await turso.execute({
            sql: 'INSERT INTO Crush (crush_id, name, status, instance_id, description, pros, cons) VALUES (?, ?, ?, ?, ?, ?, ?)',
            args: [id, body.name, body.status, body.instance_id, body.description, body.pros, body.cons]
        })

        return new Response(JSON.stringify({message: 'crush submitted successfullllly', status: 200}), { headers: {"Access-Control-Allow-Origin": "*"}})

    }catch(error){
        console.error('error in submitting new crush yikesss', error)
        return new Response(JSON.stringify({error: 'error submitting new crush yikes!', status: 400}), { headers: {"Access-Control-Allow-Origin": "*"}})

    }
}