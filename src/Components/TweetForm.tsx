import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import firebase from "firebase";
import { dbService, storageService } from "firebaseApp";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;

  border: 1px solid black;

  & > * {
    margin-bottom: 15px;
  }
`;
const PreviewBox = styled.div``;
const Preview = styled.img``;
const ClearButton = styled.button``;
const MessageInput = styled.input`
  font-size: 2em;
`;
const FileInput = styled.input``;
const Submit = styled.input``;

// ---- STYLE END ----

type _Props = {
  userObj: firebase.User | null;
};

function TweetForm({ userObj }: _Props) {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<string>("");
  const fileInput = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let attachmentUrl = "";
      if (attachment) {
        const attachmentRef = storageService
          .ref()
          .child(`${userObj?.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
      }
      const tweetObj = {
        message,
        createdAt: Date.now(),
        creatorId: userObj?.uid,
        attachmentUrl,
      };
      await dbService.collection("tweets").add(tweetObj);
    } catch (error) {
      alert(`Tweet Upload Failed: ${error}`);
    } finally {
      setMessage("");
      setAttachment("");
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    }
  };

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      if (fileReader.result) {
        setAttachment(fileReader.result?.toString());
      }
    };
  };

  const onClearAttachment = () => {
    setAttachment("");

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  return (
    <>
      <StyledForm id="tweet__form" onSubmit={onSubmit}>
        {attachment && (
          <PreviewBox>
            <Preview src={attachment?.toString()} alt="image preview" />
            <ClearButton onClick={onClearAttachment}>
              Clear Attachment
            </ClearButton>
          </PreviewBox>
        )}
        <MessageInput
          type="text"
          onChange={onMessageChange}
          placeholder="What's on your mind?"
          value={message}
        />
        <FileInput
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <Submit type="submit" value="Tweet" />
      </StyledForm>
    </>
  );
}

export default TweetForm;
