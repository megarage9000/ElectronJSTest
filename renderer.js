button.addEventListener('click', ()=> {
    let data = ["calc.py", input.value];
    window.api.send("toMain", data);
});

// 
button.dispatchEvent(new Event('click'));

window.api.receive('toMain', (data) => {
    console.log("Window received = " , data);
    result.textContent = data;
})