const firstDiv = document.getElementsByClassName("ProductDetails ImgLeft");
const standardSize = 100;
const suggestionsSize = standardSize * 3; // by default: standardSize = 100px
const imgSize = standardSize;


HOST = 'http://10.100.6.154:5000'

if (firstDiv) {
    // SUSTAINABLE ALTERNATIVES TEXT -------------------
    const susAltText = document.createElement("div");
    firstDiv.item(0).appendChild(susAltText);
    susAltText.setAttribute('style', 'margin-top: 30px; font-family: sans-serif; font-size: 2em');
    susAltText.innerHTML = 'Sustainable alternatives';
    // -------------------------------------------------


    const suggestionsDiv = document.createElement("div");
    firstDiv.item(0).appendChild(suggestionsDiv);


    suggestionsDiv.setAttribute('style', `height: ${suggestionsSize} px; margin: 10px 0px 0px 0px; display: flex; flex-direction: row;`);

    const prodSpecs = document.getElementsByClassName("InfoArea New")[0]
    const product_id =
        document.getElementsByClassName("ProductNo DisplayBlock SmallTopMargin")[0].textContent
            .replaceAll("Tuotenro:", "").trim()

    addReturnButton(product_id)

    // const name = 'Kuumavalssattu%201D%20RST%20levy%2012.0x1500x3000mm'
    fetch(`${HOST}/get_info?id=${product_id}`, {method: "GET"})
        .then(res => res.json())
        .then(res => {
            const product_info = res[0]
            const co2Em = res[0]['CO2eff']

            const emissionsView = document.createElement("p")
            // todo multiply by amount
            emissionsView.innerText = "Total emissions: " + co2Em + " kg CO2e / kg"

            fetch(`${HOST}/get_alternatives?id=${product_id}`, {method: "GET"})
                .then(res => res.json())
                .then(res => {
                    const averageSus = Math.round(res[1]['avg_eff_score']*100)
                    const prosCons = res[1];

                    // ADDING SUGGESTIONS -------------------------------------------------------
                    add_suggestions(res, suggestionsDiv, product_info)
                    // --------------------------------------------------------------------------


                    const productInfoDiv = document.getElementsByClassName("InfoArea New")[0];

                    addSusScore(Math.round(res[0]['eff_score']*100), productInfoDiv, averageSus)

                    addProperties(prodSpecs, prosCons)

                })
        })


}

