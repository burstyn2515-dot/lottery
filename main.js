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
        // Проверяем наличие кошелька
        if (!window.elrondWallet) {
            alert("MultiversX Wallet extension not found!");
            return;
        }

        // Запрашиваем подключение к сайту
        await window.elrondWallet.requestLogin();

        // Получаем адрес пользователя
        userAddress = await window.elrondWallet.getAddress();

        if (!userAddress) {
            alert("Wallet connected, but address not found. Make sure it is unlocked.");
            return;
        }

        // Обновляем статус на странице
        document.getElementById("walletStatus").innerText =
            "Wallet: " + userAddress;

        document.getElementById("connectWalletBtn").style.display = "none";

        renderGames();
        updateBalance();

    } catch (error) {
        console.error("Connection error:", error);
        alert("Failed to connect wallet. Make sure it is unlocked and the site is opened via HTTPS.");
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