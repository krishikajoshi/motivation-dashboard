import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const [likedQuotes, setLikedQuotes] = useState(
    JSON.parse(localStorage.getItem("likedQuotes")) || []
  );

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);

    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const likeQuote = () => {

    const newQuote = {
      text: quote,
      author: author
    };

    const updatedQuotes = [...likedQuotes, newQuote];

    setLikedQuotes(updatedQuotes);

    localStorage.setItem("likedQuotes", JSON.stringify(updatedQuotes));
  };

  return (
    <div className="container">

      <h1>Daily Motivation ☀️</h1>

      <div className="quote-card">
        <p className="quote">"{quote}"</p>
        <p className="author">- {author}</p>
      </div>

      <div>
        <button onClick={fetchQuote}>New Quote</button>
        <button onClick={likeQuote}>Like ❤️</button>
      </div>

      <h3>Liked Quotes: {likedQuotes.length}</h3>

      <ul>
        {likedQuotes.map((q, index) => (
          <li key={index}>
            "{q.text}" - {q.author}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;