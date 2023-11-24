export default class VideoCanvasManager {
    /** @type {HTMLVideoElement} */
    #elem;
    #listenerSet = false;

    constructor(videoCanvas){
        if(!(videoCanvas instanceof HTMLVideoElement)){
            throw new TypeError("Argument 1 of VideoCanvasManager() must be of type HTMLVideoElement! '" + videoCanvas?.constructor?.name + "' given.")
        }
        
        this.#elem = videoCanvas
    }



    setVideoDataStream(stream){
        if(!this.#listenerSet){
            this.#listenerSet = true;
            this.#elem.addEventListener("loadedmetadata", this.#onVideoMetadataLoaded)
        }

        this.#elem.srcObject = stream;
    }


    updatePosition(data){
        this.#elem.style.width = data.screenWidth + "px";
        this.#elem.style.height = data.screenHeight + "px";
        this.#elem.style.transform = "translate(-" + data.windowX + "px, -" + data.windowY + "px) scaleX(-1)";
    }



    #onVideoMetadataLoaded(){
        this.play();
    }
}