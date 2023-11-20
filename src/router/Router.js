import React from 'react';
import { Redirect, Route, Switch } from 'wouter';
import { Spinner } from '../pico-components/Spinner';
import HorizontalCenter from '../shared/react-pure/HorizontalCenter';
import ChangePassword from '../shared/react/ChangePassword';
import Security from '../shared/react/Security';
import Setup2FA from '../shared/react/Setup2FA';
import SignIn from '../shared/react/SignIn';
import SignUp from '../shared/react/SignUp';
import Verify2FA from '../shared/react/Verify2FA';
import Account from '../views/Account';
import GroupAdd from '../views/GroupAdd';
import GroupUpdate from '../views/GroupUpdate';
import GroupsOrder from '../views/GroupsOrder';
import LinkAdd from '../views/LinkAdd';
import LinkUpdate from '../views/LinkUpdate';
import LinksOrder from '../views/LinksOrder';
import PageAdd from '../views/PageAdd';
import PageDetails from '../views/PageDetails';
import PageUpdate from '../views/PageUpdate';
import Pages from '../views/Pages';
import PagesOrder from '../views/PagesOrder';
import Pricing from '../views/Pricing';
import Tickets from '../views/Tickets';
import TryIt from '../views/TryIt'
import Welcome from '../views/Welcome';

function Router({ isCheckingRefreshToken, isLoggedIn, isLoadingSettings, tried, isExpired }) {
  if (isCheckingRefreshToken || isLoadingSettings) {
    return (
      <HorizontalCenter justify="center" margin="3rem 0 0">
        <Spinner large />
      </HorizontalCenter>
    );
  }

  if (isLoggedIn) {
    if (!tried) {
      return <TryIt />;
    }

    if (isExpired) {
      return (
        <Switch>
          <Route path="/account" component={Account} />
          <Route path="/security" component={Security} />
          <Route path="/security/2fa" component={Setup2FA} />
          <Route path="/security/password" component={ChangePassword} />
  
          <Route path="/p/:pageId" component={PageDetails} />
  
          <Route path="/tickets" component={Tickets} />
          <Route path="/pricing" component={Pricing} />
  
          <Route path="/" component={Pages} />
          <Route>{() => <Redirect to="/" />}</Route>
        </Switch>
      );
    }

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
        <Route path="/p/order" component={PagesOrder} />
        <Route path="/p/:pageId" component={PageDetails} />
        <Route path="/p/:pageId/update" component={PageUpdate} />

        <Route path="/tickets" component={Tickets} />
        <Route path="/pricing" component={Pricing} />

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
      <Route path="/pricing" component={Pricing} />

      <Route path="/" component={Welcome} />
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

export default Router;
