export default class SvgCanvasManager {
    /** @type {SVGSVGElement} */
    #elem;

    /** @type {SVGPolygonElement} */
    #polygonElem;

    constructor(svgCanvas, pathStrokeColor = "blue", pathStrokeWidth = 5){
        if(!(svgCanvas instanceof SVGSVGElement)){
            throw new TypeError("Argument 1 of SvgCanvasManager() must be of type SVGSVGElement! '" + svgCanvas?.constructor?.name + "' given.")
        }
        
        this.#elem = svgCanvas;
        this.#polygonElem = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.#polygonElem.setAttribute("fill", "transparent")
        this.#polygonElem.setAttribute("stroke", pathStrokeColor);
        this.#polygonElem.setAttribute("stroke-width", pathStrokeWidth)
        this.#elem.appendChild(this.#polygonElem)
    }
    


    updatePosition(data){
        this.#elem.style.width = data.screenWidth;
        this.#elem.style.height = data.screenHeight;
        this.#elem.style.transform = "translate(-" + data.windowX + "px, -" + data.windowY + "px)";
    }


    setWindowPointData(pointData){
        if(pointData.length < 3){
            this.#polygonElem.setAttribute("points", "")
        }
        else{
            this.#polygonElem.setAttribute("points", this.#getPolygonCoordinatesFromPointData(pointData));
        }
    }



    #getPolygonCoordinatesFromPointData(pointData){
        let strBuilder = "";

        pointData.forEach(point => {
            strBuilder += (point.windowX + Math.round(point.windowWidth / 2)) + " " + (point.windowY + Math.round(point.windowHeight / 2)) + " "
        });

        return strBuilder;
    }
}