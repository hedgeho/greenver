console.log("eobrhnweoi")

const a = document.getElementsByClassName("CategoryText")
let table = document.createElement('table');
table.style.border = 'solid 1px black';
let thead = document.createElement('thead');
thead.style.border = 'solid 1px black';
let tbody = document.createElement('tbody');
tbody.style.border = 'solid 1px black';

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the body tag
a.item(0).appendChild(table);
let row_1 = document.createElement('tr');
row_1.style.border = 'solid 1px black';
let heading_1 = document.createElement('th');
heading_1.innerHTML = "Corrosion Class";
let heading_2 = document.createElement('th');
heading_2.innerHTML = "Typical use";
let heading_3 = document.createElement('th');
heading_3.innerHTML = "Suitable Steel";

heading_1.style.border =  'solid 1px black';
heading_2.style.border =  'solid 1px black';
heading_3.style.border =  'solid 1px black';
row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
thead.appendChild(row_1);


// Creating and adding data to second row of the table
let row_2 = document.createElement('tr');
let row_2_data_1 = document.createElement('td');
row_2_data_1.innerHTML = "C1 (Very Low)";
let row_2_data_2 = document.createElement('td');
row_2_data_2.innerHTML = "Deserts and arctic areas (very low humidity)";
let row_2_data_3 = document.createElement('td');
row_2_data_3.innerHTML = "1.4301, 1.4307, S235JR, 1.4162";
row_2.style.border = 'solid 1px black';
row_2_data_1.style.border =  'solid 1px black';
row_2_data_2.style.border =  'solid 1px black';
row_2_data_3.style.border =  'solid 1px black';
row_2.appendChild(row_2_data_1);
row_2.appendChild(row_2_data_2);
row_2.appendChild(row_2_data_3);
tbody.appendChild(row_2);


// Creating and adding data to third row of the table
let row_3 = document.createElement('tr');
let row_3_data_1 = document.createElement('td');
row_3_data_1.innerHTML = "C2 (Low)";
let row_3_data_2 = document.createElement('td');
row_3_data_2.innerHTML = "Arid or low pollution (rural)";
let row_3_data_3 = document.createElement('td');
row_3_data_3.innerHTML = "1.4301,1.4307, S235JR, 1.4162 ";
row_3.style.border = 'solid 1px black';
row_3_data_1.style.border =  'solid 1px black';
row_3_data_2.style.border =  'solid 1px black';
row_3_data_3.style.border =  'solid 1px black';
row_3.appendChild(row_3_data_1);
row_3.appendChild(row_3_data_2);
row_3.appendChild(row_3_data_3);
tbody.appendChild(row_3);

let row_4 = document.createElement('tr');
let row_4_data_1 = document.createElement('td');
row_4_data_1.innerHTML = "C3 (Medium)";
let row_4_data_2 = document.createElement('td');
row_4_data_2.innerHTML = "Coastal areas with low deposits of salt";
let row_4_data_3 = document.createElement('td');
row_4_data_3.innerHTML = "1.4301,1.4307";
row_4.style.border = 'solid 1px black';
row_4_data_1.style.border =  'solid 1px black';
row_4_data_2.style.border =  'solid 1px black';
row_4_data_3.style.border =  'solid 1px black';
row_4.appendChild(row_4_data_1);
row_4.appendChild(row_4_data_2);
row_4.appendChild(row_4_data_3);
tbody.appendChild(row_4);

let row_5 = document.createElement('tr');
let row_5_data_1 = document.createElement('td');
row_5_data_1.innerHTML = "C4 (High)";
let row_5_data_2 = document.createElement('td');
row_5_data_2.innerHTML = "Polluted urban and industrialised atmosphere";
let row_5_data_3 = document.createElement('td');
row_5_data_3.innerHTML = "Aluminum ALMG3, 1.4462, 1.4401,1.4404";
row_5.style.border = 'solid 1px black';
row_5_data_1.style.border =  'solid 1px black';
row_5_data_2.style.border =  'solid 1px black';
row_5_data_3.style.border =  'solid 1px black';
row_5.appendChild(row_5_data_1);
row_5.appendChild(row_5_data_2);
row_5.appendChild(row_5_data_3);
tbody.appendChild(row_5);

let row_6 = document.createElement('tr');
let row_6_data_1 = document.createElement('td');
row_6_data_1.innerHTML = "C5 (Very High)";
let row_6_data_2 = document.createElement('td');
row_6_data_2.innerHTML = "Severely polluted industrial atmospheres with high humidity";
let row_6_data_3 = document.createElement('td');
row_6_data_3.innerHTML = "Aluminum ALMG3, 1.4462";
row_6.style.border = 'solid 1px black';
row_6_data_1.style.border =  'solid 1px black';
row_6_data_2.style.border =  'solid 1px black';
row_6_data_3.style.border =  'solid 1px black';
row_6.appendChild(row_6_data_1);
row_6.appendChild(row_6_data_2);
row_6.appendChild(row_6_data_3);
tbody.appendChild(row_6);