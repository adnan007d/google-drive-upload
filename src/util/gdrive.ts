import { auth, drive } from "@googleapis/drive";
import { config } from "dotenv";

config();

// You can either use service account or OAuth

// const SCOPES = ["https://www.googleapis.com/auth/drive"];
// const GAuth = new auth.GoogleAuth({
//   keyFile: "./serviceAccountKey.json",
//   scopes: SCOPES,
// });

const GAuth = new auth.OAuth2({
  clientId: process.env.GD_CLIENT_ID,
  clientSecret: process.env.GD_CLIENT_SECRET,
  redirectUri: process.env.GD_REDIRECT_URI,
});

GAuth.setCredentials({ refresh_token: process.env.GD_REFRESH_TOKEN });

const driveService = drive({ version: "v3", auth: GAuth });

export { driveService };
