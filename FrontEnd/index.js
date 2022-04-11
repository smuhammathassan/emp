
//connecting to Moralis
const serverUrl = "https://ayqxx7dwndh1.usemoralis.com:2053/server";
const appId = "YF36G57FjBBdl0BD59EyBTLMS1lvNYIMLQq674sx";
Moralis.start({ serverUrl, appId });

//Fectching the data for new employee. 
let eId = document.getElementById('e-id');
let eName = document.getElementById('e-name');
let eIdR = document.getElementById("e-idR");
let eIdRM = document.getElementById("e-idRM");
document.getElementById("addempform").addEventListener("submit", (e) => e.preventDefault());

let eIdNew;
let eNameNew;
let eIdRNew;
let eIdRMNew;

function fetchInput() {

    eIdNew = eId.value;
    eId.value = null;
    eNameNew = eName.value;
    eName.value = null;
    console.log(eId, eName);
}

function fetchRetriveInput() {
    eIdRNew = eIdR.value;
    eIdR.value = null;
    console.log(eIdRNew)
}

function fetchRemoveInput() {
    eIdRMNew = eIdRM.value;
    eIdRM.value = null;
    console.log(eIdRMNew)
}

//Login button
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

//logout button
async function logOut() {
    await Moralis.User.logOut();
    console.log("Logged Out")
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

function goinTrough() {
    fetchInput();
    //addEmployee(eId, eName)
    loadingdata(eIdNew, eNameNew);
    console.log(eIdNew, eNameNew)

}
function startingFetch() {
    fetchRetriveInput();
    readDataFromSc(eIdRNew);
    console.log("in starting fetch")

}

function startingFetchRM() {
    fetchRemoveInput();
    deleteEmp(eIdRMNew);
    console.log("in starting fetch delete")

}



const ABI = [{ "inputs": [{ "internalType": "uint8", "name": "_empId", "type": "uint8" }, { "internalType": "string", "name": "_name", "type": "string" }], "name": "addEmployee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const add = "0x5fC75C7f7A4A5c74b8B5ee5b43233ca098b76843"
const retriveABI = [{ "inputs": [{ "internalType": "uint8", "name": "_empId", "type": "uint8" }], "name": "retrieve", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]
const deleteABI = [{ "inputs": [{ "internalType": "uint8", "name": "_empId", "type": "uint8" }], "name": "removeEmployee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

async function loadingdata(_eId, _eName) {
    const web3 = await Moralis.enableWeb3();
    try {
        console.log("inside try block");
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
        await transaction.wait();
    } catch (error) {
        console.log(error);
    }
    console.log("No error");
}
document.querySelector('#fetchForm').addEventListener("submit", (e) => e.preventDefault())

async function readDataFromSc(_eIdR) {
    const web3 = await Moralis.enableWeb3();
    console.log("inside fetch function");

    const readOptions = {
        contractAddress: add,
        functionName: "retrieve",
        abi: retriveABI,
        params: {
            _empId: _eIdR,
        }
    }
    console.log("before fatching")
    const message = await Moralis.executeFunction(readOptions);
    let ans = document.getElementById("output");
    ans.innerHTML = "Employee name is " + message;
    console.log(message);
    console.log("at the end of the function");
}



//deleting the employe record
document.querySelector('#DeleteEmp').addEventListener("submit", (e) => e.preventDefault())

async function deleteEmp(_eIdR) {
    const web3 = await Moralis.enableWeb3();
    console.log("inside fetch function");

    const readOptions = {
        contractAddress: add,
        functionName: "removeEmployee",
        abi: deleteABI,
        params: {
            _empId: _eIdR,
        }
    }
    console.log("before fatching")
    const message = await Moralis.executeFunction(readOptions);
    console.log(message);
    console.log("at the end of the function");
}

