const firstDiv = document.getElementsByClassName("ProductDetails ImgLeft");
const standardSize = 100;


HOST = 'http://10.84.110.213:5000'

if (firstDiv) {
    // SUSTAINABLE ALTERNATIVES TEXT -------------------
    const susAltText = document.createElement("div");
    firstDiv.item(0).appendChild(susAltText);
    susAltText.setAttribute('style', 'margin-top: 30px; font-family: sans-serif; font-size: 2em');
    susAltText.innerHTML = 'Sustainable alternatives';
    // -------------------------------------------------



    const addedDiv = document.createElement("div");
    firstDiv.item(0).appendChild(addedDiv);

    const firstSugg = document.createElement("div");
    const firstImg = document.createElement("img");

    const secondSugg = document.createElement("div");
    const secongImg = document.createElement("img");

    const thirdSugg = document.createElement("div");
    const thirdImg = document.createElement("img");

    const suggestionsArray = [firstSugg, secondSugg, thirdSugg]; // an array of all the suggestions
    const imgArray = [firstImg, secongImg, thirdImg]; // an array of all the images of suggestions

    const suggestionsSize = standardSize * suggestionsArray.size; // by default: standardSize = 100px
    const imgSize = standardSize;

    addedDiv.setAttribute('style', `height: ${suggestionsSize} px; margin: 10px 0px 0px 0px; display: flex; flex-direction: row;`);

    const name = 'Kuumavalssattu%201D%20RST%20levy%2012.0x1500x3000mm'
    fetch(`${HOST}/get_info?name=${name}`, {method: "GET"})
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
                    const alternatives = res
                    console.log(res)


                    // ADDING SUGGESTIONS -------------------------------------------------------
                    for (let i = 0; i < res.length; i++) {
                        addedDiv.appendChild(suggestionsArray[i]); // To container for all 3 suggestions, add each suggestion div
                        suggestionsArray[i].setAttribute('style', 'height: ' + imgSize + 'px; display: flex; flex-direction: row; overflow: hidden; margin-right: 10px;');

                        const imgDiv = document.createElement("div"); // div for suggestion image
                        const rightDiv = document.createElement("div"); // div for name, price, etc

                        imgDiv.setAttribute('style', 'height: 100%;');
                        rightDiv.setAttribute('style', 'display: flex; flex-direction: column;');

                        suggestionsArray[i].appendChild(imgDiv);
                        suggestionsArray[i].appendChild(rightDiv); // add the two divs to each suggestion

                        imgDiv.appendChild(imgArray[i])
                        imgArray[i].src = res[i]['ImageURL'];
                        imgArray[i].setAttribute('style', 'padding: 5px 5px 5px 5px; max-height: 90px;');
                




                        // Description of the suggestion ----------------------------------------
                        const namePriceDiv = document.createElement("div");
                        const emissionsDiv = document.createElement("div");

                        namePriceDiv.classList.add("namePrice");
                        emissionsDiv.classList.add("emissions");

                        rightDiv.appendChild(namePriceDiv);
                        rightDiv.appendChild(emissionsDiv);

                        namePriceDiv.setAttribute('style', 'height: ' + rightDiv.offsetHeight/2 + 'px; margin: 5px 5px 5px 5px;');
                        namePriceDiv.innerHTML = res[i]['Name'];

                        emissionsDiv.setAttribute('style', 'height: ' + rightDiv.offsetHeight/2 + 'px; margin: 0px 5px 5px 5px; text-align: center; display: flex; flex-direction: column;');
                        const emissionsSpan = document.createElement("span");
                        const priceSpan = document.createElement("span");
                        emissionsDiv.appendChild(emissionsSpan);
                        emissionsDiv.appendChild(priceSpan);
                        emissionsSpan.setAttribute('style', 'background: lightgreen; display:inline-block;');
                        emissionsSpan.innerHTML = `-${res[i]['Co2Em']} CO2e kg`;

                        const productPrice = Number(product_info['Price'].slice(0,product_info['Price'].length-3));
                        const altPrice = Number(res[i]['Price'].slice(0,res[i]['Price'].length-3));
                        console.log("product price", productPrice)
                        console.log("alt price", altPrice);


                        if (productPrice > altPrice)
                            priceSpan.innerHTML=`-${Math.round(Math.abs(altPrice-productPrice))}$`
                        else 
                            priceSpan.innerHTML=`+${Math.round(Math.abs(altPrice-productPrice))}$`

                    }
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






                    const sustainabilityInfo = document.getElementsByClassName("InfoArea New");

                    if (sustainabilityInfo) {
                        const susDiv = document.createElement("div");
                        sustainabilityInfo[0].appendChild(susDiv)

                        susDiv.setAttribute('style', 'background; red; height: 20px')
                        susDiv.innerHTML = 'hey';


                            
                        }
                })
        })
    

}