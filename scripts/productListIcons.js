const infoArea = document.getElementsByClassName("InfoArea");
const mediumColumn = document.getElementsByClassName("ListItemCategoryTable");

if (infoArea) {
    
    for (let i=0; i < infoArea.length; i++) {
        infoArea[i].style.display = "flex";
        // infoArea[i].style.flexDirection = "row";
        // infoArea[i].style.width = "auto";
        // infoArea[i].childNodes[1].setAttribute('style', '');
        const heightSus = infoArea[i].offsetHeight

        infoArea[i].childNodes[1].style.display = "block"
        infoArea[i].childNodes[1].style.width = "100%"

        const sustainabilityScore = document.createElement("div");
        sustainabilityScore.setAttribute('style', `display: block; padding: ${heightSus/4}px; background: #102999;`);
        sustainabilityScore.innerHTML = '106.5fasdfas';

        infoArea[i].appendChild(sustainabilityScore);
    }


}