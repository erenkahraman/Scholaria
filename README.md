# Scholaria - E-Learning Platform

Welcome to Scholaria, a modern, tablet-first e-learning platform built with React Native and Expo. This platform provides distinct dashboard experiences for students and teachers and is powered by Supabase for authentication and database management.

![Student Dashboard](https://i.imgur.com/example.png) <!-- It's a good idea to add a real screenshot here -->

## ✨ Features

-   **Role-Based Authentication**: Secure login and registration for Students, Teachers, and Admins.
-   **Student Dashboard**: A feature-rich dashboard for students to view courses, track assignments, and monitor progress.
-   **Teacher Dashboard**: A comprehensive dashboard for teachers to manage classes, create assignments, and view analytics.
-   **Admin View Switching**: Admins can seamlessly switch between teacher and student views for support and testing.
-   **Cross-Platform**: Built with Expo for native iOS, Android, and web support.

## 🛠️ Tech Stack

-   **Framework**: React Native with Expo
-   **Language**: TypeScript
-   **Backend & Auth**: Supabase
-   **UI Components**: Custom-built UI library
-   **Icons**: `lucide-react-native`

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Node.js (LTS version recommended)
-   Yarn or npm
-   A Supabase account (free tier is sufficient)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd scholaria
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables (Crucial Step!)

This project uses Supabase for its backend. You must provide your own Supabase project credentials.

1.  **Create a `.env` file** in the root of the project (`quantai/.env`).
2.  **Add your Supabase credentials** to it. You can find these in your Supabase project dashboard under `Project Settings` > `API`.

Your `.env` file should look like this:

```
EXPO_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL_HERE"
EXPO_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY_HERE"
```

### 4. Setup the Database

The complete database schema, including tables and authentication triggers, is located in `scripts/complete_schema.sql`.

1.  Navigate to the **SQL Editor** in your Supabase project dashboard.
2.  Copy the entire contents of `scripts/complete_schema.sql`.
3.  Paste it into the SQL editor and click **Run**. This will set up all necessary tables and functions.

### 5. Run the Application

Once your dependencies and environment are set up, you can start the Expo development server.

```bash
npx expo start
```

This will open the Expo developer tools in your browser. You can then run the app on:
- An iOS simulator (press `i`)
- An Android emulator (press `a`)
- A web browser (press `w`)

---

_This project was bootstrapped with Create React Native App and enhanced by AI._
