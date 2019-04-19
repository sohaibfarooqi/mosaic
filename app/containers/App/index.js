import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import CompositionPage from 'containers/CompositionPage';
import RecordingPage from 'containers/RecordingPage';

import GlobalStyle from '../../global-styles';

/*
Main application wrapper.
*/
const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Music App"
        defaultTitle="Music App">
        <meta name="description" content="Music when it hit your soul, you feel no pain!" />
      </Helmet>
      <Header />
      <Switch>
        <Route path="/composition" component={CompositionPage} />
        <Route path="/recording" component={RecordingPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}
