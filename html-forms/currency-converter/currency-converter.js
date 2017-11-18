const loader = document.querySelector('#loader');
document.addEventListener('DOMContentLoad',showPreview);
function showPreview() {
    loader.classList.remove('hidden');
}

const contentForm = document.querySelector('#content');
const currencyData = new XMLHttpRequest();
const fromList = document.querySelector('#from');
const toList = document.querySelector('#to');
const inputSource = document.querySelector('#source');
const result = document.querySelector('#result');
currencyData.open('GET', 'https://neto-api.herokuapp.com/currency', true);
currencyData.send();

currencyData.addEventListener('onload', showPreview);

currencyData.addEventListener('load', () => {
    loader.classList.add('hidden');
    contentForm.classList.remove('hidden');
    const currencyArray = JSON.parse(currencyData.responseText);

    let markUp = '';
    for(let i = 0; i < currencyArray.length; i++) {
        markUp += '<option></option>';
    }
    fromList.innerHTML = markUp;
    toList.innerHTML = markUp;

    const fromItems = document.querySelectorAll('#from option');
    const toItems = document.querySelectorAll('#to option');
    currencyArray.forEach((currency, index) => {
        fromItems[index].value = currency.value;
        fromItems[index].label = currency.code;
        toItems[index].value = currency.value;
        toItems[index].label = currency.code;    
    });
});

function convertCurrency() {
    result.innerHTML = Math.round(((fromList.value * inputSource.value / toList.value) / 100) * 100);
}

inputSource.addEventListener('input', convertCurrency);
fromList.addEventListener('input', convertCurrency);
toList.addEventListener('input', convertCurrency);