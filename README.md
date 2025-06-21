# Chats App

This is a Next.js chat application built with Firebase.

## Features

- User authentication (signup/login)
- Real-time one-on-one chat
- User search
- Firebase Firestore for database
- Firebase Hosting for deployment

## Getting Started (for local development)

1.  **Clone the repository (if you have it locally):**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up Firebase:**
    Ensure you have your Firebase project configuration correctly set up in `src/lib/firebase.ts`. The current version uses hardcoded values.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) (or the port specified in `package.json`) with your browser to see the result.

## Deployment

This project is configured for deployment using Firebase Hosting.
If connected to a GitHub repository, changes pushed to the specified branch (e.g., `main`) can trigger automatic builds and deployments via Firebase Console's GitHub integration.
Alternatively, you can deploy manually using the Firebase CLI:
```bash
firebase deploy --only hosting
