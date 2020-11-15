import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { dbService } from "firebaseApp";
import Tweet from "Components/Tweet";

type Tweet = {
  id: string;
  message?: string;
  createdAt?: number;
  creatorId?: string;
};

const Home: React.FC<{ userObj: firebase.User | null }> = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTweets(tweetsArray);
    });
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      message: tweet,
      createdAt: Date.now(),
      creatorId: userObj?.uid,
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
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj?.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
