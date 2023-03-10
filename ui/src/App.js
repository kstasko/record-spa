import './App.css';
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { RecordFetcher } from './RecordFetcher';

Amplify.configure({
  Auth: {
    userPoolId: 'us-east-2_SrK5dzmjJ',
    userPoolWebClientId: '3glslcjg8ricli2s2aebhrqpgq',
  },
});

function App() {
  return <Authenticator>
    {({ user }) => {
      const session = user.getSignInUserSession();
      if (!session) throw new Error("SignInSession is empty!");
      const userIdToken = session.getIdToken();
      return (
        <div className="App">
          <h1>Hello, {user.username}</h1>
          <h1>Record SPA!</h1>
          <RecordFetcher userToken={userIdToken.getJwtToken()} />
        </div>)
    }}
  </Authenticator>
}

export default App;
