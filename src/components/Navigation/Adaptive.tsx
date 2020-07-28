import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './style.scss';
import appnamehereWhite from '../../images/appnamehere_white.svg';
import appnamehereBlack from '../../images/appnamehere_black.svg';
import Links from './Links';
import { Authorization, Profile } from '../Types/GeneralTypes';
// import SearchBar from '../Ux/SearchBar';
import { receiveMessage } from '../../events/MessageService';
import SearchBar from '../../oakui/SearchBar';
import OakButton from '../../oakui/OakButton';

interface Props {
  sendEvent: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  getProfile: Function;
  toggleDarkMode: Function;
  profile: Profile;
  asset: string;
  login: Function;
  transparent: boolean;
  logout: Function;
  toggleSettings: any;
}

const Adaptive = (props: Props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const authorization = useSelector(state => state.authorization);

  useEffect(() => {
    props.getProfile();
  }, []);

  useEffect(() => {
    receiveMessage().subscribe(message => {
      if (message.name === 'show-navbar-element') {
        setShowSearchBar(message.signal);
      }
    });
  }, []);

  const signin = type => {
    props.login(type);
  };

  return (
    <div className="navbar">
      <div className="left">
        {!props.transparent && props.profile.theme === 'theme_light' && (
          <img className="logo" src={appnamehereBlack} alt="Appnamehere logo" />
        )}
        {(props.transparent || props.profile.theme === 'theme_dark') && (
          <img className="logo" src={appnamehereWhite} alt="Appnamehere logo" />
        )}
        <Links authorization={authorization} asset={props.asset} />
        {showSearchBar && <SearchBar alt />}
      </div>
      <div className="right">
        <div className="dark-mode">
          <OakButton
            theme="default"
            variant="regular"
            action={props.toggleDarkMode}
            icon="brightness_6"
          />
        </div>
        <div className="action">
          {authorization.isAuth && props.asset && (
            <OakButton
              theme="primary"
              variant="disappear"
              action={props.logout}
            >
              <i className="material-icons">power_settings_new</i>Logout
            </OakButton>
          )}
          {!authorization.isAuth && props.asset && (
            <OakButton
              theme="primary"
              variant="appear"
              align="left"
              small
              action={() => signin('signin')}
            >
              <i className="material-icons">person</i>Login
            </OakButton>
          )}
          {!authorization.isAuth && props.asset && (
            <OakButton
              theme="primary"
              variant="appear"
              align="right"
              small
              action={() => signin('signup')}
            >
              <i className="material-icons">person_add</i>Signup
            </OakButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Adaptive;
