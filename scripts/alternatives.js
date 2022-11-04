const firstDiv = document.getElementsByClassName("ProductDetails ImgLeft");

if (firstDiv) {
    const addedDiv = document.createElement("div");
    firstDiv.item(0).appendChild(addedDiv);
    addedDiv.setAttribute('style', 'height: 150px; margin-top: 20px; background: red;');
    
    const firstElem = document.createElement("div");
    const firstImg = document.createElement("img");

    const secondElem = document.createElement("div");
    const secongImg = document.createElement("img");

    const thirdElem = document.createElement("div");
    const thirdImg = document.createElement("img");

    const suggestionsArray = new Array(firstElem, secondElem, thirdElem);
    const imgArray = new Array(firstImg, secongImg, thirdImg);
    

    for (let i = 0; i < suggestionsArray.length; i++) {
        addedDiv.appendChild(suggestionsArray[i]);
        suggestionsArray[i].appendChild(imgArray[i])
        suggestionsArray[i].setAttribute('style', 'height: 50px; background: green;');
        suggestionsArray[i].innerHTML = 'hey';
    }
    
}