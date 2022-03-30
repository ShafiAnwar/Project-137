objects = [];
status = "";

function preload() {

}

function setup() {
    canvas = createCanvas(580, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}

function draw() {
    image(video, 0, 0, 580, 400);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            input_text = document.getElementById("input_text").value;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == input_text) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = input_text + "Found";
                var synth = window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(input_text + "found");
                synth.speak(utterthis);
            } else {
                document.getElementById("object_status").innerHTML = input_text +""+ "Not Found";
            }
        }
    }
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start() {

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
    status = true;
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;

}