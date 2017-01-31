import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { IsAnonymous, IsLoggedIn, IsAdmin, LoginWrapper } from '@src/features/auth/utils';
import { App } from '@src/app/containers';
import {
  LoginContainer, SignUpContainer, ForgottenPasswordFormContainer, ResetPasswordFormContainer,
  UserProfileContainer, UserUpdateContainer,
} from '@src/features/auth/containers';
import { ProductListContainer, ProductDetailContainer, ProductCreateContainer, ProductUpdateContainer } from '@src/features/product/containers';
import { Error404Container } from '@src/features/error-404/containers';

export default (
  <Route path="/" component={App}>

    <IndexRedirect to="products" />

    <Route path="products" component={ProductListContainer} />

    <Route path="products/create" component={IsLoggedIn(IsAdmin(ProductCreateContainer))} />

    <Route path="products/:productId" component={ProductDetailContainer} />

    <Route path="products/:productId/update" component={IsLoggedIn(IsAdmin(ProductUpdateContainer))} />

    <Route path="sign-up" component={IsAnonymous(SignUpContainer)} />

    <Route path="auth/login" component={LoginWrapper(LoginContainer)} />

    <Route path="auth/forgotten-password" component={IsAnonymous(ForgottenPasswordFormContainer)} />

    <Route path="auth/reset-password/:passwordResetToken" component={IsAnonymous(ResetPasswordFormContainer)} />

    <Route path="me" component={IsLoggedIn(UserProfileContainer)} />

    <Route path="me/update" component={IsLoggedIn(UserUpdateContainer)} />

    <Route path="*" component={Error404Container} />

  </Route>
);
