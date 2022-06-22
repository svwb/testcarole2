// APPRENTISSAGE DU "SMOOTH SCROLL"

// à quoi servent les 3 points devant 'document' ?
// attribut de propagation qui permettent de développer une expression
// raccourci syntaxique qui donne le privilège d'obtenir une liste à partir d'un tableau
const navLinks = [...document.querySelectorAll('nav a')]
const sections = [...document.querySelectorAll('section')]

// console.log(navLinks);


let sectionsPosition;
// MAP() RENVOIE UN TABLEAU 
// -> DANS CE CAS, UN TABLEAU DES POSITIONS DE CHAQUE SECTION
// ON PLACE CES POSITIONS DANS LA VARIABLE "sectionsPosition" QUE L'ON A DECLAREE CI-DESSUS
function positionCalculation(){
    sectionsPosition = sections.map(section => section.offsetTop);
}
positionCalculation();
/* REMARQUE :
On appelle les éléments du tableau "sections" comme on veut...
Dans ce cas, on les appelle "section", cela a du sens 
car on demande la position supérieure (offsetTop) de chaque section 
du fichier HTML. */



navLinks.forEach(link => link.addEventListener('click', addScrollSmooth));
/* REMARQUE :
On appelle les éléments du tableau "navLinks" comme on veut...
Dans ce cas, on les appelle "link", cela a du sens 
car on demande d'effectuer une fonction (qu'on appelle addScollSmooth) à chaque fois que l'on clique sur un lien. */



function addScrollSmooth(e){
    const linkIndex = navLinks.indexOf(e.target);
    /* console.log(linkIndex); */     /* pourquoi index -1 pour le premier ?? */
    window.scrollTo({
        top: sectionsPosition[linkIndex],
        behavior: "smooth"
    })
}

window.addEventListener('resize', positionCalculation);





