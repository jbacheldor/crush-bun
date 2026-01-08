import { createDBClient } from "../createClient"

type accountInput = {
    form: {
        name: string,
        email: string,
        password: string,
        number: string,
        author: number
    },
    id: string
}

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

export async function createAccount(req: Bun.BunRequest){
    
    try {
        const {form, id} = await req.json() as accountInput
        if(!form || !id) throw new Error('insufficient input')

        const turso = createDBClient()
        await turso.execute({
            sql: 'INSERT INTO User (user_id, name, email, author, number) Values (?, ?, ?, ?, ?)',
            args: [id, form.name, form.email, form.author, form.number]
        })

        return new Response(JSON.stringify({ message: 'user successfully created', status: 200}), { headers: {"Access-Control-Allow-Origin": "*"}})

    }catch(error){
        console.error('error creating new user', error)
        return new Response(JSON.stringify({error: "error caught creating new user", status: 500}),{ headers: {"Access-Control-Allow-Origin": "*"}})
    }

}
