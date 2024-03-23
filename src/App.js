import { useState } from 'react';
import './App.css';
import { LOGIN_REQUEST, PUBLIC_CLIENT_APPLICATION, TOKEN_REQUEST } from './msalConfig';

function App() {
  const [token, setToken] = useState(null);
  const [interactionInProgress, setInteractionInProgress] = useState(false);

  const handleSignIn = async () => {
    const loginResponse = await PUBLIC_CLIENT_APPLICATION.loginPopup(LOGIN_REQUEST);
    if (loginResponse.account) {
      PUBLIC_CLIENT_APPLICATION.setActiveAccount(loginResponse.account);
    }
    const tokenResponse = await PUBLIC_CLIENT_APPLICATION.acquireTokenSilent(TOKEN_REQUEST);
    setToken(tokenResponse.accessToken);
  }

  const handleSignOut = async () => {
    if (!interactionInProgress) {
      setInteractionInProgress(true);
      PUBLIC_CLIENT_APPLICATION.logout();
      setToken(null);
      setInteractionInProgress(false);
    }
  }

  const handleRefreshToken = async () => {
    const tokenResponse = await PUBLIC_CLIENT_APPLICATION.acquireTokenSilent(TOKEN_REQUEST);
    setToken(tokenResponse.accessToken);
  }

  return (
    <div className="App">
      <h1>
        React.JS Azure AD Authentication with MSAL.js
      </h1>
      {
        token ? (
          <div>
            <p
              style={{
                color: 'green',
                fontSize: '20px',
                fontWeight: 'bold'
              }}
            >
              You are authenticated!
            </p>
            <p>
              Your token is:
            </p>
            <p
              style={{
                color: 'blue',
                fontSize: '16px',
                fontWeight: 'bold',
                width: "80%",
                wordWrap: "break-word",
                margin: "auto"
              }}
            >
              {token}
            </p>

            <button
              onClick={handleRefreshToken}
              style={{
                margin: "10px"
              }}
            >
              Refresh Token
            </button>

            <button
              onClick={handleSignOut}
              disabled={interactionInProgress}
            >
              Logout
            </button>
          </div>
        )
          : (
            <div>
              <p
                style={{
                  color: 'red',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
              >
                You are not authenticated!
              </p>
              <p>
                Please click the button below to login.
              </p>

              <button
                onClick={handleSignIn}
              >
                Login
              </button>
            </div>
          )
      }
    </div>
  );
}

export default App;