function add_suggestions(res, suggestionsDiv, product_info) {
    for (let i = 1; i < res.length; i++) {
        const energy = res[i]['Energy']
        const water = res[i]['Water']
        const CO2 = res[i]['CO2eff']
        const susArrayPre = new Map([["Energy", energy],["Water", water],["CO2eff", CO2]]);
        var susArrayPost = new Map([]);

        susArrayPre.forEach(function(value, key) {
            if (value > 0)
                susArrayPost.set(key,value)
        })

        let min = [...susArrayPost][0]
        susArrayPost.forEach(function(value, key) {
            if (value < min[1])
                min = [key,value]
        })

        const minValue = min[0]

        const suggestionDiv = document.createElement("div");

        const topLeftTag = document.createElement("div");
        suggestionDiv.appendChild(topLeftTag)
        topLeftTag.setAttribute('style', 'float: left; background: white; position: absolute; display: flex; flex-direction: row; border-style: solid; border-radius: 30px; margin-left: -20px; padding: 2px 5px 2px 5px; border-width: 2px;')

        const plusSus = document.createElement("div");
        const altScore = Math.round(res[i]['eff_score']*100)
        const prodScore = Math.round(res[0]['eff_score']*100)
        const scoreDiff = Math.abs(altScore-prodScore)

        if (prodScore > altScore)
            plusSus.innerHTML = `-${scoreDiff}`;
        else
            plusSus.innerHTML = `+${scoreDiff}`;
        plusSus.style.paddingRight = "px"

        const susIcon = document.createElement("img");
        susIcon.src = "https://insightarch.com/wp-content/uploads/2015/04/sustainability.png"
        susIcon.setAttribute('style', 'max-height: 20px; padding-left: 2px;')

        topLeftTag.appendChild(plusSus);
        topLeftTag.appendChild(susIcon)

        if (prodScore < altScore)
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
        imgImg.src = res[i]['Images'];
        imgImg.setAttribute('style', 'padding: 5px 5px 5px 5px; max-height: 90px;');


        // Description of the suggestion ----------------------------------------
        const namePriceDiv = document.createElement("a");
        const emissionsDiv = document.createElement("div");

        namePriceDiv.classList.add("namePrice");
        emissionsDiv.classList.add("emissions");

        descriptionDiv.appendChild(namePriceDiv);
        descriptionDiv.appendChild(emissionsDiv);

        namePriceDiv.setAttribute('style', 'height: ' + descriptionDiv.offsetHeight / 2 + 'px; margin: 5px 5px 5px 5px; cursor: pointer;');
        namePriceDiv.innerHTML = res[i]['Names'];
        namePriceDiv.href = res[i]['Urls']

        emissionsDiv.setAttribute('style', 'height: ' + descriptionDiv.offsetHeight / 2 + 'px; margin: 0px 5px 5px 5px; text-align: center; display: flex; flex-direction: column;');
        const emissionsSpan = document.createElement("span");
        const priceSpan = document.createElement("span");
        emissionsDiv.appendChild(emissionsSpan);
        emissionsDiv.appendChild(priceSpan);
        emissionsSpan.setAttribute('style', 'background: #A9C938; display: block; width: max-content; margin: 0 auto; border-radius: 30px; padding: 0px 5px 0px 5px');
        
        const treeIcon = document.createElement("img")
        treeIcon.src = "https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png"
        treeIcon.style.maxHeight = "20px"

        const houseIcon = document.createElement("img")
        houseIcon.src = "https://equalrightscenter.org/wp-content/uploads/house-icon-1.png"
        houseIcon.style.maxHeight = "20px"

        const bottleIcon = document.createElement("img")
        bottleIcon.src = "https://tse4.mm.bing.net/th?id=OIP.Nkj_5eAzoR_Cl9cMEEZ2_wHaHa&pid=Api"
        bottleIcon.style.maxHeight = "20px"

        const bottleIcon2 = document.createElement("img")
        bottleIcon2.src = "https://tse4.mm.bing.net/th?id=OIP.Nkj_5eAzoR_Cl9cMEEZ2_wHaHa&pid=Api"
        bottleIcon2.style.maxHeight = "20px"

        const energyIcon = document.createElement("img")
        energyIcon.src = "https://cdn.onlinewebfonts.com/svg/img_428473.png"
        energyIcon.style.maxHeight = "20px"

        const energyIcon2 = document.createElement("img")
        energyIcon2.src = "https://cdn.onlinewebfonts.com/svg/img_428473.png"
        energyIcon2.style.maxHeight = "20px"

        console.log(res[i])
        
        if (minValue == "CO2eff") {
            const treesAmount = document.createElement("span")
            treesAmount.innerHTML = `${Math.round(Math.abs(res[i]['Trees']))}`
            const CO2Amount = document.createElement("span")
            CO2Amount.innerHTML = ` = ${CO2} CO2/kg`
            emissionsSpan.appendChild(treesAmount)
            emissionsSpan.appendChild(treeIcon)
            emissionsSpan.appendChild(CO2Amount)
        } else if (minValue == "Energy") {
            const yearlyEnergy = document.createElement("span")
            yearlyEnergy.innerHTML = `yearly `
            const houseAmount = document.createElement("span")
            houseAmount.innerHTML = ` of ${Math.abs(res[i]['Energy'])}`
            const savedEnergy = document.createElement("span")
            savedEnergy.innerHTML = ` = ${Math.abs(res[i]['Homes']).toFixed(2)} mJ/kg of `
            const energySaved = document.createElement("span")
            energySaved.innerHTML = ` saved`
            emissionsSpan.appendChild(yearlyEnergy)
            emissionsSpan.appendChild(energyIcon)
            emissionsSpan.appendChild(houseAmount)
            emissionsSpan.appendChild(houseIcon)
            emissionsSpan.appendChild(savedEnergy)
            emissionsSpan.appendChild(energyIcon2)
            emissionsSpan.appendChild(energySaved)
        } else {
            const litres = document.createElement("span")
            litres.innerHTML = `${Math.abs(res[i]['Bottle'])} litres of `
            const savedWater = document.createElement("span")
            savedWater.innerHTML = ` saved = ${res[i]['Water']} L/kg less `
            const usage = document.createElement("span")
            usage.innerHTML = ` usage`
            emissionsSpan.appendChild(litres)
            emissionsSpan.appendChild(bottleIcon)
            emissionsSpan.appendChild(savedWater)
            emissionsSpan.appendChild(bottleIcon2)
            emissionsSpan.appendChild(usage)
        }


        const productPrice = Number(res[0]['Prices']);
        const altPrice = Number(res[i]['Prices']);

        if (productPrice > altPrice)
            priceSpan.innerHTML = `-${Math.round(Math.abs(altPrice - productPrice))} €`
        else
            priceSpan.innerHTML = `+${Math.round(Math.abs(altPrice - productPrice))} €`


    }
}

