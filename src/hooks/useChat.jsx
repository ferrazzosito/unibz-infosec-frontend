import { useState, useEffect } from 'react';
import {client as axios} from '../utils/axios'

export function useChat (token) {


    async function postChat(vendorId) {

      let data = {
        "vendorId": vendorId
      };
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/v1/chats/request',
        headers: { 
          'Content-Type': 'application/json',
          "Authorization" : `Bearer ${token}`
        },
        data : JSON.stringify(data)
      };

      return axios.request(config)
      .then(response => response.data )
      .catch(e => {throw new Error("Error while creating the chat: " + e.message)})
    }

    async function requestChat(vendorId) {
      return await postChat(vendorId)
      .then(resp => resp.chatId);
    }


    
    return {requestChat};
}