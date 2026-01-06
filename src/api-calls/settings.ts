import { createDBClient } from "../createClient"

type FriendType = {
    name: string,
    user_id: string,
}

type removeFriendInput = {
    id: FriendType[],
    instance_id: string
}

type cancelInviteInput = {
    id: string
}

export async function removeFriend(req: Bun.BunRequest){
    let val: string = ''

    try {
        const {id, instance_id} = await req.json() as removeFriendInput
        if(!id || !instance_id) throw new Error('error getting json body')

        id.forEach((obj: FriendType, index: number) => 
        { 
            if(id.length == 1) val = obj.user_id
            else if (index == id.length - 1) val = val + `${obj.user_id}`
            else val = val + `${obj.user_id},  `
        }
        )
        const turso = createDBClient()
        
        turso.execute({
            sql: 'DELETE FROM Membership WHERE (instance_id is ? AND user_id in (?))',
            args: [instance_id, val]
        })

        return new Response(JSON.stringify({message: 'successfully removed friend', status: '200'}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }catch(error){
        console.error('error deleting resource: ', error)
        return new Response(JSON.stringify({message: 'error removing friend', status: 400}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }
}

export async function cancelInvite(req: Bun.BunRequest){

    try {
        const {id} =  await req.json() as cancelInviteInput
        const turso = createDBClient()

        await turso.execute({
            sql: `UPDATE invites SET status = 'cancelled' WHERE uuid = ?`,
            args: [id]
        })

        return new Response(JSON.stringify({message: 'Invite successfully cancelled', status: '200'}), { headers: {"Access-Control-Allow-Origin": "*"}})
            
    }
    catch(error){
        console.error('error: ', error)
        return new Response(JSON.stringify({message: 'error cancelling invite', status: 400}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }
    
}

export async function getSettings(req: Bun.BunRequest) {
    // // get contact info
    try {
        const {id} = req.params 
        const turso =  createDBClient()
         if(!id) throw new Error("id not present")
        // // get membership

        // // this works within sql console query
        const member = await turso.execute({
            sql: "SELECT user_id, name, email FROM User WHERE user_id in (SELECT user_id FROM Membership WHERE instance_id = (SELECT instance_id FROM Instance WHERE owner_id = ?))",
            args: [id]
        })

        const invites = await turso.execute({
            sql: 'SELECT name, email, sent_on, uuid FROM invites WHERE (from_user = ? AND status != "cancelled")',
            args: [id]
        })

        const data = { 
            friends: member.rows,
            invites: invites.rows
            }

        return new Response(JSON.stringify({ data: data, status: '200'}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }catch(error) {
        console.error('error in getting settings: ', error)
        return new Response(JSON.stringify({message: 'error in getting settings', status: 400}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }
}

export async function getUserInfo(req: Bun.BunRequest) {

    try {
        const id = req.params
        if(!id) throw new Error('no id found!') 
        
        const turso = createDBClient()
        const user = await turso.execute({
            sql: "SELECT * FROM User JOIN Instance ON User.user_id = owner_id WHERE owner_id = ?",
            args: [id],
        });

        return new Response(JSON.stringify({ data: user.rows[0], status: '200'}), { headers: {"Access-Control-Allow-Origin": "*"}})

    }catch(error){
        console.error('error in getting user information', error)
        return new Response(JSON.stringify({message: 'Error in getting user information', status: 400}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }
}

export async function updateProfile(req: Bun.BunRequest){
    return new Response(JSON.stringify({ message: 'successfully updated profile', status: '200'}), { headers: {"Access-Control-Allow-Origin": "*"}})
}