console.log('client side js loaded')



const weatherFoem = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherFoem.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = ''
    messageTwo.textContent = ''
    messageThree.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.summary
                messageThree.textContent = data.temperature + ' stopni ^C'
            }
        })
    })
})