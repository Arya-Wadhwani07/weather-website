const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

// messageOne.textContent='Loading'
// messagetwo.textContent=""

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent='Loading...'
    messagetwo.textContent=''
    // console.log(location)
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(!data.error){
            // console.log(data.forecast)
            // console.log(data.location)
            messageOne.textContent=data.location
            messagetwo.textContent=data.forecast

        } else{
            // console.log(data.error)
            messageOne.textContent = data.error
        }
    })
})

})