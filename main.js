var canvas;

var canvasWidth;

var ctx;

var x;

var y;

var download;

var data;

var fileInput;

var img;

window.onload = function() {
    prepareExample();
};



function prepareExample() {
    img = document.getElementById("default-image");
    var deviceWidth = window.innerWidth;
    canvasWidth = Math.min(600, deviceWidth - 20);
    canvasHeight = Math.min(480, deviceWidth - 20);
    canvas = document.getElementById("memecanvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");
    x = canvas.width / 2 - img.width / 2;
    y = canvas.height / 2 - img.height / 2;
    ctx.drawImage(img, x, y);
    ctx.textAlign = "center";
    ctx.lineWidth = 4;
    ctx.font = "20pt Calibri";
    ctx.fillStyle = "#000";
    ctx.fill();
    doTransform();
    fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", function(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.rect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = $("#background-color").val();
                ctx.fill();
                // // add linear gradient
                // var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                // // light blue
                // grd.addColorStop(0, '#8ED6FF');   
                // // dark blue
                // grd.addColorStop(1, '#8ED6FF');
                // ctx.fillStyle = grd;
                // ctx.fill();
                document.getElementById("scale").value = 1;
                document.getElementById("rotate").value = 0;
                x = canvas.width / 2 - img.width / 2;
                y = canvas.height / 2 - img.height / 2;
                ctx.drawImage(img, x, y);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    }, false);
    var controls = document.getElementById("controls");
    scale = document.getElementById("scale");
    scale.addEventListener("change", doTransform, false);
    rotate = document.getElementById("rotate");
    rotate.addEventListener("change", doTransform, false);
    position = document.getElementById("position");
    position.addEventListener("change", doPosition, false);
    download = document.getElementById("img-download");
    download.addEventListener("click", prepareDownload, false);
}

function doPosition() {
    x = document.getElementById("position").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    y = canvas.height / 2 - img.height / 2;
    doColors();
    ctx.drawImage(img, x, y);
    doTransform();
}

function doTransform() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Translate to center so transformations will apply around this point
    ctx.translate(canvas.width / 2, canvas.height / 2);
    // Perform scale
    var val = document.getElementById("scale").value;
    ctx.scale(val, val);
    // Perform rotation
    val = document.getElementById("rotate").value;
    ctx.rotate(val * Math.PI / 180);
    // Reverse the earlier translation
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    // Finally, draw the image
    doColors();
    ctx.drawImage(img, x, y);
    ctx.restore();
    text = document.getElementById("custom-text").value;
    //ctx.strokeText(text, canvas.width/2 , canvas.height - canvas.height/4 );
    //ctx.fillText(text, canvas.width/2 , canvas.height - canvas.height/4 );
    wrapText(ctx, text, canvas.width / 2, canvas.height - canvas.height / 4.5, canvasWidth - canvasWidth / 3, 30);

}

function prepareDownload() {
    var data = canvas.toDataURL();
    download.href = data;
}

// Modified from http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

function doColors() { 

   ctx.rect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle =  $("#background-color").val();
    ctx.fill();

  
}

$("#background-color").change(function(){
 doColors();
  
  ctx.drawImage(img, x, y);
  doTransform()
  
});

