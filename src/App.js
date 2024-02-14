import React, { useState, useEffect } from "react";

function App() {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  // button to refresh the stories
  const refreshStories = () => {
    fetchStories();
  };

  const fetchStories = async () => {
    setError(null); // Resetting error state on each attempt
    try {
      // fetch top stories from https://hacker-news.firebaseio.com/v0/topstories.json
      const storiesResponse = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );

      if (!storiesResponse.ok) {
        throw new Error("Failed to fetch stories - please try again later");
      }

      // read the response as json
      const storiesData = await storiesResponse.json();

      // select 10 random story ids
      const tenRandomStoryIds = storiesData
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

      // now we fetch the details of each story together in parallel

      const storiesDetails = await Promise.all(
        tenRandomStoryIds.map(async (storyId) => {
          // First get story title, URL, timestamp, score and Author ID (which is the "by") from https://hacker-news.firebaseio.com/v0/item/[id].json
          // Then use the author ID to get the author's karma score from https://hacker-news.firebaseio.com/v0/user/[id].json

          const storyDetailsResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
          );

          if (!storyDetailsResponse.ok) {
            throw new Error(
              "Failed to fetch story details - please try again later"
            );
          }

          const storyDetailsData = await storyDetailsResponse.json();

          const authorDetailsResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/user/${storyDetailsData.by}.json`
          );

          if (!authorDetailsResponse.ok) {
            throw new Error(
              "Failed to fetch author details - please try again later"
            );
          }

          const authorDetailsData = await authorDetailsResponse.json();

          // now return the combined data

          return {
            // could also be: return { ...storyDetailsData, authorKarma: authorDetailsData.karma }
            id: storyDetailsData.id,
            title: storyDetailsData.title,
            url: storyDetailsData.url,
            // converting the timestamp to a human readable date
            timestamp: new Date(storyDetailsData.time * 1000).toLocaleString(),
            score: storyDetailsData.score,
            authorId: storyDetailsData.by,
            authorKarma: authorDetailsData.karma,
          };
        })
      );
      // sort the stories by score ascending
      storiesDetails.sort((a, b) => a.score - b.score);
      // set the stories in the state
      setStories(storiesDetails);
    } catch (error) {
      setError(error.message); // Set error message in state for display
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      <h1>Hacker News </h1>
      <h2 style={{ color: "gray" }}>10 Top Stories</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button onClick={refreshStories}>👉 Refresh Stories 👈</button>

      <div>
        <hr />
        {stories.map((story) => (
          <div key={story.id}>
            <h4 style={{ color: "gray" }}>
              Story: {stories.indexOf(story) + 1}
            </h4>
            <h3>{story.title}</h3>
            <p>
              <em>Story Score: </em>
              {story.score}
            </p>
            <p>
              <em>Story url: </em>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.url}
              </a>
            </p>
            <p>
              <em>Story Timestamp: </em>
              {story.timestamp}
            </p>
            <p>
              <em>Author ID: </em>
              {story.authorId}
            </p>
            <p>
              <em>Author Karma Score: </em>
              {story.authorKarma}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
