import { v4 } from "uuid"
import { createDBClient } from "../createClient"

type submitBugInput = {
    severity: string,
    type: string,
    details: string,
    id: string
}

export async function submitBugReport(req: Bun.BunRequest){
    try {    
        const body = await req.json() as submitBugInput
        const id = v4()

        const turso = createDBClient()
        await turso.execute({
            sql: 'INSERT INTO bugs (id, severity, type, details, submitted_by) VALUES (?, ?, ?, ?, ?)',
            args: [id, body.severity, body.type, body.details, body.id]
        })
        
        return new Response(JSON.stringify({ message: 'successfully recorded a bug!', status: 200}), { headers: {"Access-Control-Allow-Origin": "*"}})

    }catch(error){
        console.error('error in submitting form!', error)
        return new Response(JSON.stringify({error: 'error in submitting form', status: 400}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }


}