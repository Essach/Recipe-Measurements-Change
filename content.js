chrome.runtime.sendMessage("I am loading content script", (response) => {
    // console.log(response);
    // console.log("I am content script");
});

window.onload = (event) => {
    // console.log("page is fully loaded");
};

// console.log("hi");
// const item = document.getElementsByTagName("devsite-language-selector");
// console.log(item);

// console.log(text[182].innerText.includes("cups"));
// console.log(text[182].innerText);
// console.log();

// for (let i = 0; i < text.length; i++) {
//     console.log(text[i].innerText);
// }

// const listItem = text[182];
// if (listItem != undefined) {
//     listItem.innerText = "poopoocaca";
// }

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
measurements.set("cup", [240, "ml"]);

// console.log(measurements.keys());
// const iterator = measurements.keys();
// console.log(iterator.next().value);
// let currentVal = iterator.next().value;
// while (currentVal !== undefined) {
//     console.log(currentVal);
//     currentVal = iterator.next().value;
// }

function changeMeasurement(listItem) {
    const text = listItem.innerText;

    const iterator = measurements.keys();

    let currentVal = iterator.next().value;
    while (currentVal !== undefined) {
        if (text.includes(currentVal)) {
            // console.log(text);
            // console.log(text.indexOf(currentVal));
            const measurementUnit = measurements.get(currentVal)[1];
            const measurementUnitMultiplier = measurements.get(currentVal)[0];
            let sum = 0;
            // console.log(currentVal, measurementUnit);

            const indexOfMeasurement = text.indexOf(currentVal);
            for (let i = indexOfMeasurement - 1; i >= 0; i--) {
                // console.log(text[i]);
                if (text[i] == " ") {
                } else if (fractions.includes(text[i])) {
                    // console.log(i, fractionsToNumbers.get(text[i]), "here");
                    sum =
                        sum +
                        measurementUnitMultiplier *
                            fractionsToNumbers.get(text[i]);
                } else if (/^[+-]?\d+(\.\d+)?$/.test(text[i])) {
                    const n = parseInt(text[i]);

                    sum = sum + measurementUnitMultiplier * n;
                    // console.log(i, n, "here2");
                } else if (text[i] == "/") {
                    // console.log(text[i - 1], text[i], text[i + 1]);
                    // console.log(sum);
                    if (
                        /^[+-]?\d+(\.\d+)?$/.test(text[i + 1]) &&
                        /^[+-]?\d+(\.\d+)?$/.test(text[i - 1])
                    ) {
                        sum = sum - measurementUnitMultiplier * text[i + 1];
                        sum =
                            sum +
                            measurementUnitMultiplier *
                                (parseInt(text[i - 1]) / parseInt(text[i + 1]));
                    }
                    break;
                } else if (Number.isNaN(text[i])) {
                    break;
                }
            }
            console.log(sum, measurementUnit);
            // const measurementChanged = toString(sum) + " " + measurementUnit;
            // console.log(measurementChanged);
        }
        currentVal = iterator.next().value;
    }
}

const listItems = document.getElementsByTagName("li");
for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    changeMeasurement(listItem);
    // const text = listItem.innerText;

    // const iterator = measurements.keys();

    // let currentVal = iterator.next().value;
    // while (currentVal !== undefined) {
    //     if (text.includes(currentVal)) {
    //         console.log(text);
    //         console.log(text.indexOf(currentVal));
    //     }
    //     currentVal = iterator.next().value;
    // }
}
