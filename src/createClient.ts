import { createClient, type Client } from "@libsql/client"

export const createDBClient = () : Client => {
    if (process.env.TURSO_DATABASE_URL) {
        const x = createClient({
            url: process.env.TURSO_DATABASE_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        })
        return x
    } else {
        console.error('throwing an error we cant see process env')
        throw new Error('wheee error in creating this')
    }
}
