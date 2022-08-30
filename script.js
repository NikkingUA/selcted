

const selectElement = document.getElementById('select-range');
// const input = document.getElementById('input');
const input = document.querySelector('.input');
const btnShow = document.getElementById('show');
const btnRandom = document.getElementById('random');
const placeForRender = document.getElementById('place-for-render');
const error = document.querySelector('.error');

// btnShow.addEventListener('click', () => console.log(selectElement.value, input.value));

console.log(selectElement.value);
function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    if (selectElement.value === 'year') {
        randomValue = year;
    } else if (selectElement.value === 'date') {
        randomValue = { day, month }
    }
}

function mathRandomNumber() {
    randomValue = Math.floor(Math.random() * 3000)
}
function triviaRandomNumber() {
    randomValue = Math.floor(Math.random() * 1300)
}

const renderRandom = () => {

    if (selectElement.value === 'year' || selectElement.value === 'date') {
        randomDate(new Date(500, 0, 0), new Date(2022, 12, 31))
        console.log(randomValue);

    } else if (selectElement.value === 'math') {
        mathRandomNumber();

        console.log(randomValue);
    } else if (selectElement.value === 'trivia') {
        triviaRandomNumber()
        console.log(randomValue);

    }

    const test = selectElement.value === 'date' ? `${randomValue.day}/${randomValue.month}` : randomValue;

    fetch(`http://numbersapi.com/${test}/${selectElement.value}`)
        .then(function (response) {
            responseClone = response.clone(); // 2
            return response.json();
        })
        .then(function (data) {
            // Do something with data
        }, function (rejectionReason) { // 3
            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
            responseClone.text() // 5
                .then(function (bodyText) {
                    placeForRender.innerHTML = `<p>${bodyText}</p>` // 6
                });
        });
};




function renderShow() {

    let valueInput = 1999;
    fetch(`http://numbersapi.com/${input.value}/${selectElement.value}`)
        .then(function (response) {
            responseClone = response.clone(); // 2
            return response.json();
        })
        .then(function (data) {
            // Do something with data
        }, function (rejectionReason) { // 3
            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
            responseClone.text() // 5
                .then(function (bodyText) {
                    placeForRender.innerHTML = `<p>${bodyText}</p>` // 6
                });
        });
}

btnRandom.addEventListener('click', () => {
    renderRandom();
});

btnShow.addEventListener('click', () => {
    if (input.value.trim()) {
        renderShow();
        error.style.display = 'none'
    } else {
        error.innerHTML = 'Insert something in input)))';
        error.style.color = 'red';
    }
});



