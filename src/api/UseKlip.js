import axios from 'axios';
import {COUNT_CONTRACT_ADDRESS} from '../constants/constants.cypress';

const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
const APP_NAME = "KLAY_MARKET";

export const getAddress = (setQrvalue) => {
  axios
    .post(
      A2P_API_PREPARE_URL,
      {
        bapp: {
          name:APP_NAME,
        },
        type: 'auth',
      })
    .then((response)=>{
     const key = response.data.request_key;
     const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${key}`;
      setQrvalue(qrcode);
      let timerId = setInterval(()=>{
        axios
          .get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${key}`)
          .then((response)=>{
            if(response.data.result){
              console.log(`[RESULT] ${JSON.stringigy(response.data.result)}`);
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};

export const setCount = (_count, setQrvalue) => {
  axios
    .post(
      A2P_API_PREPARE_URL,
      {
        bapp : {
          name : APP_NAME,
        },
        type : 'excute_contract',
        transaction : {
          to : COUNT_CONTRACT_ADDRESS,
          abi : "{ \"constant\": false, \"inputs\": [ { \"name\": \"_count\", \"type\": \"uint256\" } ], \"name\": \"setCount\", \"outputs\": [], \"payable\": false, \"stateMutability\": \"nonpayable\", \"type\": \"function\" }",
          value: "0",
          params: "[\"_count\"]",
        },
      }
    )
    .then((response)=>{
     const key = response.data.request_key;
     const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${key}`;
     setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${key}`
          )
          .then((response) => {
            if(response.data.result){
              console.log(`[RESULT] ${JSON.stringigy(response.data.result)}`);
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};

export const readCount = (setQrvalue) => {
  axios
    .post(
      A2P_API_PREPARE_URL,
      {
        bapp : {
          name : APP_NAME,
        },
        type : 'excute_contract',
        transaction : {
          to : COUNT_CONTRACT_ADDRESS,
          abi : '{ \"constant\": true, \"inputs\": [], \"name\": \"count\", \"outputs\": [ { \"name\": \"\", \"type\": \"uint256\" } ], \"payable\": false, \"stateMutability\": \"view\", \"type\": \"function\" }',
          value: "0",
        },
      }
    )
    .then((response)=>{
     const key = response.data.request_key;
     const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${key}`;
     setQrvalue(qrcode);
      let timerId = setInterval(() => {
        axios
          .get(
            `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${key}`
          )
          .then((response) => {
            if(response.data.result){
              console.log(`[RESULT] ${JSON.stringigy(response.data.result)}`);
              clearInterval(timerId);
            }
          });
      }, 1000);
    });
};