import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { IsAnonymous, IsLoggedIn, IsAdmin, LoginWrapper } from '@src/utils/auth';
import App from '@src/containers/App';
import {
    LoginContainer, SignUpContainer, UserProfileContainer, UserUpdateContainer,
    ProductTableContainer, ProductDetailContainer, ProductUpdateContainer,
    Error404Container,
} from '@src/containers/screens';

export default (
    <Route path="/" component={App}>

        <IndexRedirect to="products" />

        <Route path="me" component={IsLoggedIn(UserProfileContainer)} />

        <Route path="me/update" component={IsLoggedIn(UserUpdateContainer)} />

        <Route path="login" component={LoginWrapper(LoginContainer)} />

        <Route path="sign-up" component={IsAnonymous(SignUpContainer)} />

        <Route path="products" component={ProductTableContainer} />

        <Route path="products/:productId" component={ProductDetailContainer} />

        <Route path="products/:productId/update" component={IsLoggedIn(IsAdmin(ProductUpdateContainer))} />

        <Route path="*" component={Error404Container} />

    </Route>
);
