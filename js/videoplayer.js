var myVideo = document.getElementById("videoPlayer");
var title = document.getElementById("videoTitle");
var playbtn = document.getElementById("play");
var pausebtn = document.getElementById("pause");
var stopbtn = document.getElementById("stop");
var nextbtn = document.getElementById("next");
var prevbtn = document.getElementById("prev");
var playList = document.querySelectorAll("div.playList figure");
var selfy = document.getElementById("selfie");
var webcam = document.getElementById("webcam");
var wcstart = document.getElementById("wcstart");
var wcstop = document.getElementById("wcstop");
var download = document.getElementById("aa");
var webcamStream, ctx, data;
var current = 0;

navigator.getUserMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

videoList = ["media/Bored To Death - blink-182.mp4", "media/blink-182 - Always.mp4", 
"media/Box Car Racer - I Feel So.mp4", "media/Box Car Racer - There Is.mp4", "media/blink-182 - Not Now.mp4"];
videoTitle = ["Bored To Death", "Always", "I Feel So", "There Is", "Not Now"];

myVideo.type = "video/mp4";
myVideo.poster = "img/btdb182.jpg";

//Functions
function sub() {
  var trk = document.createElement("track");
  trk.src = "sub/Bored To Death - blink-182.en.vtt";
  myVideo.appendChild(trk);
  trk.kind = "subtitles";
  trk.default = true;
  trk.srclang = "en";
}

function playVid() {
  myVideo.src = videoList[current];
  myVideo.play();
  title.innerHTML = videoTitle[current];
  if (current === 0) {
    sub();
  }
}

function pauseVid() {
  myVideo.pause();
}

function stopVid() {
  myVideo.currentTime = 0;
  myVideo.pause();
}

function nextVid() {
  current++;
  if (current >= 0 && current < videoList.length) {
    myVideo.src = videoList[current];
    myVideo.play();
    title.innerHTML = videoTitle[current];
  } else {
    current = 0;
    myVideo.src = videoList[current];
    title.innerHTML = videoTitle[current];
    myVideo.play();
  }
}

function prevVid() {
  current--;
  if (current >= 0 && current < videoList.length) {
    myVideo.src = videoList[current];
    myVideo.play();
    title.innerHTML = videoTitle[current];
  } else {
    current = videoList.length - 1;
    myVideo.src = videoList[current];
    title.innerHTML = videoTitle[current];
    myVideo.play();
  }

}

pList = function (e) {
  switch (e.target.id) {
    case ("btd"):
      current = 0;
      myVideo.src = videoList[current];
      title.innerHTML = videoTitle[current];
      playVid();
      break;
    case ("alw"):
      current = 1;
      myVideo.src = videoList[current];
      title.innerHTML = videoTitle[current];
      playVid();
      break;
    case ("ifs"):
      current = 2;
      myVideo.src = videoList[current];
      title.innerHTML = videoTitle[current];
      playVid();
      break;
    case ("ti"):
      current = 3;
      myVideo.src = videoList[current];
      title.innerHTML = videoTitle[current];
      playVid();
      break;
    case ("nn"):
      current = 4;
      myVideo.src = videoList[current];
      title.innerHTML = videoTitle[current];
      playVid();
      break;
  }
};

function startStream() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true, audio:false}, 
    function(localMediaStream) {
      webcam.src = window.URL.createObjectURL(localMediaStream);
      webcamStream = localMediaStream.getTracks()[0];
    }, 
  error);
  }
}

function error (err) {
  console.log("Error: " + err);
}

function stopWebcam() {
  webcamStream.stop();
}

function init() {
  ctx = selfy.getContext("2d");
}

function selfie() {
  selfy.className = "create";
  init();
  ctx.drawImage(webcam, 0, 0, selfy.width, selfy.height);
  data = selfy.toDataURL("image/png");
  download.href = data;
  setTimeout(function () {
    selfy.removeAttribute("class")
    }, 
    15000);
}

//Buttons
playbtn.addEventListener("click", playVid, false);
pausebtn.addEventListener("click", pauseVid, false);
stopbtn.addEventListener("click", stopVid, false);
nextbtn.addEventListener("click", nextVid, false);
prevbtn.addEventListener("click", prevVid, false);
wcstart.addEventListener("click", startStream, false);
wcstop.addEventListener("click", stopWebcam, false);
download.addEventListener("click", selfie, false);
myVideo.addEventListener("ended", nextVid, false);

document.querySelector("div.playList").addEventListener("click", pList, false);
