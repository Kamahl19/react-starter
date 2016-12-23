import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { IsAnonymous, IsLoggedIn, IsAdmin, LoginWrapper } from '@src/modules/auth/utils';
import { AppContainer } from '@src/containers/app';
import { LoginContainer, SignUpContainer, UserProfileContainer, UserUpdateContainer } from '@src/modules/auth/containers';
import { ProductTableContainer, ProductDetailContainer, ProductUpdateContainer } from '@src/modules/products/containers';
import { Error404Container } from '@src/modules/error-404/containers';

export default (
    <Route path="/" component={AppContainer}>

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
