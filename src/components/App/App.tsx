import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Header from '../Header';
import AppList from '../AppList';
import MarkdownPage from '../MarkdownPage';
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
      {/* <Loader /> */}
      <Redirect to="/" />
    </Router>
  );
}

export default App;
