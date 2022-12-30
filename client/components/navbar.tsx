import { Badge, Button, IconButton } from '@mui/material';
import styled from "styled-components";
import React from 'react';

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;

interface Props {
  basketQty: number;
}

class Navbar extends React.Component<Props> {
  render() {
    const { basketQty } = this.props;

    return (
      <Wrapper>
        <Button size="small">
          <img src='/octopus-logo.svg' alt='octopus logo' style={{ width: 180 }}/>
        </Button>
        <Badge color="primary" badgeContent={basketQty} title="Basket items">
          <IconButton size="small">
            <img src='/basket.svg' alt='basket' style={{ width: 25 }}/>
          </IconButton>
        </Badge>
      </Wrapper>
    );
  }
}

export default Navbar;
