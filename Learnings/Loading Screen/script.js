const myImg = document.querySelector(".main");
const myText = document.getElementById("text");


let count = 0;

let setFunc = setInterval(function myCounter() {
    count++;

    if (count > 99) {
        clearInterval(setFunc);
    }
    myText.innerHTML = `${count}%`;
    myText.style.opacity = scale(count, 0, 100, 1, 0);
    myImg.style.filter = `blur(${scale(count, 0, 100, 30, 0)}px)`
}, 30);

const scale = (number, inMin, inMax, outMin, outMax) => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}