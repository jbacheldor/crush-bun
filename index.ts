import { submitBugReport } from "./src/api-calls/bug";
import { getCrushes, getCrushesInfo, getCrushesUpdates } from "./src/api-calls/crush";
import { createAccount, getInvites } from "./src/api-calls/invites";
import { submitLottery } from "./src/api-calls/lottery";
import { cancelInvite, getSettings, getUserInfo, removeFriend, updateProfile } from "./src/api-calls/settings";

const server = Bun.serve({
    port: 8080,
    routes: {
        "/": () => {return new Response(JSON.stringify({message: 'Bun!', status: 200}), { headers: {"Access-Control-Allow-Origin": "*"}})},
        "/invites/getinvite/:invite":  (req) => getInvites(req),
        "/invites/createaccount": {
            POST: (req)=> createAccount(req)
        },
        "/settings/removefriend": {
            DELETE: (req) => removeFriend(req)
        },
        "/settings/cancelinvite": {
            PATCH: (req) => cancelInvite(req)
        },
        "/settings/getsettings/:id": {
            GET: (req) => getSettings(req)
        },
        "/settings/getuserinfo/:id": {
            GET: (req) => getUserInfo(req)
        },
        "/settings/updateprofile": {
            PATCH: (req)=> updateProfile(req)
        },
        "/bug/reportbug": {
            POST: (req) => submitBugReport(req)
        },
        "/lottery": {
            POST: (req) => submitLottery(req)
        },
        "/crush/getUpdates/:id/:instance_id": {
            GET: (req)=> getCrushesUpdates(req)
        },
        "/crush/getCrushes/:id": {
            GET: (req)=> getCrushes(req)
        },
        "/crush/getCrushInfo/:id": {
            GET: (req)=> getCrushesInfo(req)
        }
    },
    error(error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Internal Server Error", status: 500}), { headers: {"Access-Control-Allow-Origin": "*"}})
    },
    async fetch(req) {
        console.log('welp we found no matches to that url', req.url)
        return new Response(JSON.stringify("welp we found no matches to that url: " + req.url), { headers: {"Access-Control-Allow-Origin": "*"}});
    },
})

console.log(`listening on ${server.url}`)