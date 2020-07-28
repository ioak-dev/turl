import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import OakText from '../../../oakui/OakText';
import OakButton from '../../../oakui/OakButton';
import { isEmptyOrSpaces, isEmptyAttributes } from '../../Utils';

import { CREATE_EMAIL_ACCOUNT } from '../../Types/schema';
import { UserPayload } from '../../../types/graphql';
import OakHeading from '../../../oakui/OakHeading';

interface Props {
  history: any;
  emailLogin: Function;
}
const AccountItem = (props: Props) => {
  const [createEmailAccount] = useMutation(CREATE_EMAIL_ACCOUNT);
  const [state, setState] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [formErrors, setFormErrors] = useState<any>({
    email: '',
    firstName: '',
    lastName: '',
  });

  const [message, setMessage] = useState(false);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const cancelLogin = () => {
    props.history.goBack();
  };

  const submit = event => {
    console.log('*********');
    event.preventDefault();
    const errorFields: any = { email: '', firstName: '', lastName: '' };

    if (isEmptyOrSpaces(state.firstName)) {
      errorFields.firstName = 'First name cannot be empty';
    }
    if (isEmptyOrSpaces(state.lastName)) {
      errorFields.lastName = 'Last name cannot be empty';
    }
    if (isEmptyOrSpaces(state.email)) {
      errorFields.email = 'Email cannot be empty';
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        state.email.trim().toLowerCase()
      )
    ) {
      errorFields.email = 'Invalid email';
    }
    setFormErrors(errorFields);
    if (isEmptyAttributes(errorFields)) {
      const payload: UserPayload = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
      };
      createEmailAccount({
        variables: {
          payload,
        },
      }).then(() => {
        setMessage(!message);
      });
    }
  };

  return (
    <>
      {message && (
        <div className="typhography-4">
          Thank you for creating account. You are ready to go! follow the
          instruction provided in the email or click on
          <div className="hyperlink" onClick={() => props.emailLogin()}>
            Login with email
          </div>
        </div>
      )}
      {!message && (
        <form method="GET" onSubmit={submit} noValidate>
          <div className="page-header">
            <OakHeading
              title="Email authentication"
              subtitle="You don't have an user account yet. Signup now"
            />

            <div className="action-header position-right">
              <OakButton action={submit} theme="primary" variant="appear">
                <i className="material-icons">double_arrow</i>Save
              </OakButton>
              {props.history.length > 2 && (
                <OakButton
                  action={() => cancelLogin()}
                  theme="default"
                  variant="appear"
                >
                  <i className="material-icons">close</i>Cancel
                </OakButton>
              )}
            </div>
          </div>
          <div className="user-form">
            <OakText
              label="First Name"
              data={state}
              id="firstName"
              handleChange={e => handleChange(e)}
            />
            <OakText
              label="Last name"
              data={state}
              id="lastName"
              handleChange={e => handleChange(e)}
            />
            <OakText
              label="Email"
              data={state}
              id="email"
              handleChange={e => handleChange(e)}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default AccountItem;
