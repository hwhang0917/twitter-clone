import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { authService, dbService } from "firebaseApp";
import { useHistory } from "react-router-dom";
import { TweetObject } from "@types";
import Tweet from "Components/Tweet";
import Loading from "Components/Loading";

const ProfileWrapper = styled.section``;
const ProfileHeader = styled.header``;
const SectionTitle = styled.h2``;
const LogoutButton = styled.button`
  all: unset;
  color: #e74c3c;
  margin: 15px auto;
  border: 1px solid #e74c3c;
  border-radius: 2em;
  display: flex;
  cursor: pointer;
  padding: 15px 30px;

  &:hover {
    background: #e74c3c;
    color: #fff;
  }
`;
const ProfileContainer = styled.section``;
const ProfileImage = styled.img``;
const MyTweetSection = styled.section``;

// ---- STYLE END ----

type _Props = {
  userObj: firebase.User | null;
};

function Profile({ userObj }: _Props) {
  const history = useHistory();
  const [myTweets, setMyTweets] = useState<TweetObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState(userObj?.displayName);

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

  if (loading) {
    return <Loading />;
  }
  return (
    <ProfileWrapper>
      <ProfileHeader>
        <LogoutButton onClick={onLogOutClick}>
          <i className="fas fa-sign-out-alt" /> <span>Log Out</span>
        </LogoutButton>
      </ProfileHeader>
      <ProfileContainer>
        <SectionTitle>Edit Profile</SectionTitle>
        <ProfileImage
          src={
            userObj?.photoURL ||
            "https://i.ibb.co/Lh0nwhN/blank-profile-picture-png.png"
          }
        />
      </ProfileContainer>
      <MyTweetSection>
        <SectionTitle>My Tweets</SectionTitle>
        {myTweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj?.uid}
          />
        ))}
      </MyTweetSection>
    </ProfileWrapper>
  );
}

export default Profile;
