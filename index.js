import {getToken} from "jwt"

console.log(getToken({
    "sub": "1234567890",
        "name": "John Doe",
        "iat": 1516239022
}, "123"));
