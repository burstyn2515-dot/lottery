const connectBtn = document.getElementById("connectWalletBtn");
const walletStatus = document.getElementById("walletStatus");
const balanceDiv = document.getElementById("userBalance");

connectBtn.addEventListener("click", connectWallet);

async function connectWallet() {

    if (typeof window.ethereum === "undefined") {
        alert("MetaMask not installed!");
        return;
    }

    try {
        // Запрос подключения
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        const account = accounts[0];
        walletStatus.innerText = "Wallet: " + account;

        // Получаем баланс
        const balanceWei = await window.ethereum.request({
            method: "eth_getBalance",
            params: [account, "latest"]
        });

        const balanceEth = parseInt(balanceWei, 16) / 1e18;

        balanceDiv.innerText = "Balance: " + balanceEth.toFixed(4) + " ETH";

        console.log("Connected:", account);

    } catch (error) {
        console.error(error);
    }
}