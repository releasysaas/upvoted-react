# Upvoted React Example App

This is a simple example application demonstrating how to use the `upvoted-react` package in a React application.

## Getting Started

1. Make sure you have built the main package first:

   ```bash
   # From the root directory of upvoted-react
   npm run build
   ```

1. Install dependencies for the example app:

   ```bash
   cd examples/test-app
   npm install
   ```

1. Set up your environment variables:

   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env and add your actual API key
   ```

1. Start the development server:

   ```bash
   npm start
   ```

1. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Environment Variables

This example app uses environment variables to configure the Upvoted client:

- `REACT_APP_UPVOTED_API_KEY`: Your Upvoted authentication token

## Usage Examples

This example app demonstrates two ways to use the `upvoted-react` package:

1. Using the `useUpvoted` hook for React components
2. Direct usage of the `Upvoted` client class
