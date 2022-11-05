const firstDiv = document.getElementsByClassName("ProductDetails ImgLeft");
const standardSize = 100;
const suggestionsSize = standardSize * 3; // by default: standardSize = 100px
const imgSize = standardSize;


HOST = 'http://10.84.110.213:5000'

if (firstDiv) {
    // SUSTAINABLE ALTERNATIVES TEXT -------------------
    const susAltText = document.createElement("div");
    firstDiv.item(0).appendChild(susAltText);
    susAltText.setAttribute('style', 'margin-top: 30px; font-family: sans-serif; font-size: 2em');
    susAltText.innerHTML = 'Sustainable alternatives';
    // -------------------------------------------------


    const suggestionsDiv = document.createElement("div");
    firstDiv.item(0).appendChild(suggestionsDiv);

    // const firstSugg = document.createElement("div");
    // const firstImg = document.createElement("img");
    //
    // const secondSugg = document.createElement("div");
    // const secongImg = document.createElement("img");
    //
    // const thirdSugg = document.createElement("div");
    // const thirdImg = document.createElement("img");
    //
    // const suggestionsArray = [firstSugg, secondSugg, thirdSugg]; // an array of all the suggestions
    // const imgArray = [firstImg, secongImg, thirdImg]; // an array of all the images of suggestions


    suggestionsDiv.setAttribute('style', `height: ${suggestionsSize} px; margin: 10px 0px 0px 0px; display: flex; flex-direction: row;`);

    const prodSpecs = document.getElementsByClassName("InfoArea New")[0]
    const name = prodSpecs.children[0].textContent

    // const name = 'Kuumavalssattu%201D%20RST%20levy%2012.0x1500x3000mm'
    fetch(`${HOST}/get_info?name=${encodeURIComponent(name)}`, {method: "GET"})
        .then(res => res.json())
        .then(res => {
            const product_info = res[0]
            const co2Em = res[0]['Co2Em']
            const emissionsView = document.createElement("p")
            // todo multiply by amount
            emissionsView.innerText = "Total emissions: " + co2Em + " kg CO2e / kg"

            fetch(`${HOST}/get_alternatives?name=${name}`, {method: "GET"})
                .then(res => res.json())
                .then(res => {

                    // ADDING SUGGESTIONS -------------------------------------------------------
                    add_suggestions(res, suggestionsDiv, product_info)
                    // --------------------------------------------------------------------------------


                    // const tagNames = document.getElementsByClassName("ReferencePrice AlignLeft");

                    // if (tagNames) {
                    //     const tagsDiv = document.createElement("div");
                    //     tagNames.item(0).appendChild(tagsDiv);
                    //     tagsDiv.setAttribute('style', 'height: 50px; background: red; margin: 5px 0px 10px 0px; display: flex; flex-direction: row;');

                    //     const tag1 = document.createElement("div");
                    //     tag1.innerHTML = "Non-hazardous";

                    //     const tag2 = document.createElement("div");
                    //     tag2.innerHTML = "100% recyclable";

                    //     const tags = [tag1, tag2];

                    //     for (let i = 0; i < tags.length; i++) {
                    //         tagsDiv.appendChild(tags[i]);
                    //         tags[i].setAttribute('style', 'height: 40px; background: blue; margin: 5px 5px 5px 5px; vertical-align: middle;');
                    //     }


                    // }



                    const productInfoDiv = document.getElementsByClassName("InfoArea New")[0];

                    addSusScore(134, productInfoDiv)

                    addProperties(prodSpecs)

                })
        })


}

