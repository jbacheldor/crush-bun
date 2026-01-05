import { getInvites } from "./src/invites";

console.log("Hello via Bun!");

const server = Bun.serve({
    port: 3001,
    routes: {
        "/": () => {return new Response(JSON.stringify({message: 'Bun!', status: 203}), { headers: {"Access-Control-Allow-Origin": "*"}})},
        "/getinvites/:invite":  (req) => getInvites(req)
    },
    error(error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Internal Server Error", status: 500}), { headers: {"Access-Control-Allow-Origin": "*"}})
    }
})

console.log(`listening on ${server.url}`)