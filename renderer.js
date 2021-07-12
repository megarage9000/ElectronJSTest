button.addEventListener('click', ()=> {
    let data = ["calc.py", input.value];
    window.api.send("toMain", data);
});

// 
button.dispatchEvent(new Event('click'));

window.api.receive('toMain', (data) => {
    console.log("Window received = " , data);
    console.log("data type of recieved args", typeof data);
    // Result of data received is of uint8, need to decode via TextDecoder()
    // - Returns a string
    // - 
    result.textContent = new TextDecoder('utf8').decode(data);
})