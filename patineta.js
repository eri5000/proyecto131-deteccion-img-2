objectDetector="";
img="";
objects=[];
status="";

function preload(){
    img=loadImage('Patineta.jpg');
}
function setup(){
    canvas=createCanvas(500,300);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: detectando objectos";
}

function modelLoaded(){
    console.log("Modelo cargado");
    status=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    if(status!=undefined){
        image(img,0,0,500,300);
        for(var i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: objetos detectados";

            fill('#0000FF');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + ' ' + percent + ' %',objects[i].x+5,objects[i].y+15);
            noFill();
            stroke('#0000FF');
            rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
        }
    }
}