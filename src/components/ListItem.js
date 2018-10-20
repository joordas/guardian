import React, { PureComponent } from "react";
import styled from 'styled-components'
import Link from "next/link";

const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`



class ListItem extends PureComponent {
  render() {
    const { text, url } = this.props
    return (
      <Wrapper>
        <Link href={{ pathname: url, query: { disaster: text }}}>
            <a style={{ fontSize: '40px' }}>
                {text}
            </a>
        </Link>
      </Wrapper>
    );
  }
}

export default ListItem;
