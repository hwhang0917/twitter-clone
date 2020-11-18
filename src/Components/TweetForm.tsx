import React, { useRef, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { dbService } from "firebaseApp";

const StyledForm = styled.form``;
const PreviewBox = styled.div``;
const Preview = styled.img``;
const Submit = styled.input``;
const ClearButton = styled.button``;
const FileInput = styled.input``;
const MessageInput = styled.input``;

// ---- STYLE END ----

type _Props = {
  userObj: firebase.User | null;
};

function TweetForm({ userObj }: _Props) {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<FileReader["result"]>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dbService.collection("tweets").add({
        message,
        createdAt: Date.now(),
        creatorId: userObj?.uid,
      });
    } catch (error) {
      alert(`Tweet Upload Failed: ${error}`);
    } finally {
      setMessage("");
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
      setAttachment(fileReader.result);
    };
  };

  const onClearAttachment = () => {
    setAttachment(null);

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
        <MessageInput type="text" onChange={onMessageChange} />
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
