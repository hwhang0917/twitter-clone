import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "firebaseApp";

const TweetContainer = styled.div`
  padding: 15px;
  margin: 10px;
  border: 1px solid black;
`;

type TweetObject = {
  id: string;
  message?: string;
  createdAt?: number;
  creatorId?: string;
};

const Tweet: React.FC<{ tweetObj: TweetObject; isOwner: boolean }> = ({
  tweetObj,
  isOwner,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.message);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    console.log(ok);
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({ message: newTweet });
    setEditing(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  if (editing) {
    return (
      <TweetContainer>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="What's on your mind?"
            value={newTweet}
            required
            onChange={onChange}
          />
          <input type="submit" value="Update Tweet" />
        </form>
        <button onClick={toggleEditing}>Cancel</button>
      </TweetContainer>
    );
  }

  return (
    <TweetContainer>
      <h4>{tweetObj.message}</h4>
      <p>{tweetObj.createdAt}</p>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button onClick={toggleEditing}>Edit Tweet</button>
        </>
      )}
    </TweetContainer>
  );
};

export default Tweet;
