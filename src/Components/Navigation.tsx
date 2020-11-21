import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  margin: 15px 0;
`;
const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;
const MenuItem = styled.li`
  margin: 0;
  font-size: 1.3em;
`;
const Logo = styled.img`
  width: 100px;
  border-radius: 2em;
`;
const InternalLink = styled(Link)`
  text-decoration: none;
  &:visited {
    color: inherit;
  }
`;
const ExternalLink = styled.a`
  text-decoration: none;
  &:visited {
    color: inherit;
  }
`;

// ---- STYLE END ----

function Navigation() {
  return (
    <NavContainer>
      <MenuList>
        <MenuItem>
          <ExternalLink href="https://github.com/hwhang0917" target="blank">
            Github
          </ExternalLink>
        </MenuItem>
        <MenuItem>
          <InternalLink to="/" replace>
            <Logo
              src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568932725/noticon/mo7k1z7sonpsjdt5b1lw.png"
              alt="Twitter logo - link to home"
            />
          </InternalLink>
        </MenuItem>
        <MenuItem>
          <InternalLink to="/profile" replace>
            Profile
          </InternalLink>
        </MenuItem>
      </MenuList>
    </NavContainer>
  );
}

export default Navigation;
