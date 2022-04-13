
//connecting to Moralis
const serverUrl = "https://ayqxx7dwndh1.usemoralis.com:2053/server";
const appId = "YF36G57FjBBdl0BD59EyBTLMS1lvNYIMLQq674sx";
Moralis.start({ serverUrl, appId });

const add = "0x5fC75C7f7A4A5c74b8B5ee5b43233ca098b76843"
const ABIs = [
    [{ "inputs": [{ "internalType": "uint8", "name": "_empId", "type": "uint8" }, { "internalType": "string", "name": "_name", "type": "string" }], "name": "addEmployee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
    [{ "inputs": [{ "internalType": "uint8", "name": "_empId", "type": "uint8" }], "name": "retrieve", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }],
    [{ "inputs": [{ "internalType": "uint8", "name": "_empId", "type": "uint8" }], "name": "removeEmployee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
]

let loginFunc = document.getElementById("btn-login")
let logoutFunc = document.getElementById("btn-logout")
let addEmp = document.getElementById("add-btn");
let retriveEmp = document.getElementById("retrive-btn");
let deleteEmp = document.getElementById("delete-btn");

addEmp.addEventListener("click", async () => {
    let eId = document.getElementById('e-id');
    let eName = document.getElementById('e-name');
    const web3 = await Moralis.enableWeb3();
    const sendOptions = {
        contractAddress: add,
        functionName: "addEmployee",
        abi: ABIs[0],
        params: {
            _empId: eId.value,
            _name: eName.value,
        },
    }
    eId.value = null
    eName.value = null
    const transaction = await Moralis.executeFunction(sendOptions);
    console.log(transaction.hash);
    await transaction.wait();

})

retriveEmp.addEventListener("click", async () => {
    let eIdR = document.getElementById("e-idR");
    const web3 = await Moralis.enableWeb3();
    const readOptions = {
        contractAddress: add,
        functionName: "retrieve",
        abi: ABIs[1],
        params: {
            _empId: eIdR.value,
        }
    }
    eIdR.value = null
    const message = await Moralis.executeFunction(readOptions);
    let ans = document.getElementById("output");
    ans.innerHTML = "Employee name is " + message;
})

deleteEmp.addEventListener("click", async () => {
    let eIdRM = document.getElementById("e-idRM");
    const web3 = await Moralis.enableWeb3();
    const readOptions = {
        contractAddress: add,
        functionName: "removeEmployee",
        abi: ABIs[2],
        params: {
            _empId: eIdRM.value,
        }
    }
    eIdRM.value = null
    console.log("before fatching")
    const message = await Moralis.executeFunction(readOptions);
    console.log(message);
})

loginFunc.addEventListener("click", async () => {
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
})

logoutFunc.addEventListener("click", async () => {
    await Moralis.User.logOut();
    console.log("Logged Out")
})

