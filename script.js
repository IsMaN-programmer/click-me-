document.addEventListener("DOMContentLoaded", function () {
    const cardInfoContainer = document.querySelector(".card-info");
    const homeSection = document.getElementById("home");
    const sumSection = document.getElementById("sum");
    const paymentSection = document.getElementById("payment");
    const checkSection = document.getElementById("check");
    const historySection = document.getElementById("historySection");
    const historyList = document.getElementById("historyList");
    const historyBtn = document.getElementById("historyBtn");
    const clearHistoryBtn = document.getElementById("clearHistory");
    const backToHomeBtn = document.getElementById("backToHome");

    if (!localStorage.getItem("paymentHistory")) {
        const gulchekhraChecks = [
            {
                name: "Gulchekhra Akbarova",
                card: "9860 0901 0680 2458",
                amount: "21 000 сум",
                time: "20 октября 2025, 8:48"
            },
            {
                name: "Gulchekhra Akbarova",
                card: "9860 0901 0680 2458",
                amount: "48 000 сум",
                time: "20 октября 2025, 13:28"
            },
            {
                name: "Gulchekhra Akbarova",
                card: "9860 0901 0680 2458",
                amount: "18 000 сум",
                time: "21 октября 2025, 8:25"
            },
            {
                name: "Gulchekhra Akbarova",
                card: "9860 0901 0680 2458",
                amount: "85 000 сум",
                time: "21 октября 2025, 13:39"
            },
            {
                name: "Gulchekhra Akbarova",
                card: "9860 0901 0680 2458",
                amount: "88 000 сум",
                time: "22 октября 2025, 12:07"
            },
            {
                name: "Gulchekhra Akbarova",
                card: "9860 0901 0680 2458",
                amount: "21 000 сум",
                time: "23 октября 2025, 8:41"
            },
            {
                name: "Gulchekhra Akbarova",
                card: "9860 0901 0680 2458",
                amount: "261 000 сум",
                time: "23 октября 2025, 13:21"
            },
            {
                name: "Gulchekhra Akbarova",
                card: "9860 0901 0680 2458",
                amount: "365 000 сум",
                time: "24 октября 2025, 13:38"
            }
        ];

        const randomChecks = [
            {
                name: "Madina Raxmatova",
                card: "5641 5890 4860 8230",
                amount: "18 000 сум",
                time: "20 октября 2025, 13:00"
            },
            {
                name: "Yusupov Asadaullo",
                card: "5641 5890 4860 8230",
                amount: "22 500 сум",
                time: "20 октября 2025, 17:30"
            },
            {
                name: "Sardor Ismanov",
                card: "5641 5890 4860 8230",
                amount: "24 500 сум",
                time: "20 октября 2025, 19:48"
            },
            {
                name: "Zaynidiyev Aziz",
                card: "5641 5890 4860 8230",
                amount: "27 000 сум",
                time: "21 октября 2025, 18:30"
            },
            {
                name: "Murshidov Otabek",
                card: "5641 5890 4860 8230",
                amount: "36 000 сум",
                time: "21 октября 2025, 18:30"
            },
            {
                name: "Madina Raxmatova",
                card: "5641 5890 4860 8230",
                amount: "19 000 сум",
                time: "22 октября 2025, 08:45"
            },
            {
                name: "Madina Raxmatova",
                card: "5641 5890 4860 8230",
                amount: "19 000 сум",
                time: "23 октября 2025, 09:45"
            },
            {
                name: "Lutfulla Murtazayeva",
                card: "5641 5890 4860 8230",
                amount: "21 000 сум",
                time: "23 октября 2025, 10:20"
            },
            { name: "Usmonov Jasur", card: "5641 5890 4860 8230", amount: "5 000 сум", time: "23 октября 2025, 18:34" },
            {
                name: "Ergashev Saidburhon",
                card: "5641 5890 4860 8230",
                amount: "45 000 сум",
                time: "23 октября 2025, 15:34"
            },
            {
                name: "Sardor Ismanov",
                card: "5641 5890 4860 8230",
                amount: "26 000 сум",
                time: "24 октября 2025, 15:10"
            }
        ];

        const fullHistory = gulchekhraChecks.concat(randomChecks);

        fullHistory.sort((a, b) => {
            const parseDate = (str) => {
                const replaced = str.replace(
                    /(\d{1,2}) октября (\d{4}), (\d{1,2}:\d{2})/,
                    (_, d, y, t) => `October ${d}, ${y} ${t}`
                );
                return new Date(replaced);
            };
            return parseDate(b.time) - parseDate(a.time);
        });

        localStorage.setItem("paymentHistory", JSON.stringify(fullHistory));
    }

    // Открытие формы добавления карты
    document.getElementById("createBtn").addEventListener("click", function (event) {
        event.preventDefault();
        const addCardForm = document.getElementById("addCardForm");
        addCardForm.style.display = addCardForm.style.display === "none" ? "block" : "none";
    });

    // Добавление новой карты
    document.getElementById("addCardBtn").addEventListener("click", function (event) {
        event.preventDefault();
        const cardName = document.getElementById("cardName").value.trim();
        const cardNumber = document.getElementById("cardNumber").value.trim();

        if (cardName && cardNumber) {
            createCardElement(cardName, cardNumber);
            saveCard(cardName, cardNumber);
            document.getElementById("cardName").value = "";
            document.getElementById("cardNumber").value = "";
        } else {
            alert("Введите имя и номер карты!");
        }
    });

    // Загрузка сохранённых карт
    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    savedCards.forEach((card) => createCardElement(card.name, card.number));

    function createCardElement(name, number) {
        const newCard = document.createElement("div");
        newCard.classList.add("card-item");
        newCard.innerHTML = `<label>${name}</label><br />
                             <input type="text" placeholder="${number}" disabled />
                             <button class="green-b">Оплатить</button>
                             <button class="red-b deleteBtn">Удалить</button><br />`;

        cardInfoContainer.appendChild(newCard);

        newCard.querySelector(".deleteBtn").addEventListener("click", function () {
            newCard.remove();
            deleteCard(number);
        });

        newCard.querySelector(".green-b").addEventListener("click", function (event) {
            selectCard(event);
            showSumSection(event);
        });

        newCard.addEventListener("click", function () {
            document.querySelectorAll(".card-info .card-item").forEach((c) => c.classList.remove("selected"));
            newCard.classList.add("selected");
        });
    }

    function saveCard(name, number) {
        const cards = JSON.parse(localStorage.getItem("cards")) || [];
        cards.push({ name, number });
        localStorage.setItem("cards", JSON.stringify(cards));
    }

    function deleteCard(number) {
        let cards = JSON.parse(localStorage.getItem("cards")) || [];
        cards = cards.filter((card) => card.number !== number);
        localStorage.setItem("cards", JSON.stringify(cards));
    }

    function selectCard(event) {
        const cardItem = event.target.closest(".card-item");
        document.querySelectorAll(".card-info .card-item").forEach((c) => c.classList.remove("selected"));
        if (cardItem) {
            cardItem.classList.add("selected");
        }
    }

    function showSumSection(event) {
        event.preventDefault();
        homeSection.style.display = "none";
        sumSection.style.display = "block";
    }

    // Переход к оплате
    document.querySelector(".sum .green-b").addEventListener("click", function (event) {
        event.preventDefault();
        const sumInput = document.querySelector(".sum input").value.trim().replace(/\s+/g, "");
        const selectedCard = document.querySelector(".card-info .selected");

        if (sumInput === "" || isNaN(sumInput)) {
            alert("Введите корректную сумму!");
            return;
        }

        if (!selectedCard) {
            alert("Выберите карту перед оплатой!");
            return;
        }

        const formattedSum = parseInt(sumInput, 10).toLocaleString("ru-RU");
        const cardName = selectedCard.querySelector("label").innerText;

        document.querySelector(".payment h4").innerText = cardName;
        document.querySelector(".payment h1").innerHTML = `${formattedSum} <span>сум</span>`;

        sumSection.style.display = "none";
        paymentSection.style.display = "block";
    });

    // Показ чека
    document.querySelectorAll(".icon").forEach((icon) => {
        icon.addEventListener("click", function () {
            paymentSection.style.display = "none";
            checkSection.style.display = "block";

            const selectedCard = document.querySelector(".card-info .selected");
            const sumText = document.querySelector(".payment h1").innerText;

            if (selectedCard) {
                const recipientCard = selectedCard.querySelector("input").placeholder;
                const recipientName = selectedCard.querySelector("label").innerText;

                document.getElementById("recipientCard").innerText = recipientCard;
                document.getElementById("checkRecipientName").innerText = recipientName;
            }

            document.getElementById("checkAmount").innerText = sumText;
            document.getElementById("totalAmount").innerText = sumText;

            const now = new Date();
            const formattedDate = now.toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });
            const formattedTime = now.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit"
            });

            document.getElementById("transactionTime").innerText = `${formattedDate} ${formattedTime}`;
        });
    });

    // История транзакций
    historyBtn.addEventListener("click", function () {
        homeSection.style.display = "none";
        historySection.style.display = "block";
        renderHistory();
    });

    clearHistoryBtn.addEventListener("click", function () {
        if (confirm("Вы уверены, что хотите очистить историю?")) {
            localStorage.removeItem("paymentHistory");
            renderHistory();
        }
    });

    backToHomeBtn.addEventListener("click", function () {
        historySection.style.display = "none";
        homeSection.style.display = "block";
    });

    function addToHistory(name, card, amount, time) {
        const history = JSON.parse(localStorage.getItem("paymentHistory")) || [];
        history.push({ name, card, amount, time });
        localStorage.setItem("paymentHistory", JSON.stringify(history));
    }

    function renderHistory() {
        historyList.innerHTML = "";
        const history = JSON.parse(localStorage.getItem("paymentHistory")) || [];

        if (history.length === 0) {
            historyList.innerHTML = "<p>История пуста</p>";
            return;
        }

        history.forEach((entry) => {
            const item = document.createElement("div");
            item.innerHTML = `<p><strong>${entry.time}</strong><br />
                              Получатель: ${entry.name}<br />
                              Карта: ${entry.card}<br />
                              Сумма: ${entry.amount}</p><hr />`;
            historyList.appendChild(item);
        });
    }

    // Завершение оплаты
    document.querySelector(".final-b").addEventListener("click", function () {
        const selectedCard = document.querySelector(".card-info .selected");
        const amount = document.querySelector(".payment h1").innerText;
        const name = selectedCard.querySelector("label").innerText;
        const card = selectedCard.querySelector("input").placeholder;
        const now = new Date();
        const time = now.toLocaleString("ru-RU");

        addToHistory(name, card, amount, time); // ✅ сохраняем чек
        renderHistory(); // ✅ обновляем историю, но не показываем

        document.querySelectorAll(".card-info .card-item").forEach((c) => c.classList.remove("selected"));
        paymentSection.style.display = "none";
        homeSection.style.display = "block"; // ✅ возвращаемся на главную
    });

    console.log("Скрипт полностью обновлён и готов!");
});