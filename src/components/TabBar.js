import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.div`
  background-color: white;
  /* position: absolute;
  bottom: 0; */
  margin: 0 auto;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Tabs = styled.div`
  flex: 1;
  height: 80px;
  width: 100%;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin: 0 8px;
  overflow: hidden;
`;

const TabItem = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabBar = () => {
  return (
    <Wrapper>
      <Tabs>
        <TabItem>
          <Link href="/map">
            <a>MAP</a>
          </Link>
        </TabItem>
        <TabItem>
          <Link href="/checklist">
            <a>LIST</a>
          </Link>
        </TabItem>
        <TabItem>
          <Link href="/guide">
            <a>GUIDE</a>
          </Link>
        </TabItem>
      </Tabs>
    </Wrapper>
  );
};

export default TabBar;
