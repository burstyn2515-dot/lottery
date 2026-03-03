const connectBtn = document.getElementById("connectWalletBtn");
const walletStatus = document.getElementById("walletStatus");
const balanceDiv = document.getElementById("userBalance");

connectBtn.addEventListener("click", connectWallet);



async function connectWallet() {
    try {

        // Проверяем установлен ли MultiversX DeFi Wallet
        if (!window.multiversx) {
            alert("MultiversXxxx DeFi Wallet not installed!");
            return;
        }

        // Запрашиваем доступ к аккаунтам
        const accounts = await window.multiversx.request({
            method: "connect"
        });

        console.log("Connected accounts:", accounts);

        if (accounts && accounts.length > 0) {
            document.getElementById("walletStatus").innerText =
                "Wallet connected: " + accounts[0];
        }

    } catch (error) {
        console.error("Connection error:", error);
    }
}