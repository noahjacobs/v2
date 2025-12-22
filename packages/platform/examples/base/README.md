# Atoms examples
Example apps using atoms - customizable UI components to integrate scheduling into your product.

> **Note:** These examples require the Cal.com Platform API (API v2) which is not included in this repository.
> To use these examples, you'll need access to a running Platform API instance or use the hosted API at `https://api.cal.com/v2`.

## Running examples apps locally

1. Cal's backend is required to run example apps, so clone `https://github.com/calcom/cal.com` and follow setup instructions in the readme. Importantly, you need to have Google credentials setup by following [this section](https://github.com/calcom/cal.com?tab=readme-ov-file#obtaining-the-google-api-credentials) in the docs.

2. Start "packages/platform/atoms" atoms package with `bun run dev`.
3. Start "apps/web" cal web app using `bun run dx`.
4. Open your browser at "http://localhost:3000/" and login with admin username `admin@example.com` and password `ADMINadmin2022!`.
5. In the web app navigate to `http://localhost:3000/settings/organizations/new` and create a sample organization. When asked for phone verification code enter `111111`.
6. In the web app navigate to `http://localhost:3000/settings/organizations/platform/oauth-clients` and create a new oAuth client - give all permissions and set redirect uri to `http://localhost:4321` which points to example app.
7. Setup environment for the example app you want to run:
    1. First, copy ".env.example" into ".env".
    2. Open ".env" file and paste client id from step 6 in `NEXT_PUBLIC_X_CAL_ID` and client secret in `X_CAL_SECRET_KEY`. Set `NEXT_PUBLIC_CALCOM_API_URL` to point to your Platform API instance (e.g., `https://api.cal.com/v2`).
8. Navigate to example app and setup database by running `rm -f prisma/dev.db && bun run prisma db push`.
9. Start the example app by running `bun run dev` and go to `http://localhost:4321`.
10. In the Google Cloud Console "API & Services" "Credentials" `https://console.cloud.google.com/apis/credentials` open web project setup in step 1 and add the appropriate redirect URI for your Platform API instance.

<img width="1000" alt="Screenshot 2024-03-21 at 09 42 36" src="https://github.com/calcom/atoms-examples/assets/42170848/82ce4d7a-fc08-489a-ab06-a8eb41a68a2a">

