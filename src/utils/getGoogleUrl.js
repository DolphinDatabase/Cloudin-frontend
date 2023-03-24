import { google } from 'googleapis'
import clientSecret from '../../client_secret_532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com.json'

// eslint-disable-next-line no-undef
export default getGoogleUrl = async() => {
    const oauth2Client = new google.auth.OAuth2(
        clientSecret.WLc.client_id,
        clientSecret.WLc.client_secret,
        clientSecret.WLc.redirect_uris[0]
    );

    const scopes = [
        'https://www.googleapis.com/auth/drive'
    ];

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope:scopes
    });

    return url
};