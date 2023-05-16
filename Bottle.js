Status = "";
Bottle_image = "";
objects=[];

function preload(){
    Bottle_image = loadImage("Bottle.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
   
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
    console.log(results);
    objects = results;
    }

}

function draw(){
    image(Bottle_image,0,0,640,350);
    
    if (Status != "")
    {
        object_Detector.detect(Bottle_image,gotResults);
        r=Math.random(255);
        g=Math.random(255);
        b=Math.random(255);
        for(i=0; i< objects.length;i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("nof").innerHTML = "There are 6 big objects in the image from which cocossd model has detected  " + objects.length + " objects.";
            fill(r,g,b);
            stroke(r,g,b);    
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y ); 
            noFill();
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height );
           
        }
    }
}