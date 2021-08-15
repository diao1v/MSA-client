import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";
import menuStyles from "./menuStyles";
import { useAuthContext } from "../../../context/AuthContext";
import NavUserProfile from "./navUserProfile";

const ListContainer = styled.ul`
  ${tw`
    flex
    list-none
`}
`;

const NavItem = styled.li<{ menu?: any }>`
  ${tw`
    text-xs
    md:text-base
    text-black
    mr-1
    md:mr-5
    cursor-pointer
    transition
    duration-300
    ease-in-out
    hover:text-gray-700
`}
  ${({ menu }) =>
    menu &&
    css`
      ${tw`
    text-white
    text-xl
    mb-3
    focus:text-white
  `}
    `}
`;

const NavItems = () => {
  const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  //const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const { authUser, login, isLogin, logout } = useAuthContext();
  console.log(authUser);

  useEffect(() => {
    const loginMethod = async () => {
      const params = new URLSearchParams(window.location.search);
      let code = params.get("code");
      if (code != null) {
        try {
          const requestBody = {
            query: `
              mutation {
                login(access_code: "${code}")
              }
            `,
          };
          fetch("http://localhost:4000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error("Login Failed");
              }
              return res.json();
            })
            .then((resData) => {
              const loginedUser = JSON.parse(resData.data["login"]);
              if(loginedUser===null){
                throw new Error("No user retrieved from github");
              }
              const AuthUser = {
                userId: loginedUser.id,
                username: loginedUser.username,
                avatar_url: loginedUser.avatar_url,
              };
              login(AuthUser);
              localStorage.setItem("token", loginedUser.jwy_token)
            });
        } catch (err) {
          console.log(err);
        }
      }
    };
    loginMethod();
  }, []);


  const logoutHandler = () => {
    
    logout();
  }
  //const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  // if (isMobile)
  //   return (
  //     <Menu right styles={menuStyles}>
  //       <ListContainer>
  //         <NavItem menu>
  //           <a href="./">Home</a>
  //         </NavItem>
  //         <NavItem menu>Login</NavItem>
  //         <NavItem menu>Post</NavItem>
  //       </ListContainer>
  //     </Menu>
  //   );

  //without token checking
  // return (
  //   <ListContainer>
  //     <NavItem>
  //       <a href="./">Home</a>
  //     </NavItem>

  //     <NavItem>
  //       <a
  //         href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
  //       >
  //         Login
  //       </a>
  //     </NavItem>

  //     <NavItem>Post</NavItem>
  //   </ListContainer>
  // );
  return (
    <ListContainer>
      {isLogin && (
        <NavItem>
          <NavUserProfile
            username={authUser.username}
            avatar_url={authUser.avatar_url}
          />
        </NavItem>
      )}
      {!isLogin && (
        <NavItem>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          >
            Login
          </a>
        </NavItem>
      )}
      {isLogin && <NavItem>Post</NavItem>}
      {isLogin && <NavItem><a href='javascript:void(0)' onClick={logoutHandler}>Logout</a></NavItem>}
    </ListContainer>
  );
};

export default NavItems;