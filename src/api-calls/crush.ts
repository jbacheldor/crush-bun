import { createDBClient } from "../createClient"

export async function getCrushes(req: Bun.BunRequest) {
    try {

        return new Response(JSON.stringify({data: [], status: 200}),  { headers: {"Access-Control-Allow-Origin": "*"}})
    }catch(error){
        console.error('caught an error while trying to pull crushes', error)
        return new Response(JSON.stringify({error: 'error returning list of crushes', status: 400}),  { headers: {"Access-Control-Allow-Origin": "*"}})
    }
}

export async function getCrushesInfo(req: Bun.BunRequest) {
    try {

        return new Response(JSON.stringify({data: [], status: 200}),  { headers: {"Access-Control-Allow-Origin": "*"}})
    }catch(error){
        console.error('caught an error while trying to get crush info', error)
        return new Response(JSON.stringify({error: 'error returning crush info', status: 400}),  { headers: {"Access-Control-Allow-Origin": "*"}})
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