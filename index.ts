import { getInvites } from "./src/invites";

const server = Bun.serve({
    port: 3001,
    routes: {
        "/": () => {return new Response(JSON.stringify({message: 'Bun!', status: 203}), { headers: {"Access-Control-Allow-Origin": "*"}})},
        "/getinvites/:invite":  (req) => getInvites(req)
    },
    error(error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Internal Server Error", status: 500}), { headers: {"Access-Control-Allow-Origin": "*"}})
    },
    async fetch(req) {
        console.log('weeee what the request', req)
    return new Response("hello world");
    },
})

console.log(`listening on ${server.url}`)