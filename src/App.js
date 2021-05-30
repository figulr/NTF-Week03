import React, {useState} from 'react';
import QRcode from 'qrcode.react';
import './App.css';

import * as KlipAPI from './api/UseKlip';
const DEFAULT_QR_CODE = 'DEFAULT';

export default function App() {
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const [newCount, setNewCount] = useState();
  const onClickGetAddress = () =>{
    KlipAPI.getAddress(setQrvalue);
  };
  const onClickSetCount = () =>{
    console.log(newCount)
    KlipAPI.setCount(30, setQrvalue)
  };
  console.log(KlipAPI.readCount());
  // console.log(KlipAPI.readCount(setQrvalue));
  return (
    <div className="App">
      <header className="App-header">
        <h3>KL BETA MARKET</h3>
      </header>
      <div className="App-Content">
        <h4>KLIP Auth</h4>
        <QRcode value={qrvalue}/>
        <button onClick={()=>{onClickGetAddress()}}>GENERATE CODE</button>
      </div>
      <div className="App-Content">
        <h4>KLIP Count Setting</h4>
          <input type="number" placeholder={newCount} onChange={(val)=>{setNewCount(val)}}/>
          <button onClick={()=>{onClickSetCount()}}>SET COUNT</button>
      </div>
    </div>
  );
}
        
        

