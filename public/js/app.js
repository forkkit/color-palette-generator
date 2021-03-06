document.querySelector('main').style.display = 'none';
document.querySelector('.spinner-border').style.display = 'block';
window.onload = function() {
  pickBtn.style.display = 'block';
  setTimeout(function() {
    document.querySelector('.spinner-border').style.display = 'none';
    document.querySelector('.spinner-container').style.height = '0';
    document.querySelector('main').style.display = 'block';
  }, 1000);
};

var pickBtn = document.querySelector('#pickBtn');
pickBtn.addEventListener('click', function() {
  fadeOut(this);
  extractPalette();
  copyToClipboard();
});

function extractPalette() {
  var colorThief = new ColorThief();
  var img = document.querySelector('#image');
  var colors = colorThief.getPalette(img, 8);
  colors.forEach(function(color) {
    var r = color[0];
    var g = color[1];
    var b = color[2];
    var hexR = Number(r)
      .toString(16)
      .toUpperCase();
    var hexG = Number(g)
      .toString(16)
      .toUpperCase();
    var hexB = Number(b)
      .toString(16)
      .toUpperCase();
    var hexColor = '#' + hexR + hexG + hexB;

    var newElement = document.createElement('div');
    newElement.className = 'previewColor';
    newElement.style.backgroundColor = hexColor;
    document.querySelector('#wrapper').appendChild(newElement);
    document.querySelector('#wrapper').classList.add('animated', 'tada');

    isLightOrDark(hexColor) >= 128
      ? (newElement.innerHTML =
          '<span class="colorHex text-black">' + hexColor + '</span>')
      : (newElement.innerHTML =
          '<span class="colorHex text-white">' + hexColor + '</span>');
    document.querySelector('.instruction').style.display = 'block';
  });
}

function isLightOrDark(hexColor) {
  var r = parseInt(hexColor.substr(1, 2), 16);
  var g = parseInt(hexColor.substr(3, 2), 16);
  var b = parseInt(hexColor.substr(4, 2), 16);
  var luminance = (r * 299 + g * 587 + b * 114) / 1000;
  return luminance;
}

function copyToClipboard() {
  var previewDivs = document.querySelectorAll('.previewColor');
  previewDivs.forEach(function(previewDiv) {
    previewDiv.addEventListener('click', function() {
      var aux = document.createElement('input');
      aux.setAttribute('value', this.innerText);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
      alert(this.innerText + ' is copied to clipboard');
    });
  });
}

function fadeOut(el) {
  el.style.WebkitTransition = 'visibility .5s, opacity .5s';
  el.style.opacity = '0';
  el.style.visibility = 'hidden';
}
