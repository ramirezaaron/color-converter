{
    const pickColor = document.getElementById("pick-color"); 
    const hexColorInput = document.getElementById("hex-color"); 
 
    const rColorPart = document.getElementById("r-part");
    const gColorPart = document.getElementById("g-part");
    const bColorPart = document.getElementById("b-part");

    const displayColor = document.getElementById("display-color");

    const copyHexButton = document.getElementById("copy-hex");
    const copyRgbButton = document.getElementById("copy-rgb");

    const convertHexToRgb = (hexColor) => {
        hexColor = hexColor.replace("#", ""); 
        var red = 0; 
        var green = 0; 
        var blue = 0;

        if(hexColor.length === 6){
            red = parseInt(`${hexColor[0]}${hexColor[1]}`, 16);
            green = parseInt(`${hexColor[2]}${hexColor[3]}`, 16);
            blue = parseInt(`${hexColor[4]}${hexColor[5]}`, 16);
        }
        //if(hexColor.length === 3){
        //}
        return {red, green, blue}; 
    };

    const fillColorShow = (cssColorValue) => {
        displayColor.style.backgroundColor = cssColorValue;
    }; 

    pickColor.addEventListener("change", (evt) => {
        var selectedColor = evt.target.value;
        hexColorInput.value = selectedColor;
        var jsonRgb = convertHexToRgb(selectedColor);
        rColorPart.value = jsonRgb.red; 
        gColorPart.value = jsonRgb.green; 
        bColorPart.value = jsonRgb.blue;

        fillColorShow(selectedColor);
    });

    hexColorInput.addEventListener("keyup", (evt) => {
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
        pickColor.value = hexColor;

        var jsonRgb = convertHexToRgb(hexColor);
        rColorPart.value = jsonRgb.red; 
        gColorPart.value = jsonRgb.green; 
        bColorPart.value = jsonRgb.blue;

        fillColorShow(hexColor);
    });

    // Check if the value has valid RGB value ([0;255])
    const isValidRgbValue = (value) => {
        if(!value)
            return false; 
        
        let number = parseInt(value);
        return number >= 0 && number <= 255;
    }

    const getRgbValue = () => {
        let r = rColorPart.value; 
        let g = gColorPart.value; 
        let b = bColorPart.value; 

        let red = !r ? 0 : parseInt(r); 
        let green = !g ? 0 : parseInt(g); 
        let blue = !b ? 0 : parseInt(b); 

        return {
            red: isValidRgbValue(red) ? red : 0, 
            green: isValidRgbValue(green) ? green : 0, 
            blue: isValidRgbValue(blue) ? blue : 0, 
        }
    }
        
    const rgbColorChange = (evt) => {
        let val = evt.target.value; 

        if(!isValidRgbValue(val)){
            evt.target.value = "0";
            return;
        }

        var jsonRgb = getRgbValue();
        var redHex = (jsonRgb.red.toString(16));

        if(redHex.length === 1)
            redHex += redHex;

        var greenHex = (jsonRgb.green.toString(16));
        if(greenHex.length === 1)
            greenHex += greenHex;

        var blueHex = (jsonRgb.blue.toString(16));
        if(blueHex.length === 1)
            blueHex += blueHex;
        
        var hexColor = `#${redHex}${greenHex}${blueHex}`
        pickColor.value = hexColor; 
        hexColorInput.value = hexColor; 
        fillColorShow(hexColor); 

        console.log(hexColor); 
    };

    rColorPart.addEventListener("change", (evt) => rgbColorChange(evt)); 
    gColorPart.addEventListener("change", (evt) => rgbColorChange(evt)); 
    bColorPart.addEventListener("change", (evt) => rgbColorChange(evt)); 

    copyHexButton.addEventListener("click", (evt) => {
        navigator.clipboard.writeText(hexColorInput.value).then(() => { 
            copyHexButton.textContent = "Copied";
        });
        setTimeout(() => { copyHexButton.textContent = "copy hex"; }, 3000); 
    });

    copyRgbButton.addEventListener("click", (evt) => {
        var rgbValue = getRgbValue(); 
        var stringRgb = `${rgbValue.red},${rgbValue.green},${rgbValue.blue}`;
        navigator.clipboard.writeText(stringRgb).then(() => { 
            copyRgbButton.textContent = "Copied";
        });
        setTimeout(() => { copyRgbButton.textContent = "copy rgb"; }, 3000); 
    });
}
