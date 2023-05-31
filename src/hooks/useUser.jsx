import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios';
import jwt_decode from "jwt-decode";
import * as React from "react";
import store from 'store';

export const authContext = React.createContext();

export function useUser () {

    const [user, setUser] = useState(undefined);

    // useEffect(() => {

    //   if(user !== undefined)
    //     store.set('user', user);

    //   // console.log("user:" + JSON.stringify(store.get('user')));
    // }, [user]);

    // useEffect(() => {
    //   const userStore = store.get('user');

    //   // console.log(JSON.stringify(userStore));

    //   if (userStore) {
    //    setUser(userStore);
    //   }
    // }, []); 

    const retrieveFromStore = () => {
      
      const userStore = store.get('user');

      if(userStore) {
        setUser(userStore)
      }

    }

    useEffect (retrieveFromStore, [])

    useEffect (() => {
      
      if(user !== undefined)
        store.set('user', user);

    }, [])

    async function log(email, password) {

      let data = {
        "email": email,
        "password": password
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => response.data)
      .catch(e => {throw new Error("Error while registering the user: " + e.message)})
    }

    async function logUser(email, password) {
      await log(email, password)
      .then(async response => {
        
        setUser({
          accessToken : response.accessToken,
          payload: jwt_decode(response.accessToken)
        })
  
      })
    }

    async function register({/*name, lastName, */email, password /*, type*/ }) {

      let data = {
        "email": email,
        "password": password,
        "role" : "customer"
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/auth/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => JSON.stringify(response.data))
      .catch(e => {throw new Error("Error while registering the user: " + e.message)})
    }

    async function registerUser({/*name, lastName, */email, password /*, type*/}) {
      return await register({email, password});
    }

    function logout () {
      setUser({});
    }

    function reload() {
      retrieveFromStore();
    }

    return {user, logUser, registerUser, logout/*, reload*/};

}

// export function AuthProvider({ children }) {
//   const auth = useUser();

//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export default function AuthConsumer() {
//   return React.useContext(authContext);
// }
