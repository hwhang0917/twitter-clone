import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { dbService } from "firebaseApp";
import Tweet from "Components/Tweet";
import TweetForm from "Components/TweetForm";
import { TweetObject } from "@types";

const Container = styled.div``;

type _Props = {
  userObj: firebase.User | null;
};

function Home({ userObj }: _Props) {
  const [tweets, setTweets] = useState<TweetObject[]>([]);

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTweets(tweetsArray);
    });
  }, []);

  return (
    <Container>
      <TweetForm userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj?.uid}
          />
        ))}
      </div>
    </Container>
  );
}

export default Home;
