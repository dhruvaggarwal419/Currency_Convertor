let selectCon = document.querySelectorAll('.dropdown select');
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let message = document.querySelector(".msg");
const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

for (let select of selectCon) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.src = newLink;
}

const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount input');
    let amountValue = amount.value;
    if (amountValue == "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    let newUrl = `${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(newUrl);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    message.innerText = `${amountValue} ${fromCurr.value} = ${rate * amountValue} ${toCurr.value}`;
}

btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})