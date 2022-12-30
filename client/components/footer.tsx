import styled from "styled-components";
import React from 'react';

const Wrapper = styled.section`
    padding-left: 20px;
    padding-right: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: x-small;
    background-color: var(--hemocyanin);
`;

class Footer extends React.Component {
  render() {
    return (
      <Wrapper>
        Octopus Energy Ltd is a company registered in England and Wales.
        Registered number: 09263424. Registered office 33 Holborn,
        London, EC1N 2HT. Trading office: 20-24 Broadwick Street, London,
        W1F 8HT
      </Wrapper>
    );
  }
}

export default Footer;
