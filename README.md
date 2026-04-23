# WordHunters

An online word game where two teams compete to find their hidden words on a shared board. One player on each team is the Guider who sees the key card and gives one-word clues; the rest of the team guesses which words belong to them. Watch out for Death Cards!!! If you hit your own, you lose instantly.

Play at [wordhuntersonline.com](https://wordhuntersonline.com).

## Features

- **Local play** — pass-and-play on a single device with a countdown timer between turns
- **Online multiplayer** — create or join rooms with a 6-character code, real-time sync via Firestore
- **Two game variants** — Classic (2 Death Cards (1 per team), 9 neutral) and Sudden Death (6 Death Cards (3 per team), 5 neutral)
- **Firebase authentication** — email/password, Google sign-in, or play as a guest
- **Friends system** — search for users, send/accept friend requests, invite friends to your lobby
- **Clue history** — side menu tracks all clues given during the game

## Tech Stack

- **Web app** — HTML, CSS, vanilla JavaScript
- **Backend** — Firebase (Authentication, Firestore)
- **iOS app** — SwiftUI wrapper that loads the web app in a `WKWebView` (Xcode project in `Codenames.xcodeproj`, web assets in `Web/`)

## Running Locally

1. Clone the repo
2. Serve the root directory with any static file server:
   ```
   npx serve .
   ```
3. Open `http://localhost:3000` in your browser

The game connects to the production Firebase project for online features. Local play works without any backend.

## How to Play

1. **Split into two teams.** Each team picks one Guider.
2. **Guider gives a clue** — a single word plus a number indicating how many board words relate to it.
3. **Team guesses** by tapping cards. A correct guess lets you keep going; a wrong guess ends your turn.
4. **Death Cards** — each team has their own. Hit yours and you lose. Hit the opponent's and it's neutralized.
5. **First team to find all their words wins.**
