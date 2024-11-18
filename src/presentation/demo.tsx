import React, { useState } from 'react';

const TwitterClone = () => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState<string[]>([]);

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const handleTweetSubmit = () => {
    if (tweet.trim()) {
      setTweets([tweet, ...tweets]);
      setTweet('');
    }
  };

  return (
    <div>
      <h1>Twitter Clone</h1>
      <div>
        <textarea
          value={tweet}
          onChange={handleTweetChange}
          placeholder="What's happening?"
        />
        <button onClick={handleTweetSubmit}>Tweet</button>
      </div>
      <div>
        {tweets.map((t, index) => (
          <div key={index}>{t}</div>
        ))}
      </div>
    </div>
  );
};

export default TwitterClone;
