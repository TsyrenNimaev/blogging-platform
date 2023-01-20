import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';

import Header from '../Header';
import AppList from '../AppList';
import MarkdownPage from '../MarkdownPage';
import SingUp from '../Authorization/SingUp';
import SingIn from '../Authorization/SingIn';
// import Loader from '../Loader';

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={AppList} />
      <Route
        exact
        path="/articles/:slug"
        render={({ match, history }) => {
          return <MarkdownPage slug={match.params.slug} />;
        }}
      />
      <Route path="/sing-in" exact component={SingIn} />
      <Route path="/sing-up" exact component={SingUp} />
      {/* <Loader /> */}
      <Redirect to="/" />
    </Router>
  );
}

export default App;
