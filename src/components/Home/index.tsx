import React, { useState } from 'react';
import OakText from '../../oakui/OakText';
import './style.scss';
import OakButton from '../../oakui/OakButton';
import shortenUrl from './TurlHome';
import { sendMessage } from '../../events/MessageService';

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

  const Url = e => {
    shortenUrl({
      url: state.url,
      urlKey: state.key,
    });
  };
  // .then(response => {
  //   if (response.status === 200) {
  //     sendMessage('notification', true, {
  //       type: 'success',
  //       message: ' has been created. You can proceed now',
  //       duration: 3000,
  //     });
  //     setData({ ...data, pageNo: data.pageNo + 1, created: true });
  //   } else {
  //     sendMessage('notification', true, {
  //       message: 'We are facing some problem, please try after sometime',
  //       duration: 3000,
  //     });
  //   }
  // })
  // .catch(error => {
  //   sendMessage('notification', true, {
  //     type: 'failure',
  //     message: 'Unknown error. Please try again or at a later time',
  //     duration: 3000,
  //   });
  // });

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
              <OakButton theme="default" variant="regular" action={e => Url(e)}>
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
