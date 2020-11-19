import React, { useState } from "react";
import styled from "styled-components";
import { dbService } from "firebaseApp";
import { TweetObject } from "@types";

const TweetContainer = styled.div`
  padding: 15px;
  margin: 10px 0;
  border: 1px solid black;
`;

// ---- STYLE END ----

type _Props = {
  tweetObj: TweetObject;
  isOwner: boolean;
};

function Tweet({ tweetObj, isOwner }: _Props) {
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
      <img src={tweetObj.attachmentUrl} alt="tweet photo" />
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
}

export default Tweet;
