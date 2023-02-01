import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import AppList from '../AppList';
import MarkdownPage from '../MarkdownPage';
import SingUp from '../Authorization/SingUp';
import SingIn from '../Authorization/SingIn';
import EditProfile from '../EditProfile';
import { useAppSelector } from '../../store/root-reducer';
import CreateArticle from '../CreateArticle';

function App() {
  const user = useAppSelector((state) => state.AutorizationReducer.isLoged);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={AppList} />
        <Route
          exact
          path="/articles/:slug"
          render={({ match }) => {
            return <MarkdownPage slug={match.params.slug} />;
          }}
        />
        <Route
          exact
          path="/articles/:slug/edit"
          render={({ match }) => {
            return <CreateArticle slug={match.params.slug} />;
          }}
        />
        <Route path="/sing-in" exact component={SingIn} />
        <Route path="/sing-up" exact component={SingUp} />
        {user ? <Route path="/profile" component={EditProfile} /> : <Redirect to="/sing-in" />}
        {user ? <Route path="/new-article" component={CreateArticle} /> : <Redirect to="/sing-in" />}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
