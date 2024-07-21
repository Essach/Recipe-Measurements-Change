const fractionsToNumbers = new Map();
fractionsToNumbers.set("¼", 0.25);
fractionsToNumbers.set("½", 0.5);
fractionsToNumbers.set("¾", 0.75);

const fractions = ["¼", "½", "¾"];

const measurements = new Map();
measurements.set("oz", [28, "g"]);
measurements.set("fl oz", [30, "ml"]);
measurements.set("ounce", [28, "g"]);
measurements.set("pound", [454, "g"]);
measurements.set("lb", [454, "g"]);
measurements.set("tbsp", [15, "ml"]);
measurements.set("tablespoon", [15, "ml"]);
measurements.set("tsp", [5, "ml"]);
measurements.set("teaspoon", [5, "ml"]);
measurements.set("cup", [240, "g/ml"]);

function isNumString(n) {
    if (/^[+-]?\d+(\.\d+)?$/.test(n)) {
        return true;
    }
    return false;
}

function changeMeasurement(listItem) {
    let text = listItem.innerText;

    const iterator = measurements.keys();

    let currentVal = iterator.next().value;
    while (currentVal !== undefined) {
        if (text.includes(currentVal)) {
            const measurementUnit = measurements.get(currentVal)[1];
            const measurementUnitMultiplier = measurements.get(currentVal)[0];
            let sum = 0;

            let startIndex = 0;

            let indexOfMeasurement = text.indexOf(currentVal);

            let andDeleted = false;

            if (text.substring(0, indexOfMeasurement).includes("and")) {
                text = text.replace("and", "");
                andDeleted = true;
                console.log(text);
                indexOfMeasurement = text.indexOf(currentVal);
            }

            for (let i = indexOfMeasurement - 1; i >= 0; i--) {
                if (text[i] == " ") {
                    console.log("here1");
                } else if (fractions.includes(text[i])) {
                    sum =
                        sum +
                        measurementUnitMultiplier *
                            fractionsToNumbers.get(text[i]);
                    console.log("here2");
                } else if (isNumString(text[i])) {
                    console.log("here3");
                    let num = text[i];
                    if (isNumString(text[i + 1])) {
                        console.log("here4");
                    } else if (isNumString(text[i - 1])) {
                        console.log("here5");
                        num = text[i - 1].concat(num);
                        if (isNumString(text[i - 2])) {
                            console.log("here6");
                            num = text[i - 2].concat(num);
                        }
                        const n = parseInt(num);
                        sum = sum + measurementUnitMultiplier * n;
                    } else {
                        console.log("here7");
                        const n = parseInt(num);
                        sum = sum + measurementUnitMultiplier * n;
                    }
                } else if (text[i] == "/") {
                    console.log("here8");
                    if (
                        /^[+-]?\d+(\.\d+)?$/.test(text[i + 1]) &&
                        /^[+-]?\d+(\.\d+)?$/.test(text[i - 1])
                    ) {
                        console.log("here9");
                        sum = sum - measurementUnitMultiplier * text[i + 1];
                        sum =
                            sum +
                            measurementUnitMultiplier *
                                (parseInt(text[i - 1]) / parseInt(text[i + 1]));
                    }
                    if (!andDeleted) {
                        console.log("here10");
                        startIndex = i - 1;
                        break;
                    } else {
                        sum = sum - measurementUnitMultiplier * text[i - 1];
                    }
                } else if (
                    Number.isNaN(text[i]) ||
                    text[i - 1] == undefined ||
                    text[i] == "("
                ) {
                    console.log("here11");
                    startIndex = i + 1;
                    break;
                }
            }

            const newText = String(sum).concat(" ", measurementUnit);

            let endIndex = 0;

            let measurementWord = "";
            for (let i = indexOfMeasurement; i < text.length; i++) {
                measurementWord = measurementWord.concat(text[i]);
                if (measurementWord == currentVal) {
                    if (text[i + 1] == "s") {
                        endIndex = i + 1;
                    } else {
                        endIndex = i;
                    }
                }
            }

            const textToReplace = text.substring(startIndex, endIndex + 1);
            const newInnerText = text.replace(textToReplace, newText);

            if (sum > 0) {
                listItem.innerText = newInnerText;
            }
        }
        currentVal = iterator.next().value;
    }
}

const listItems = document.getElementsByTagName("li");
for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    changeMeasurement(listItem);
}
