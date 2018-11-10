const colorTable = document.querySelector('#color');
const inputFrom = document.querySelector('#from');
const inputTo = document.querySelector('#to');
const inputLevel = document.querySelector('#level')
const buttonGenerate = document.querySelector('#generate')

function hexToHSL(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  r = parseInt(result[1], 16);
  g = parseInt(result[2], 16);
  b = parseInt(result[3], 16);
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [  Math.ceil(h * 360), Math.ceil(s * 100), Math.ceil(l * 100), 1];
}


const generateGradientHSLA = (from, to, level = 10) => {
  let gradient = [];
  let color = {}
  let dif = {
    h: to[0] - from[0],
    s: to[1] - from[1],
    l: to[2] - from[2],
    a: to[3] - from[3],
  }
  for (let i = 0; i < level; i++) {
    color = {
      h: from[0] + Math.ceil(dif.h * i / level),
      s: from[1] + Math.ceil(dif.s * i / level),
      l: from[2] + Math.ceil(dif.l * i / level),
      a: (from[3] + (dif.a * i / level)).toFixed(2),
    }
    gradient.push(`hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a} )`)
  }
  gradient.push(`hsla(${to[0]}, ${to[1]}%, ${to[2]}%, ${to[3]} )`)

  return gradient;
}


const createGradient = (from = [100, 100, 100, 1], to = [100, 100, 0, 1], level = 10) => {
  
  const colors = generateGradientHSLA(from, to, level);

  for (let i = 0; i < level; i++) {
    let box = document.createElement('div');
    box.setAttribute('class', 'colorbox');
    box.setAttribute('style', `background-color: ${colors[i]}`);

    box.innerText = `${colors[i]}`
    colorTable.appendChild(box);
  }
}

buttonGenerate.addEventListener("click", () => {
  colorTable.innerHTML = "";
  createGradient( hexToHSL(inputFrom.value),  hexToHSL(inputTo.value), inputLevel.value)
})