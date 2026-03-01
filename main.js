const devnetProxy = "https://devnet-gateway.multiversx.com";

const games = [
  { name: "Game1" },
  { name: "Game2" },
  { name: "Game3" },
  { name: "Game4" }
];

let userAddress = null;

document.getElementById("connectWalletBtn").onclick = connectWallet;

async function connectWallet() {
    try {

        // Проверяем загрузился ли SDK
        if (!window.mxSdkDapp) {
            alert("MultiversX SDK not loaded!");
            return;
        }

        // Инициализация SDK
        await window.mxSdkDapp.init();

        // Логин через расширение
        const loginResponse = await window.mxSdkDapp.login();

        userAddress = loginResponse.address;

        if (!userAddress) {
            alert("Address not found.");
            return;
        }

        document.getElementById("walletStatus").innerText =
            "Wallet: " + userAddress;

        document.getElementById("connectWalletBtn").style.display = "none";

        renderGames();
        updateBalance();

    } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect wallet.");
    }
}

async function updateBalance() {
    try {

        const res = await fetch(`${devnetProxy}/address/${userAddress}`);
        const data = await res.json();

        const balance = parseInt(data.account.balance) / 1e18;

        document.getElementById("userBalance").innerText =
            "Balance: " + balance.toFixed(3) + " EGLD";

    } catch (error) {
        console.log("Balance fetch error", error);
    }
}

function renderGames() {

    const container = document.getElementById("gamesContainer");
    container.innerHTML = "";

    games.forEach(game => {

        const div = document.createElement("div");
        div.className = "game";

        div.innerHTML = `
            <h2>${game.name}</h2>
            <p>Players: 0</p>
            <p>Your tickets: 0</p>
            <button>Buy Ticket</button>
        `;

        container.appendChild(div);
    });
}