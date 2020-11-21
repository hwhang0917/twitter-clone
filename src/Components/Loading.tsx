import React from "react";
import styled from "styled-components";

const LoadContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & > div:nth-child(1) {
    top: 8px;
    left: 8px;
    animation-delay: 0s;
  }
  & > div:nth-child(2) {
    top: 8px;
    left: 32px;
    animation-delay: -0.4s;
  }
  & > div:nth-child(3) {
    top: 8px;
    left: 56px;
    animation-delay: -0.8s;
  }
  & > div:nth-child(4) {
    top: 32px;
    left: 8px;
    animation-delay: -0.4s;
  }
  & > div:nth-child(5) {
    top: 32px;
    left: 32px;
    animation-delay: -0.8s;
  }
  & > div:nth-child(6) {
    top: 32px;
    left: 56px;
    animation-delay: -1.2s;
  }
  & > div:nth-child(7) {
    top: 56px;
    left: 8px;
    animation-delay: -0.8s;
  }
  & > div:nth-child(8) {
    top: 56px;
    left: 32px;
    animation-delay: -1.2s;
  }
  & > div:nth-child(9) {
    top: 56px;
    left: 56px;
    animation-delay: -1.6s;
  }
  @keyframes lds-grid {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const LoadDot = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #00acee;
  animation: lds-grid 1.2s linear infinite;
`;

// ---- STYLE END ----

function Loading() {
  return (
    <LoadContainer>
      <LoadDot></LoadDot>
      <LoadDot></LoadDot>
      <LoadDot></LoadDot>
      <LoadDot></LoadDot>
      <LoadDot></LoadDot>
      <LoadDot></LoadDot>
      <LoadDot></LoadDot>
      <LoadDot></LoadDot>
      <LoadDot></LoadDot>
    </LoadContainer>
  );
}

export default Loading;
