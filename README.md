# Scholaria - E-Learning Platform

A tablet-first e-learning platform built with React Native, Expo, and Supabase. It provides separate dashboards for students and teachers.

## Tech Stack

-   **Framework**: React Native with Expo
-   **Language**: TypeScript
-   **Backend & Auth**: Supabase

## Getting Started

### Prerequisites

-   Node.js (LTS)
-   Yarn or npm
-   Supabase account

### Setup

1.  **Clone:** `git clone <repository-url>`
2.  **Install:** `npm install` or `yarn install`
3.  **Environment:** Create a `.env` file in `quantai/` with your Supabase URL and anon key.
    ```
    EXPO_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    EXPO_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
4.  **Database:** Run the schema from `scripts/complete_schema.sql` in your Supabase SQL editor.
5.  **Run:** `npx expo start`

---

_This project was bootstrapped with Create React Native App and enhanced by AI._
