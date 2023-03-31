import axios from "axios"

var payload = {
    refresh_token: window.localStorage.getItem("google"),
    client_id: "532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com",
    client_secret: "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",
    grant_type: "refresh_token"
}

async function refreshToken(){ 
    const res =  await axios.post("https://oauth2.googleapis.com/token", payload)
    return res.access_token
}

export default refreshToken