function addSusScore(score, productInfoDiv, averageSus) {
    const susScoreAndAverage = document.createElement("div");
    susScoreAndAverage.setAttribute('style', 'display: flex; flex-direction: column;float: right;')

    const susScore = document.createElement('div');
    susScoreAndAverage.appendChild(susScore)

    susScore.setAttribute("style",
        `float: right; margin-left: 30px; 
                            margin-top: ${document.getElementsByClassName("InfoArea New")[0].children[0].clientHeight/2-15}px;
                            text-align: center; display: flex; flex-direction: row; margin-right: -70px;`);
    const susScoreNum = document.createElement('h1');
    susScoreNum.setAttribute('style', 'color: #A9C938; font-size: 3em;');

    var aboveBelow = "above"

    if (score < averageSus) {
        susScoreNum.style.color = "#C93624"
        aboveBelow = "below"
    }
    susScoreNum.innerText = score;
    susScore.appendChild(susScoreNum);

    const susScoreImg = document.createElement("img");
    susScoreImg.src = "https://insightarch.com/wp-content/uploads/2015/04/sustainability.png";
    susScoreImg.setAttribute("style", "max-height: 4.5em; margin: -10px 0px 0px 10px")

    susScore.appendChild(susScoreImg);

    productInfoDiv.parentElement.insertBefore(susScoreAndAverage, productInfoDiv);


    const aboveAverage = document.createElement('div');
    susScoreAndAverage.appendChild(aboveAverage)
    aboveAverage.setAttribute('style', 'display: block; color: #A9C938;');

    if (score < averageSus) {
        aboveAverage.style.color = "#C93624"
    }

    var percentageSus = Math.round(Math.abs((1-(score/averageSus))*100))

    aboveAverage.innerHTML = `${percentageSus}% ${aboveBelow} average`;

}


function addProperties(prodSpecs, prosCons) {
    const specsTitle = document.createElement("div")
    prodSpecs.appendChild(specsTitle)
    specsTitle.setAttribute('style', 'margin-top: -30px')
    specsTitle.innerHTML = "Properties of the material"

    const specs = document.createElement("div");
    prodSpecs.appendChild(specs)
    specs.setAttribute('style', 'display: flex; flex-direction: row; width: 100%;')

    const positives = document.createElement("div");
    const negatives = document.createElement("div");
    specs.appendChild(positives);
    specs.appendChild(negatives);
    positives.setAttribute('style', 'display: block; float: left; width: 50%;')
    negatives.setAttribute('style', 'display: block; float: right; width: 50%;')

    const pos1 = document.createElement("p");
    const pos2 = document.createElement("p");
    const con1 = document.createElement("p");
    const con2 = document.createElement("p");

    positives.appendChild(pos1)
    positives.appendChild(pos2)
    negatives.appendChild(con1)
    negatives.appendChild(con2)

    pos1.setAttribute('style', 'font-size: 0.9em; color: #A9C938;');
    pos2.setAttribute('style', 'font-size: 0.9em; color: #A9C938;');
    con1.setAttribute('style', 'font-size: 0.9em; color: #C93624;');
    con2.setAttribute('style', 'font-size: 0.9em; color: #C93624;');

    pos1.innerHTML = `•  ${prosCons['pro_1']}`
    pos2.innerHTML = `•  ${prosCons['pro_2']}`
    con1.innerHTML = `•  ${prosCons['con_1']}`
    con2.innerHTML = `•  ${prosCons['con_2']}`

}

function addReturnButton(product_id) {
    const addButton = document.getElementsByName("AddToBasket")[0]
    addButton.setAttribute("style", "width: 49%;")
    const returnButton = document.createElement("button")
    returnButton.className = "ep-js  AddToBasketButton ep-uiInput-big ep-uiInput ep-uiInput-button"
    returnButton.innerText = "palata"
    returnButton.setAttribute("style", "float: right; width: 49%; background: #A9C938 !important;")
    addButton.parentElement.insertBefore(returnButton, addButton)

    returnButton.onclick = function () {
        localStorage.setItem("product_id", product_id)
        localStorage.setItem("amount", document.getElementsByName("Quantity")[0].value)
    }
}
