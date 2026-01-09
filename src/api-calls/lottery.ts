import { v4 } from "uuid"
import { createDBClient } from "../createClient"

type lotteryInput = {
    id: string,
    name: string,
    email: string,
    number: string,
    date: string
}

export async function submitLottery(req: Bun.BunRequest){

    try {
        const form = await req.json() as lotteryInput

        const uuid = v4()

        const today = new Date(Date.now()).toString()

        const turso = createDBClient()
        await turso.execute({
            sql: 'INSERT INTO lottery (id, name, email, number, date) VALUES (?, ?, ?, ?, ?)',
            args: [uuid, form.name, form.email, form.number, today]
        })

        return new Response(JSON.stringify({message: 'submitted lottery listing !!!', status: 200}), { headers: {"Access-Control-Allow-Origin": "*"}})

    }catch(error){
        console.error('wwahooooo, error in submit lottery', error)
        return new Response(JSON.stringify({error: 'could not accept lottery request sorry girly pop', status: 400}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }

}