import { Spinner } from 'grommet';
import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import HorizontalCenter from '../components/HorizontalCenter';
import Contact from '../views/Contact';
import GroupAdd from '../views/GroupAdd';
import GroupsOrder from '../views/GroupsOrder';
import GroupUpdate from '../views/GroupUpdate';
import LinkAdd from '../views/LinkAdd';
import LinksOrder from '../views/LinksOrder';
import LinkUpdate from '../views/LinkUpdate';
import PageAdd from '../views/PageAdd';
import PageDetails from '../views/PageDetails';
import Pages from '../views/Pages';
import PageUpdate from '../views/PageUpdate';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Welcome from '../views/Welcome';

function Router({ isCheckingRefreshToken, isLoggedIn }) {
  if (isCheckingRefreshToken) {
    return (
      <HorizontalCenter justify="center" margin="3rem 0 0">
        <Spinner size="large" />
      </HorizontalCenter>
    );
  }

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/p/:pageId/links/add" component={LinkAdd} />
        <Route path="/p/:pageId/links/:linkId" component={LinkUpdate} />

        <Route path="/p/:pageId/groups/add" component={GroupAdd} />
        <Route path="/p/:pageId/groups/order" component={GroupsOrder} />
        <Route path="/p/:pageId/groups/:groupId/update" component={GroupUpdate} />
        <Route path="/p/:pageId/groups/:groupId/order" component={LinksOrder} />
        <Route path="/p/add" component={PageAdd} />
        <Route path="/p/:pageId" component={PageDetails} />
        <Route path="/p/:pageId/update" component={PageUpdate} />

        <Route path="/" component={Pages} />
        <Route>{() => <Redirect to="/" />}</Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/contact" component={Contact} />

      <Route path="/" component={Welcome} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;
