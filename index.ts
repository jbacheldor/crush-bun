import { submitBugReport } from "./src/api-calls/bug";
import { getCrushes } from "./src/api-calls/crush";
import { createAccount, getInvites } from "./src/api-calls/invites";
import { cancelInvite, getSettings, getUserInfo, removeFriend, updateProfile } from "./src/api-calls/settings";

const server = Bun.serve({
    port: 8080,
    routes: {
        "/": () => {return new Response(JSON.stringify({message: 'Bun!', status: 200}), { headers: {"Access-Control-Allow-Origin": "*"}})},
        "/getinvites/:invite":  (req) => getInvites(req),
        "/invites/createaccount": {
            GET: ()=> {return new Response('yahooo')},
            POST: (req)=> createAccount(req)
        },
        "/settings/removefriend": {
            DELETE: (req) => removeFriend(req)
        },
        "/settings/cancelinvite": {
            PATCH: (req) => cancelInvite(req)
        },
        "/settings/getsettings": {
            GET: (req) => getSettings(req)
        },
        "/settings/getuserinfo": {
            GET: (req) => getUserInfo(req)
        },
        "/settings/updateprofile": {
            PATCH: (req)=> updateProfile(req)
        },
        "/bug/reportbug": {
            POST: (req) => submitBugReport(req)
        },
    },
    error(error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Internal Server Error", status: 500}), { headers: {"Access-Control-Allow-Origin": "*"}})
    },
    async fetch(req) {
        console.log('in hither for why')
    return new Response("hello world");
    },
})

console.log(`listening on ${server.url}`)