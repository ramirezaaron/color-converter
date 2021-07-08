{
    const pickColor = document.getElementById("pick-color"); 
    const hexColor = document.getElementById("hex-color"); 
 
    const rColorPart = document.getElementById("r-part");
    const gColorPart = document.getElementById("g-part");
    const bColorPart = document.getElementById("b-part");

    const displayColor = document.getElementById("display-color");

    const convertHexToRgb = (hexColor) => {
        hexColor = hexColor.replace("#", ""); 
        var r = 0; 
        var g = 0; 
        var b = 0;

        if(hexColor.length === 6){
            r = parseInt(`${hexColor[0]}${hexColor[1]}`, 16);
            g = parseInt(`${hexColor[2]}${hexColor[3]}`, 16);
            b = parseInt(`${hexColor[4]}${hexColor[5]}`, 16);
        }
        //if(hexColor.length === 3){
        //}
        return {r, g, b}; 
    };

    const fillColorShow = (cssColorValue) => {
        displayColor.style.backgroundColor = cssColorValue;
    }; 

    pickColor.addEventListener("change", (evt) => {
        var selectedColor = evt.target.value;
        console.log(selectedColor);
        hexColor.value = selectedColor;
        var jsonRgb = convertHexToRgb(selectedColor);
        rColorPart.value = jsonRgb.r; 
        gColorPart.value = jsonRgb.g; 
        bColorPart.value = jsonRgb.b;

        fillColorShow(selectedColor);
    });

    hexColor.addEventListener("keyup", (evt) => {
        var hexColor = evt.target.value;
        if(!hexColor)
            return;
        hexColor = hexColor.replace("#", "");

        var hexLength = hexColor.length; 
        var isValid = hexLength === 3 || hexLength === 6; 

        if(!isValid)
            return;

        if(hexLength === 3){
            hexColor = `${hexColor[0]}${hexColor[0]}${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}`;
        }

        hexColor = "#" + hexColor;
        pickColor.value = (hexColor);
        fillColorShow(hexColor);
    });

    const rgbColorChange = (evt) => {
        console.log(evt.target.value); 
    };

    rColorPart.addEventListener("keyup", (evt) => rgbColorChange(evt)); 
    gColorPart.addEventListener("keyup", (evt) => rgbColorChange(evt)); 
    bColorPart.addEventListener("keyup", (evt) => rgbColorChange(evt)); 
}
