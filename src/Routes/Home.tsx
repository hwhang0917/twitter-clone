import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { dbService } from "firebaseApp";
import Tweet from "Components/Tweet";

const Container = styled.div``;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;

  padding: 15px;
  margin: 10px;
  border: 1px solid black;

  background: rgba(0, 0, 0, 0.25);

  & > input:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const PreviewBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Preview = styled.img`
  width: 50px;
  height: 100%;
  margin: 0 auto;
`;

type Tweet = {
  id: string;
  message?: string;
  createdAt?: number;
  creatorId?: string;
};

const Home: React.FC<{ userObj: firebase.User | null }> = ({ userObj }) => {
  const [message, setMessage] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [attachment, setAttachment] = useState<FileReader["result"]>(null);

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
      message,
      createdAt: Date.now(),
      creatorId: userObj?.uid,
    });
    setMessage("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    const fileReader = new FileReader();

    if (files) {
      const imageFile = files[0];
      fileReader.readAsDataURL(imageFile);
    }

    fileReader.onloadend = () => {
      setAttachment(fileReader.result);
    };
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <Container>
      <StyledForm onSubmit={onSubmit}>
        {attachment && (
          <PreviewBox>
            <Preview src={attachment?.toString()} alt="preview" />
            <button onClick={onClearAttachment}>Clear Attachment</button>
          </PreviewBox>
        )}
        <input
          type="text"
          value={message}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
      </StyledForm>
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
};

export default Home;
