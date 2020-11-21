import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import firebase from "firebase";
import { dbService, storageService } from "firebaseApp";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > * {
    margin-bottom: 15px;
  }
`;
const PreviewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const PreviewTitle = styled.h2`
  margin: 15px 0;
`;
const Preview = styled.img``;
const ClearButton = styled.button`
  all: unset;
  margin: 15px auto;
  border-radius: 2em;
  display: flex;
  cursor: pointer;
  color: #e74c3c;
`;
const MessageInput = styled.input`
  font-family: "Roboto", sans-serif;
  color: #333;
  font-size: 1.2rem;
  margin: 15px auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 90%;
  display: block;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
`;
const FileLabel = styled.label`
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 2em;
  display: flex;
  padding: 6px 12px;
  cursor: pointer;
`;
const FileInput = styled.input`
  display: none;
`;
const Submit = styled.input`
  all: unset;
  margin: 15px auto;
  background: #00acee;
  border-radius: 2em;
  display: flex;
  cursor: pointer;
  padding: 15px 30px;

  &:hover {
    background: #3498db;
  }
`;

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
            <PreviewTitle>Image Preview</PreviewTitle>
            <Preview src={attachment?.toString()} alt="image preview" />
            <ClearButton onClick={onClearAttachment}>
              <i className="fas fa-times" aria-label="Remove image" />
            </ClearButton>
          </PreviewBox>
        )}
        <MessageInput
          type="text"
          onChange={onMessageChange}
          placeholder="What's on your mind?"
          value={message}
          required
        />
        <FileLabel htmlFor="file-upload">
          <i className="fa fa-cloud-upload" />
          <span>Upload Image</span>
        </FileLabel>
        <FileInput
          id="file-upload"
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
