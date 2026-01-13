import { submitBugReport } from "./src/api-calls/bug";
import { deleteComment, editComment, getComments, submitComment } from "./src/api-calls/comment";
import { getCrushes, getCrushesUpdates, submitCrush } from "./src/api-calls/crush";
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
        "/crush/getCrushes/:instance_id": {
            GET: (req)=> getCrushes(req)
        },
        "/crush/submitNewCrush": {
            POST: (req) => submitCrush(req)
        },
        "/comment/newComment": {
            POST: (req) => submitComment(req)
        },
        "/comment/getComments/:post_id": {
            GET: (req) => getComments(req)
        },
        "/comment/editComment": {
            POST: (req) => editComment(req)
        },
        "/comment/deleteComment/:comment_id": {
            DELETE: (req) => deleteComment(req)
        }
    },
    error(error) {
        console.error(error);
        return new Response(JSON.stringify({error: "Internal Server Error", status: 500}), { headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*"}})
    },
    async fetch(req) {
        // const path = new URL(req.url).pathname;

        console.log('welp we found no matches to that url', req.url)
        return new Response(JSON.stringify("welp we found no matches to that url"), { headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "*"}});
    },
})

console.log(`listening on ${server.url}`)