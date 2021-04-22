// Bordures Bootstrap

let tableauLigne3 = document.querySelectorAll("#troisiemeLigne > .col-2");
let tableauLigne4 = document.querySelectorAll("#quatriemeLigne > .col-2");

for (let i = 0; i < tableauLigne4.length-1; i++) {  
    tableauLigne3[i].classList.add("border-end", "border-top");
    tableauLigne4[i].classList.add("border-end", "border-top");
}

tableauLigne3[tableauLigne3.length-1].classList.add("border-top");
tableauLigne4[tableauLigne4.length-1].classList.add("border-top");


