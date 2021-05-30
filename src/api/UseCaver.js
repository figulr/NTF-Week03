import Caver from 'caver-js';

import CounterABI from '../abi/CounterABI.json';
import {ACCESS_KEY_ID, SECRET_ACCESS_KEY, CHAIN_ID, COUNT_CONTRACT_ADDRESS } from '../constants/constants.baobob';

const option = {
  headers:[
    {
      name: "Authorization",
      value:"Basic "+Buffer.from(ACCESS_KEY_ID+":"+SECRET_ACCESS_KEY).toString("base64")
    },
    {
      name:"x-chain-id",
      value:CHAIN_ID
    }
    ]
};

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));

const ContractCount = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address)
  .then((response)=>{
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`getBalance() >> ${balance}`);
    return balance;
  })
}

export const readCount = async () => {
  const _count = await ContractCount.methods.count().call();
  console.log(`readCount() >> ${_count}`);
}

export const setCount = async (newCount) => {
  try{
    // 사용할 account 설정
    const privateKey='0x997f1620741d2a2731cb6d372a43e72c21799555290be230883db9eed7895603';
    // 배포자 확인(?)
    const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
    // 지갑에 추가
    caver.wallet.add(deployer);
    // 스마트 컨트랙트에서 만든 setCount 실행
    const receipt = await ContractCount.methods.setCount(newCount)
      .send({
        from: deployer.address,
        gas: '0x4bfd200'
      });
    console.log(`setCount >> ${receipt}`);
  }
  catch(err){
    console.log(`[ERR_SET_COUNT] >> ${err}`)
  }
}

export const getBlockNumber = async ()=>{
  try{
  // 스마트 컨트랙트에서 만든 getBlockNumber 실행
  const _blockNumber = await ContractCount.methods.getBlockNumber().call();
  console.log(`BlockNumber >> ${_blockNumber}`);
  }
  catch(err){
    console.log(`[ERR_GET_BLOCK_NUMBER] >> ${err}`);
  }
}