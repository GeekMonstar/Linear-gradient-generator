function toHSL(hex) {
var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

var r = parseInt(result[1], 16);
var g = parseInt(result[2], 16);
var b = parseInt(result[3], 16);

r /= 255, g /= 255, b /= 255;
var max = Math.max(r, g, b), min = Math.min(r, g, b);
var h, s, l = (max + min) / 2;

if(max == min){
    h = s = 0; // achromatic
} else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
}

s = s*100;
s = Math.round(s);
l = l*100;
l = Math.round(l);
h = Math.round(360*h);

return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

class AppManager {
    body = document.body;
    box = this.body.querySelector('#box');
    colorInputsGoups = [...this.box.querySelectorAll('.color-group')].map(color => new ColorInputGroup(color));
    values = {
        colors: [],
        angle: 0
    };

    constructor(){
        const charString = '0123456789ABCDEF';
        const hexArray = ['#', '#'];

        hexArray.forEach((hex, index) => {
            for (let j = 0; j < 6; j++){
                const randomIndex = Math.trunc(Math.random() * 16);
                hex += charString[randomIndex];
            }
        });
        this.values.colors = hexArray;
        this.body.style.background = `linear-gradient(${this.values.angle}deg, ${this.values.colors[0]}, ${this.values.colors[1]})`;
        this.box.style.background = `linear-gradient(${this.values.angle}deg, ${this.values.colors[0]}, ${this.values.colors[1]})`;
        this.ColorInputGroup[0].setValue(hexArray[0]);
        this.ColorInputGroup[1].setValue(hexArray[1]);
    }

    initColors(){
        const charString = '0123456789ABCDEF';
        const hexArray = ['#', '#'];

        for (let i = 0; i < hexArray.length; i++){
            for (let j = 0; j < 6; j++){
                const randomIndex = Math.trunc(Math.random() * 16);
                hexArray[i] += charString[randomIndex];
            }
        }
        return hexArray
    };
}

class ColorInputGroup {
    input = null;
    label = null;

    constructor(colorInputGroup){
        this.input = colorInputGroup.querySelector('input');
        this.label = colorInputGroup.querySelector('label');
    }

    setValue(value, callback){
        this.input.value = value;
        this.label.textContent = value;
        this.label.style.backgroundColor = value;
        if (callback) callback();
    }
}
