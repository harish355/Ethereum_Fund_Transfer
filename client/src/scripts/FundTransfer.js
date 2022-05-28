const FundTransfer=(web3,accounts,privateKey1,acc2,amount)=>
new Promise((resolve, reject) => {
    var Tx=require('ethereumjs-tx').Transaction
    var acc1=accounts[0]
    // var privateKey1="426eef80d75dc7e3a1dbe7ced91bc25a4b9fba544b387175249b1fc3736d1f13";
    // var acc2="0x141fB68ddDD49323ff30371d02A7d0971bCFfC66";

    const privateKey1Buffer = Buffer.from(privateKey1, 'hex')
    web3.eth.getTransactionCount(acc1, 
        (error, txCount)=>{
        if(error!=null){
            // alert("Error in Txcount")
            reject("Error");
        }
        else{
            // Build Transaction 
            
                const txObj={
                    nonce:web3.utils.toHex(txCount),
                    to:acc2,
                    value:web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
                    gasLimit:web3.utils.toHex(21000),
                    gasPrice:web3.utils.toHex(web3.utils.toWei('10','gwei')),
                }
                // console.log(txObj)
                // Sign Tx
                const tx = new Tx(txObj)
                tx.sign(privateKey1Buffer)


                const serializedTransaction=tx.serialize()
                const raw='0x'+serializedTransaction.toString('hex')
        
                // Broadcast Tx
                web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
                    console.log("Transaction Hash ",txHash);
                    console.log(err)
                    if(txHash!=undefined)
                    {
                        resolve("OK");
                    }
                    else{
                        reject("Error in Transaction");
                    }
                })

        }
    });
    
});

export default FundTransfer;