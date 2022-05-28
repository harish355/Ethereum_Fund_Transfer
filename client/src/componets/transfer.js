// import {Outlet,Link} from 'react-router-dom';    
import React, { useState } from 'react';
import FundTransfer from '../scripts/FundTransfer';

function Transfer({web3,accounts}){
    // const message="Hello"
    const [privateKey,setPrivatekey]=useState('426eef80d75dc7e3a1dbe7ced91bc25a4b9fba544b387175249b1fc3736d1f13');

    const [toAddress,setToaddress]=useState('0x141fB68ddDD49323ff30371d02A7d0971bCFfC66');

    const [amount,setAmount]=useState('1');

    const [status,setStatus]=useState('');

    const changePrivateKey=(event)=>{
        setPrivatekey(event.target.value);
    }

    const changeAddress=(event)=>{
        setToaddress(event.target.value);
    }

    const changeAmount=(event)=>{
        setAmount(event.target.value);
    }

    const clearAll=()=>{
        setPrivatekey('');
        setToaddress('');
        setAmount('');
    }
    const Transfer= ()=>{
        let promise=FundTransfer(web3,accounts,privateKey,toAddress,amount)
        // setStatus("Loading")
        promise.then(
            ()=>{
                setStatus(" Successful Transaction")
                clearAll();
            },
            ()=>{
                setStatus(" Failure")
            }
        )

    }

 
    return(
        <div>
            <center>
                <h1>Transfer Page </h1>
                <p>Your address: {accounts}</p>
                <p> <span>Enter PrivateKey:    </span>  
                    <input type="text" value={privateKey} onChange={changePrivateKey} />
                </p>
                <p>To: <input type="text" value={toAddress} onChange={changeAddress} /></p>

                <p>Amount: <input type="text" placeholder='Enter In Ether' value={amount} onChange={changeAmount} /></p>
                
                <button onClick={Transfer}>Submit</button>

                <p>Message:{status}</p>

            </center>
        </div>
    )
}

export default Transfer;