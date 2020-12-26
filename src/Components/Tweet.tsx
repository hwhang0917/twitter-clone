import React, { useState } from "react";
import styled from "styled-components";
import { dbService, storageService } from "firebaseApp";
import { TweetObject } from "@types";

const TweetContainer = styled.div``;

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
    if (ok) {
      try {
        await dbService.doc(`tweets/${tweetObj.id}`).delete();
        if (tweetObj.attachmentUrl) {
          await storageService.refFromURL(tweetObj.attachmentUrl).delete();
        }
      } catch (error) {
        alert(error);
      }
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
      {tweetObj.attachmentUrl && (
        <img src={tweetObj.attachmentUrl} alt="tweet photo" />
      )}
      <h4>{tweetObj.message}</h4>
      <p>{tweetObj.createdAt}</p>
      <p>{tweetObj.creatorId}</p>
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
