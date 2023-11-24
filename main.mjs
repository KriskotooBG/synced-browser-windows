import Utils from "./Utils.mjs";
import SvgCanvasManager from "./SvgCanvasManager.mjs";
import VideoCanvasManager from "./VideoCanvasManager.mjs";

const mainTimerInterval = 5; //ms
const gcTimerInterval = 250 //ms

const videoCanvasManager = new VideoCanvasManager(document.querySelector("#videoCanvas"));
const svgCanvasManager = new SvgCanvasManager(document.querySelector("#svgCanvas"));

const windowDataKeyPrefix = "win_";
const windowID = windowDataKeyPrefix + Utils.randomInt("100000", "999999");




async function main(){
	if(!navigator.mediaDevices.getUserMedia){
		alert("No webcam support or unsupported browser.");
	}

	const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false }).catch(alert);
	if(!videoStream){
		alert("Unable to get video stream.");
	}

	videoCanvasManager.setVideoDataStream(videoStream);


	setInterval(mainTimerCallback, mainTimerInterval);
	setInterval(gcTimerCallback, gcTimerInterval)
}
main();




function mainTimerCallback(){
	const winData = {
		windowId: windowID,
		lastUpdate: Date.now(),
		windowX: window.screenX,
		windowY: window.screenY,
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
		screenWidth: window.screen.width,
		screenHeight: window.screen.height
	}


	setLocalStorageWindowData(winData);
	videoCanvasManager.updatePosition(winData);

	svgCanvasManager.updatePosition(winData);
	svgCanvasManager.setWindowPointData(getLocalStorageWindowData())
}



function gcTimerCallback(){
	getLocalStorageWindowData().forEach(windowObj => {
		if(windowObj.lastUpdate < (Date.now() - (gcTimerInterval * 2))){
			console.log(windowObj.windowId)
			localStorage.removeItem(windowObj.windowId)
		}
	});
}



function getLocalStorageWindowData(){
	return Object.entries(localStorage).filter(entry => entry[0].startsWith(windowDataKeyPrefix)).map(data => JSON.parse(data[1]))
}

function setLocalStorageWindowData(data){
	localStorage.setItem(data.windowId, JSON.stringify(data));
}