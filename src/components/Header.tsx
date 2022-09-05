import * as React from "react";
import { Container, Navbar } from "react-bootstrap";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          Hi! My name is Kenneth and this is my React TypeScript Bootstrap
          Project
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
