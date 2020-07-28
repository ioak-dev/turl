import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';

import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { Route } from 'react-router-dom';
import './style.scss';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { withCookies } from 'react-cookie';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from '../Home';
import { getUser, addUser } from '../../actions/UserActions';
import { getProfile, setProfile } from '../../actions/ProfileActions';

import Notification from '../Notification';
import Navigation from '../Navigation';
import { Authorization } from '../Types/GeneralTypes';
import OakRouteGraph from '../Auth/OakRouteGraph';
import { receiveMessage } from '../../events/MessageService';

const themes = {
  themecolor1: getTheme('#69A7BF'),
  themecolor2: getTheme('#99587B'),
  themecolor3: getTheme('#A66C26'),
  themecolor4: getTheme('#37AE82'),
};

function getTheme(color: string) {
  return createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: color,
      },
    },
  });
}

interface Props {
  getProfile: Function;
  setProfile: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  getUser: Function;
  addUser: Function;
  cookies: any;

  // event: PropTypes.object,
  profile: any;
  authorization: Authorization;
}

const Content = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [asset, setAsset] = useState('');

  useEffect(() => {
    receiveMessage().subscribe(event => {
      if (event.name === 'spaceChange') {
        setAsset(event.data);
      }
    });
  }, []);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `${asset} ${authorization?.token}` || '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    props.getProfile();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div
        className={`App ${props.profile.theme} ${props.profile.textSize} ${props.profile.themeColor}`}
      >
        <HashRouter>
          <div className="body">
            <div className="body-content">
              <Notification />
              <MuiThemeProvider theme={themes.themecolor1}>
                <div className="body-content--container">
                  <Navigation {...props} />
                  <div className="body-content--container--content">
                    <Route
                      path="/home"
                      render={propsLocal => (
                        <OakRouteGraph
                          {...propsLocal}
                          {...props}
                          component={Home}
                        />
                      )}
                    />
                    <Route
                      path="/"
                      render={propsLocal => (
                        <OakRouteGraph
                          {...propsLocal}
                          {...props}
                          component={Home}
                        />
                      )}
                    />
                  </div>
                </div>
              </MuiThemeProvider>
            </div>
          </div>
        </HashRouter>
      </div>
    </ApolloProvider>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  profile: state.profile, // ,
  //   event: state.event
});

export default connect(mapStateToProps, {
  getProfile,
  setProfile,
  getUser,
  addUser,
})(withCookies(Content));
