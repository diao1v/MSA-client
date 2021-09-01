import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";
import HomePage from "./app/containers/HomePage";
import AuthContext from "./context/AuthContext";
import NavBar from "./app/components/navbar";
import AuthContextProvider from "./context/AuthContext";
import PostsContextProvider from "./context/PostsContext";

const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-row
  `}
`;

const MainContentContaner = styled.div`
  ${tw`
  w-full
  md:w-3/4
  flex
  flex-col
`}
`;

const UserContentContainer = styled.div`
  ${tw`
  hidden
  md:flex
  md:w-1/4
  md:flex-col
`}
`;

const App = () => {
  return (
    <AuthContextProvider>
      <NavBar />
      <AppContainer>
        <MainContentContaner>
          <PostsContextProvider>
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/home" render={() => <HomePage />} />
            </Switch>
          </PostsContextProvider>
        </MainContentContaner>
        <UserContentContainer>user info here</UserContentContainer>
      </AppContainer>
    </AuthContextProvider>
  );
};

export default App;
