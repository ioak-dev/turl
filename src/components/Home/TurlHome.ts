import { httpPut } from '../Lib/RestTemplate';
import constants from '../Constants';
import { sendMessage } from '../../events/MessageService';

const domain = 'turlHome';

const shortenUrl = payload => {
  const tenant = 'joshi';
  return httpPut(`${constants.API_URL}/${tenant}/`, payload, {
    headers: {},
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
      }
    })
    .catch();
};

export default shortenUrl;
