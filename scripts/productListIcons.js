const infoArea = document.getElementsByClassName("InfoArea");

if (infoArea) {
    console.log(infoArea[0]);

    for (let i=0; i < infoArea.length; i++) {
        var style =infoArea[0].attr('style')

        infoArea[i].setAttribute('style', 'display: flex; flex-direction: row;');

        const sustainabilityScore = document.createElement("div");
        sustainabilityScore.setAttribute('style', 'background: red;');
        sustainabilityScore.innerHTML = '106.5';

        infoArea[i].appendChild(sustainabilityScore);
    }


}