const infoArea = document.getElementsByClassName("InfoArea");
const mediumColumn = document.getElementsByClassName("ListItemCategoryTable");

if (infoArea) {

    const valuesArray = ["95-96", "83-85", "57-62", "73-80", "25-34", "89-95", "70-78", "22-25"]
    
    for (let i=0; i < infoArea.length; i++) {
        infoArea[i].style.display = "flex";
        // infoArea[i].style.flexDirection = "row";
        // infoArea[i].style.width = "auto";
        // infoArea[i].childNodes[1].setAttribute('style', '');
        const heightSus = infoArea[i].offsetHeight

        infoArea[i].childNodes[1].style.display = "block"
        infoArea[i].childNodes[1].style.width = "100%"

        const sustainabilityScore = document.createElement("div");
        sustainabilityScore.setAttribute('style', `display: flex; flex-direction: row; padding: ${heightSus/4}px; background: #102999; width: auto;`);
        const susScore = document.createElement("div");
        sustainabilityScore.appendChild(susScore);
        susScore.setAttribute('style', 'color: white; float:right; width: 45px')
        susScore.innerHTML = valuesArray[i]
        
        const susImage = document.createElement("img");
        susImage.src = "https://insightarch.com/wp-content/uploads/2015/04/sustainability.png"
        susImage.setAttribute('style', `max-height: ${heightSus/2}px; margin-left: 10px;`)
        sustainabilityScore.appendChild(susImage);
        
        infoArea[i].appendChild(sustainabilityScore);
    }


}