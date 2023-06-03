const body = document.body;
const colors = document.querySelectorAll('.color');
const range = document.querySelector('#angle');
const labels = document.querySelectorAll('label');
const angleLabel = document.querySelector('.angle-value');
const randomBtn = document.querySelector('.random-btn');
const copyBtn = document.querySelector('.copy-btn');
let state = {
    color1: '#fd84a8',
    color2: '#449e81',
    angle: 90
}

start();
generateHex();

for (let i = 0; i < colors.length; i++){
    colors[i].addEventListener('input', e => {handleColorChange(e, labels[i])});
}

range.addEventListener('input', handleAngleChange);

randomBtn.addEventListener('click', handleRandom);
copyBtn.addEventListener('click', handleCopy);

function handleColorChange(event, element){
    element.textContent = event.target.value;
    update();
}

function handleAngleChange(event) {
    angleLabel.textContent = `${event.target.value}°`;
    update();
}

function handleRandom() {
    const newColors = generateHex();
    colors[0].value = newColors[0];
    colors[1].value = newColors[1];
    update();
}

function handleCopy(e) {
    const { color1, color2, angle } = state;
    const gradient = `background: linear-gradient(${angle}deg, ${color1}, ${color2})`;
    navigator.clipboard.writeText(gradient);
    e.target.classList.add('active');
    e.target.textContent = 'Copié';
    setTimeout(()=>{
        e.target.classList.remove('active');
        e.target.textContent = 'Copier';
    }, 2000);
}

function start() {
    const { color1, color2, angle } = state;
    colors[0].value = state.color1;
    colors[1].value = state.color2;
    labels[0].textContent = state.color1;
    labels[1].textContent = state.color2;
    range.value = state.angle;
    angleLabel.textContent = state.angle;
    body.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

function update() {
    state = {
        color1: colors[0].value,
        color2: colors[1].value,
        angle: parseInt(range.value)
    }
    colors[0].value = state.color1;
    colors[1].value = state.color2;
    labels[0].textContent = state.color1;
    labels[1].textContent = state.color2;
    const { color1, color2, angle } = state;
    body.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

function generateHex() {
    const charString = '0123456789ABCDEF';
    const hexArray = ['#', '#'];

    for (let i = 0; i < hexArray.length; i++){
        for (let j = 0; j < 6; j++){
            const randomIndex = Math.trunc(Math.random() * 16);
            hexArray[i] += charString[randomIndex];
        }
    }
    return hexArray
}