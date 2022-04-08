const serverUrl = "https://s2zqdpynorlr.usemoralis.com:2053/server";
const appId = "5ogtNDY2GiDXcN18ZkXJJHuParTFuUEMripUvqZz";
Moralis.start({ serverUrl, appId });

let eId = document.getElementById('e-id')
let eName = document.getElementById('e-name')

function fetchInput() {
    eId = eId.value;
    eName = eName.value;
    console.log(eId, eName)
}

async function login() {
    let user = Moralis.User.current();
    if (!user) {
        try {
            user = await Moralis.authenticate({ signingMessage: "Authenticate" });
            await Moralis.enableWeb3();
            console.log(user);
            console.log(user.get("ethAddress"))
        } catch (error) {
            console.log(error)
        }
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("Logged Out")
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

function goinTrough() {
    fetchInput();
    //addEmployee(eId, eName)
    loadingdata(eId, eName);

}

const ABI = [{ "inputs": [{ "internalType": "uint8", "name": "_empId", "type": "uint8" }, { "internalType": "string", "name": "_name", "type": "string" }], "name": "addEmployee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const add = "0x337B7B6e72eDcD20AC601D005258F94d78e317f8"

async function loadingdata(_eId, _eName) {
    const web3 = await Moralis.enableWeb3();
    try {
        const sendOptions = {
            contractAddress: add,
            functionName: "addEmployee",
            abi: ABI,
            params: {
                _empId: _eId,
                _name: _eName,
            },
        };

        const transaction = await Moralis.executeFunction(sendOptions);
        console.log(transaction.hash);
        // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"

        // Wait until the transaction is confirmed
        await transaction.wait();

        // Read new value
        const message = await Moralis.executeFunction(readOptions);
        console.log(message);
        // --> "Hello Moralis"
    } catch (error) {
        console.log(error)
    }
    console.log("No error")
}