function add_suggestions(res, suggestionsDiv, product_info) {
    for (let i = 0; i < res.length; i++) {
        const suggestionDiv = document.createElement("div");

        const topLeftTag = document.createElement("div");
        suggestionDiv.appendChild(topLeftTag)
        topLeftTag.setAttribute('style', 'float: left; background: white; position: absolute; display: flex; flex-direction: row; border-style: solid; border-radius: 30px; margin-left: -20px; padding: 2px 5px 2px 5px; border-width: 2px;')
        
        const plusSus = document.createElement("div");
        const altScore = res[0]['sustainabilityScore']
        const prodScore = product_info['sustainabilityScore']
        const scoreDiff = Math.abs(altScore-prodScore)

        if (prodScore> altScore)
            plusSus.innerHTML = `-${scoreDiff}`;
        else 
            plusSus.innerHTML = `+${scoreDiff}`;
        plusSus.style.paddingRight = "px"

        const susIcon = document.createElement("img");
        susIcon.src = "https://insightarch.com/wp-content/uploads/2015/04/sustainability.png"
        susIcon.setAttribute('style', 'max-height: 20px; padding-left: 2px;')

        topLeftTag.appendChild(plusSus);
        topLeftTag.appendChild(susIcon)

        suggestionsDiv.appendChild(suggestionDiv); // To container for all 3 suggestions, add each suggestion div
        suggestionDiv.setAttribute('style', 'height: ' + imgSize + 'px; display: flex; flex-direction: row; overflow: hidden; margin-right: 10px;');

        const imgDiv = document.createElement("div"); // div for suggestion image
        const imgImg = document.createElement("img"); // suggestion image
        const descriptionDiv = document.createElement("div"); // div for name, price, etc

        imgDiv.setAttribute('style', 'height: 100%;');
        descriptionDiv.setAttribute('style', 'display: flex; flex-direction: column;');

        suggestionDiv.appendChild(imgDiv);
        suggestionDiv.appendChild(descriptionDiv); // add the two divs to each suggestion

        imgDiv.appendChild(imgImg)
        imgImg.src = res[i]['ImageURL'];
        imgImg.setAttribute('style', 'padding: 5px 5px 5px 5px; max-height: 90px;');


        // Description of the suggestion ----------------------------------------
        const namePriceDiv = document.createElement("div");
        const emissionsDiv = document.createElement("div");

        namePriceDiv.classList.add("namePrice");
        emissionsDiv.classList.add("emissions");

        descriptionDiv.appendChild(namePriceDiv);
        descriptionDiv.appendChild(emissionsDiv);

        namePriceDiv.setAttribute('style', 'height: ' + descriptionDiv.offsetHeight / 2 + 'px; margin: 5px 5px 5px 5px;');
        namePriceDiv.innerHTML = res[i]['Name'];

        emissionsDiv.setAttribute('style', 'height: ' + descriptionDiv.offsetHeight / 2 + 'px; margin: 0px 5px 5px 5px; text-align: center; display: flex; flex-direction: column;');
        const emissionsSpan = document.createElement("span");
        const priceSpan = document.createElement("span");
        emissionsDiv.appendChild(emissionsSpan);
        emissionsDiv.appendChild(priceSpan);
        emissionsSpan.setAttribute('style', 'background: #A9C938; display: block; width: max-content; margin: 0 auto; border-radius: 30px; padding: 0px 5px 0px 5px');
        emissionsSpan.innerHTML = `-${res[i]['Co2Em']} CO2e kg`;

        const productPrice = Number(product_info['Price'].slice(0, product_info['Price'].length - 3));
        const altPrice = Number(res[i]['Price'].slice(0, res[i]['Price'].length - 3));


        if (productPrice > altPrice)
            priceSpan.innerHTML = `-${Math.round(Math.abs(altPrice - productPrice))} €`
        else
            priceSpan.innerHTML = `+${Math.round(Math.abs(altPrice - productPrice))} €`

        
        

    }
}

function addSusScore(score, productInfoDiv) {
    const susScoreAndAverage = document.createElement("div");
    susScoreAndAverage.setAttribute('style', 'display: flex; flex-direction: column;float: right;')

    const susScore = document.createElement('div');
    susScoreAndAverage.appendChild(susScore)

    susScore.setAttribute("style",
        `float: right; margin-left: 30px; 
                            margin-top: ${document.getElementsByClassName("InfoArea New")[0].children[0].clientHeight/2-15}px;
                            text-align: center; display: flex; flex-direction: row; margin-right: -70px;`);
    const susScoreNum = document.createElement('h1');
    susScoreNum.setAttribute('style', 'color: #A9C938; font-size: 3em;')
    susScoreNum.innerText = score;
    susScore.appendChild(susScoreNum);

    const susScoreImg = document.createElement("img");
    susScoreImg.src = "https://insightarch.com/wp-content/uploads/2015/04/sustainability.png";
    susScoreImg.setAttribute("style", "max-height: 4.5em; margin: -10px 0px 0px 10px")

    susScore.appendChild(susScoreImg);

    productInfoDiv.parentElement.insertBefore(susScoreAndAverage, productInfoDiv);


    const aboveAverage = document.createElement('div');
    susScoreAndAverage.appendChild(aboveAverage)
    aboveAverage.setAttribute('style', 'display: block; color: #A9C938; margin-right: -60px');
    aboveAverage.innerHTML = "5% above average";

}


function addProperties(prodSpecs) {
    const specsTitle = document.createElement("div")
    prodSpecs.appendChild(specsTitle)
    specsTitle.setAttribute('style', 'margin-top: -30px')
    specsTitle.innerHTML = "Properties of the material"

    const specs = document.createElement("div");
    prodSpecs.appendChild(specs)
    specs.setAttribute('style', 'display: flex; flex-direction: row;')
    
    const positives = document.createElement("div");
    const negatives = document.createElement("div");
    specs.appendChild(positives);
    specs.appendChild(negatives);

    positives.innerHTML = "positives here"
    negatives.innerHTML = "negatives here"

    specs.setAttribute('style', 'background: red;')
    
    
    

}