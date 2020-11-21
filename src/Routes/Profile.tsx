import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { authService, dbService } from "firebaseApp";
import { useHistory } from "react-router-dom";
import { TweetObject } from "@types";
import Tweet from "Components/Tweet";
import Loading from "Components/Loading";

type _Props = {
  userObj: firebase.User | null;
};

function Profile({ userObj }: _Props) {
  const history = useHistory();
  const [myTweets, setMyTweets] = useState<TweetObject[]>([]);
  const [loading, setLoading] = useState(true);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyTweets = async () => {
    let tweetsQuery;
    let tweets: TweetObject[] = [];
    try {
      tweetsQuery = await dbService
        .collection("tweets")
        .where("creatorId", "==", userObj?.uid)
        .get();
      tweets = tweetsQuery.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
    } finally {
      setLoading(false);
      setMyTweets(tweets);
    }
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  return (
    <section>
      <button onClick={onLogOutClick}>Log Out</button>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {myTweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweetObj={tweet}
              isOwner={tweet.creatorId === userObj?.uid}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Profile;
