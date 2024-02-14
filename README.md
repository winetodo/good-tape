# Hacker News Top Stories React Project

## Description

This project is a simple React application that fetches and displays the top 10 random stories from Hacker News using their official API.

The primary code of focus resides inside src -> App.js

## Installation

Before running this project, make sure you have Node.js and npm installed on your system.

To install the project dependencies, run:

npm install

## Usage

To start the application, run:

npm start

This will launch the application in your default browser at `http://localhost:3000`.

## Features

- Fetches top stories from Hacker News on initial load
- Ability to refresh the stories displayed with new random selections
- Error handling to alert the user of any issues during data fetching

## Dependencies

- React: For building the user interface
- Fetch API: For making network requests to the Hacker News API

## API Reference

The application uses the following endpoints from the Hacker News API:

- Top stories: `https://hacker-news.firebaseio.com/v0/topstories.json`
- Story details: `https://hacker-news.firebaseio.com/v0/item/[id].json`
- Author details: `https://hacker-news.firebaseio.com/v0/user/[id].json`

For more details about the API, visit the official GitHub page: https://github.com/HackerNews/API
