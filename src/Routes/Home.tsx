import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { dbService } from "firebaseApp";

type Tweet = {
  id: string;
  message?: string;
  createdAt?: number;
};

const Home: React.FC<{ userObj: firebase.User | null }> = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const getTweets = async () => {
    const dbTweets = await dbService.collection("tweets").get();
    dbTweets.forEach((document) => {
      const newTweetObject: Tweet = {
        id: document.id,
        ...document.data(),
      };
      setTweets((prev) => [newTweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getTweets();
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      message: tweet,
      createdAt: Date.now(),
      cretorId: userObj?.uid,
    });
    setTweet("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={tweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.message}</h4>
            <p>{tweet.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
