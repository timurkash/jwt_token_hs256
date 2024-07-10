// @ts-ignore
import {replaceSpecialChars} from './utils.js'

const algorithm = {name: "HMAC", hash: "SHA-256"}
const headerString = replaceSpecialChars(window.btoa(JSON.stringify({alg: 'HS256', typ: 'JWT'})))
const headerPayload = (payload: object): string => `${headerString}.${replaceSpecialChars(window.btoa(JSON.stringify(payload)))}`
// @ts-ignore
const sign = async (body: string, secret: string): Promise<string> => {
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey("raw", enc.encode(secret), algorithm, false, ["sign"])
    const signature = await crypto.subtle.sign(algorithm.name, key, enc.encode(body))
    // @ts-ignore
    return replaceSpecialChars(window.btoa(String.fromCharCode(...new Uint8Array(signature))))
}
// @ts-ignore
export const getToken = async (payload: object, secret: string): Promise<string> => {
    const hp = headerPayload(payload)
    return `${hp}.${replaceSpecialChars(await sign(hp, secret))}`
}
