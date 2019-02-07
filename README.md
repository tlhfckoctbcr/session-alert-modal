# ⏱ Session Alert Modal
A session alert tool built in React to extend sessions, login, and logout

## Installation
```sh
git clone ...
cd session-alert-modal
npm install
npm start
```

This will initialize a demonstration of the modal.

## How it Works
The component is built to accept multiple functions and parameters to help facilitate extending sessions, logging in and logging out of an application. It also accepts an session expiration dateTime and uses it to display the modal when the expiration time is within a certain threshold defined by the user. If the expiration is within the threshold, a modal will display with options to extend a session, or to logout. If the session expires, login credentials can be captured to log the user into the system and generate a new session without interruption.

## Usage
The component can receive a number of properties, several of which are required.

```jsx
import SessionAlert from "session-alert-modal";

<SessionAlert
  /*
    REQUIRED:
    Function for extending the user's session.
  */
  extend={handleExtendSession}
  /*
    REQUIRED:
    Function for logging in user. Username and password credentials are captured by the modal and are passed through in an object.
  */
  login={credentials => handleLogin(credentials)}
  /*
    REQUIRED:
    Function for logging out the user.
  */
  logout={handleLogout}
  /*
    String that will be displayed at the top of the modal. This will default to "Session Alert."
  */
  title={"Session Alert"}
  /*
    String that will be displayed within the body of the modal. This will default to "Your session is about to expire."
  */
  warningText={"Session Alert"}
  /*
    Number that will determine when to display the modal. This will default to 60 seconds.
  */
  expirationThresholdInSeconds={60}
  /*
    REQUIRED:
    Date object of when the session will expire.
  */
  expirationDateTime={new Date()}
/>
```