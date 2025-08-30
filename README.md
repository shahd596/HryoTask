# Social Sample (Expo + React Native + TypeScript)

A tiny social mobile app built with **Expo** and **React Native** (TypeScript). It has two screens:

- **Home** – lists posts from `https://gorest.co.in/public/v2/posts`
- **Post Details** – shows the selected post with the author's name/avatar on top and a **list of comments** below (from `https://gorest.co.in/public/v2/comments?post_id=...`).

## Features
- Clean UI with cards for posts and comments
- User name + avatar (generated from name via DiceBear) shown on both list and details
- Pull to refresh on Home
- Infinite scroll (loads more posts when you reach the bottom)
- Simple in-memory caching for user profiles to avoid repeat requests

## Screenshots
<img width="271" height="548" alt="image" src="https://github.com/user-attachments/assets/b510166d-65bb-4396-9b8d-e64ea10d8a9e" />`
<img width="283" height="540" alt="image" src="https://github.com/user-attachments/assets/25720679-c0d0-4a37-95d7-4af7c04fde6e" />


## Getting Started

### Prerequisites
- Node.js LTS (>= 18)
- **Expo Go** app installed on your Android/iOS device
- VS Code (optional, recommended)

### 1) Install dependencies
```bash
npm install
```

### 2) Run the app (Expo)
```bash
npx expo start
```
This opens Expo DevTools. Scan the QR code with the **Expo Go** app to run it on your phone.

> If you prefer platform-specific:
```bash
npm run android
# or
npm run ios
```


### Notes about the API
- Posts and comments come from the free GoREST public API.
- User names are fetched from `/users/:id`. Some users may not exist or be private; in that case we show **"Unknown User"** with a generated avatar.
- No authentication is required for **GET** endpoints.

## Project Structure
```text
.
├── App.tsx
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
├── src
│   ├── components
│   │   ├── Avatar.tsx
│   │   ├── CommentCard.tsx
│   │   └── PostCard.tsx
│   ├── hooks
│   │   └── useUser.ts
│   ├── screens
│   │   ├── HomeScreen.tsx
│   │   └── PostDetailsScreen.tsx
│   └── services
│       └── api.ts
├─
```

## How many hours?
~2.5 - 3 hours including polish and README


