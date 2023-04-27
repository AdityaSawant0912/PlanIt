import { google } from 'googleapis'
import { oAuth2Client } from 'google-auth-library'
import { useSession } from 'next-auth/react';

const oAuth2Client = new oAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

oAuth2Client.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
});

async function createEvent() {
    const { data: session, status } = useSession()
    try {
        // Create a new calendar API client
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

        // Set the event details
        const event = {
            summary: 'Sample Event',
            location: 'San Francisco, CA',
            description: 'This is a sample event created using the Google Calendar API',
            start: {
                dateTime: '2023-05-01T09:00:00-07:00',
                timeZone: 'America/Los_Angeles',
            },
            end: {
                dateTime: '2023-05-01T17:00:00-07:00',
                timeZone: 'America/Los_Angeles',
            },
            reminders: {
                useDefault: true,
            },
        };

        const { data } = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        console.log(`Event created: ${data.htmlLink}`);
    } catch (error) {
        console.error(`Error creating event: ${error}`);
    }
}

createEvent();
