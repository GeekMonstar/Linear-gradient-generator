class AppManager {
    box = document.querySelector('#box');
    colorInputsGoups;
    angleInput;
    randomButton;
    copyButton;
    css;
    values = {
        colors: ["#", "#"],
        angle: 0
    };

    constructor(){
        this.colorInputsGoups = [...document.querySelectorAll('.color-input-group')].map((colorInputGroup) => new ColorInputGroup(colorInputGroup));
        this.angleInput = document.querySelector('#angle');
        this.css = document.querySelector('#css');
        this.randomButton = document.querySelector('#random');
        this.copyButton = document.querySelector('#copy');

        this.copyButton.addEventListener('click', (event) => {
            navigator.clipboard.writeText(this.css.textContent);
            event.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';
            event.target.classList.add('bg-green-500');
            setTimeout(() => {
                event.target.innerHTML = '<svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"/></svg>';
                event.target.classList.remove('bg-green-500');
            }, 2000);
        });

        this.angleInput.addEventListener('input', this.handleAngleChange.bind(this));

        this.colorInputsGoups.forEach((colorInputGroup, index) => {
            colorInputGroup.input.addEventListener('input', (event) => {
                this.values.colors[index] = event.target.value;
                this.update();
            });
        });

        this.randomButton.addEventListener('click', this.random.bind(this));
        this.random();
    }

    handleAngleChange(event){
        this.values.angle = event.target.value;
        this.update();
    }

    update(){
        console.log(this.values.angle);
        this.angleInput.value = this.values.angle;
        this.box.style.background = `linear-gradient(${this.values.angle}deg, ${this.values.colors[0]}, ${this.values.colors[1]})`;
        this.colorInputsGoups.forEach((colorInputGroup, index) => {
            colorInputGroup.input.value = this.values.colors[index];
        });
        this.css.textContent = `linear-gradient(${this.values.angle}deg, ${this.values.colors[0]}, ${this.values.colors[1]})`;
    }
    
    random(){
        this.values.colors = this.values.colors.map((color) => {
            let c = "#";
            const charString = "0123456789ABCDEF";
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.trunc(Math.random() * 16);
                c += charString[randomIndex];
            }
            console.log(c);
            return c;
        });
        this.values.angle = Math.trunc(Math.random() * 360);
        this.update();
    }
}

class ColorInputGroup {
    input = null;
    label = null;

    constructor(colorInputGroup){
        this.input = colorInputGroup.querySelector('input');
        this.label = colorInputGroup.querySelector('label');
    }
}