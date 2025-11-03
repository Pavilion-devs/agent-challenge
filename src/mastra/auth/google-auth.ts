import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Google OAuth credentials from environment variables
const credentials = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uris: [process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'],
};

const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

const oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  REDIRECT_URI
);

// Set refresh token if available
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
}

/**
 * Automatically refresh access tokens
 */
oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    console.log('🔄 New refresh token received. Add to .env:');
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
  }
  if (tokens.access_token) {
    console.log('✅ Access token refreshed successfully');
  }
});

/**
 * Generate auth URL for initial OAuth flow
 */
export function getAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
  ];

  const alreadyHasRefresh = !!process.env.GOOGLE_REFRESH_TOKEN || !!oauth2Client.credentials.refresh_token;

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    include_granted_scopes: true,
    scope: scopes,
    // Only force consent if we don't have a refresh token yet
    ...(alreadyHasRefresh ? {} : { prompt: 'consent' }),
  });
}

/**
 * Exchange authorization code for tokens
 */
export async function getTokensFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  
  return tokens;
}

/**
 * Get authenticated client
 */
export function getAuthClient() {
  return oauth2Client;
}

/**
 * Check if client is authenticated
 */
export function isAuthenticated() {
  return !!process.env.GOOGLE_REFRESH_TOKEN || !!oauth2Client.credentials.refresh_token;
}

/**
 * Handle API errors (token expiry, auth errors)
 */
export async function handleApiError(error: any) {
  if (error.code === 401 || error.message?.includes('invalid_grant') || error.message?.includes('Invalid Credentials')) {
    console.error('⚠️ Google API authentication error. You may need to re-authenticate.');
    console.log('Visit /api/auth/google to re-authenticate');
  }
  throw error;
}

export { google };

