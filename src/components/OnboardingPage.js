import React from 'react';
import styled from 'styled-components';

const OnboardingPage = ({ page = {} }) => {
  const { title = '', description = '' } = page;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default OnboardingPage;
