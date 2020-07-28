import React, { useState } from 'react';
import OakText from '../../oakui/OakText';
import './style.scss';
import OakButton from '../../oakui/OakButton';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  history: any;
}

const Home = (props: Props) => {
  const [state, setState] = useState({
    url: '',
    key: '',
  });

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="home-page">
      <div className="home-page--container">
        <form>
          <div className="neu-card home-page--container--form">
            <OakText
              data={state}
              id="url"
              handleChange={handleChange}
              label="Source URL"
            />
            <OakText
              data={state}
              id="key"
              prefix="https://ioak.tk/"
              handleChange={handleChange}
              label="Generated URL"
            />
            <div className="footer-actions">
              <OakButton theme="default" variant="regular">
                Generate
              </OakButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
