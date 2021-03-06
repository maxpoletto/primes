var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var dpi = window.devicePixelRatio;

function fix_dpi() {
    function styleValue(attr) {
        return getComputedStyle(canvas).getPropertyValue(attr).slice(0, -2);
    }
    canvas.setAttribute('width', dpi * styleValue('width'));
    canvas.setAttribute('height', dpi * styleValue('height'));
}

function poly(zx, zy, r, nvert) {
    var d = 2 * Math.PI / nvert;
    var a = -Math.PI/2;
    var x = zx + r*Math.cos(a);
    var y = zy + r*Math.sin(a);
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (i = 0; i < nvert; i++) {
        a += d;
        x = zx + r*Math.cos(a);
        y = zy + r*Math.sin(a);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
}

var nvert;
function draw() {
    var w = canvas.width, h = canvas.height;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    poly(w / 2, h / 2, w / 3, nvert);
}

function updateInfo(da, dp, dr1, dr2) {
    var r = 1;
    var a = Math.PI / nvert;
    var w = r * Math.sin(a);
    var h = r * Math.cos(a);
    var peri = nvert * w * 2;
    var area = nvert * w * h;
    var r1 = area/peri;
    var r2 = peri / (2*r);
    da.innerHTML = area.toFixed(4);
    dp.innerHTML = peri.toFixed(4);
    dr1.innerHTML = r1.toFixed(4);
    dr2.innerHTML = r2.toFixed(4);
}

function init() {
    fix_dpi();
    var s = document.getElementById('nvert');
    var sv = document.getElementById('nv');
    var dispArea = document.getElementById('area');
    var dispPeri = document.getElementById('peri');
    var dispR1 = document.getElementById('ratio1');
    var dispR2 = document.getElementById('ratio2');
    updateInfo(dispArea, dispPeri, dispR1, dispR2);
    s.oninput = function () {
        nvert = this.value;
        sv.innerHTML = nvert;
        updateInfo(dispArea, dispPeri, dispR1, dispR2);
        draw();
    }
    s.oninput();
}

init();
