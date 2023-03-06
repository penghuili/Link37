import { Spinner } from 'grommet';
import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import ChangePassword from '../shared/react/ChangePassword';
import Contact from '../shared/react/Contact';
import HorizontalCenter from '../shared/react/HorizontalCenter';
import Security from '../shared/react/Security';
import Setup2FA from '../shared/react/Setup2FA';
import SignIn from '../shared/react/SignIn';
import SignUp from '../shared/react/SignUp';
import Verify2FA from '../shared/react/Verify2FA';
import Account from '../views/Account';
import Encryption from '../views/Encryption';
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
import Pricing from '../views/Pricing';
import Privacy from '../views/Privacy';
import Terms from '../views/Terms';
import Tickets from '../views/Tickets';
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
        <Route path="/account" component={Account} />
        <Route path="/security" component={Security} />
        <Route path="/security/2fa" component={Setup2FA} />
        <Route path="/security/password" component={ChangePassword} />

        <Route path="/p/:pageId/links/add" component={LinkAdd} />
        <Route path="/p/:pageId/links/:linkId" component={LinkUpdate} />

        <Route path="/p/:pageId/groups/add" component={GroupAdd} />
        <Route path="/p/:pageId/groups/order" component={GroupsOrder} />
        <Route path="/p/:pageId/groups/:groupId/update" component={GroupUpdate} />
        <Route path="/p/:pageId/groups/:groupId/order" component={LinksOrder} />
        <Route path="/p/add" component={PageAdd} />
        <Route path="/p/:pageId" component={PageDetails} />
        <Route path="/p/:pageId/update" component={PageUpdate} />

        <Route path="/tickets" component={Tickets} />

        <Route path="/encryption" component={Encryption} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/contact" component={Contact} />

        <Route path="/" component={Pages} />
        <Route>{() => <Redirect to="/" />}</Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-in/2fa" component={Verify2FA} />

      <Route path="/p/:pageId" component={PageDetails} />

      <Route path="/encryption" component={Encryption} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />

      <Route path="/" component={Welcome} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;
