import { createDBClient } from "./createClient"


export async function getInvites(req: Bun.BunRequest){
    const {invite} = req.params
    const turso = createDBClient()

    try {
        if(!invite) throw new Error("invite id not present")
        const response = await turso.execute({
            sql: 'SELECT * FROM invites WHERE uuid = ?',
            args: [invite]
        })

        
        return new Response(JSON.stringify({data:  response.rows[0], status: 203}), { headers: {"Access-Control-Allow-Origin": "*"}})
    } catch (error) {
        console.log('error caught in get invites', error)
        return new Response(JSON.stringify({error: "error caught getting invites", status: 500}),{ headers: {"Access-Control-Allow-Origin": "*"}})
    } 
}
