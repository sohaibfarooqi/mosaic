import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <div>
        <NavBar>
          <HeaderLink to="/composition">
            Compositions
          </HeaderLink>
          <HeaderLink to="/recording">
            Recordings
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
