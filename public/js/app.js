console.log("Clientside JS loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => console.log(data))
// });





const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

let message1 = document.querySelector('#message1');
let message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    message1.textContent = "loading..."
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.errorMessage) {
                message1.textContent = data.errorMessage
            } else {
                message1.textContent = data.lcoation
                message2.textContent = data.forecast
            }
        })
    });

});
