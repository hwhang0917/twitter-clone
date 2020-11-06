import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation: React.FC = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
