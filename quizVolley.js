// +++++++++++++++++++++++++++++++++++++++++++++++++
// ------------------  VARIABLES  ----------------
// +++++++++++++++++++++++++++++++++++++++++++++++++

// 3 parties du quiz (accueil, questions, résultats)
const home = document.querySelector('.home');
const quiz = document.querySelector('.quiz');
const result = document.querySelector('.result');

// les boutons
const btnStart = document.querySelector('.home button');
const btnNext = document.querySelector('.quiz .btnNext');
const btnEnd = document.querySelector('.result .btnEnd');

// les parties du quiz (numéro de question, question, propositions)
const numberQuestion = document.querySelector('.numberQuestion');
const textQuestion = document.querySelector('.textQuestion');
const propQuestions = document.querySelector('.propositions');

// les résultats
const resultCorrect = document.querySelector('.resultCorrect');
const resultWrong = document.querySelector('.resultWrong');
const resultScore = document.querySelector('.resultScore');
const resultPercentage = document.querySelector('.resultPercentage');
const noReponse = document.querySelector('.noReponse');

// compteur pour les questions
let counterQuestion = 0;
// compteur pour les propositions
let counterProp = 0;


// Array des propositions
let arrayProp = [];


// score final
let scoreRepCorrect = 0;
let scoreRepWrong = 0;


// +++++++++++++++++++++++++++++++++++++++++++++++++
// ------------------  FONCTIONS  ----------------
// +++++++++++++++++++++++++++++++++++++++++++++++++


// au chargement de la page, seule la partie accueil apparait (les parties quiz et résultat sont cachées)
window.onload = onloadQuiz();
function onloadQuiz(){
    home.style.display = 'inherit';
    quiz.style.display = 'none';
    result.style.display = 'none';
}




// +++++++++++++++++++++++++++++++++++++++++++++++++
// récupérer les propositions dans un Array
function arrayPropositions(){
    for (let i = 0; i < 5; i++){
        arrayProp.push(arrayQuiz[i].prop)
    }
}
arrayPropositions();




// +++++++++++++++++++++++++++++++++++++++++++++++++
// le bouton "commencer"
btnStart.addEventListener('click', startQuiz); 
btnStart.style.cursor = 'pointer';
function startQuiz(){
    home.style.display = 'none';
    quiz.style.display = 'inherit';
    result.style.display = 'none'; 
    nextQuestion();
}




// +++++++++++++++++++++++++++++++++++++++++++++++++
// le bouton "suivant"  -----  passer à la question suivante   ----- afficher la page des résultats après la dernière question
btnNext.addEventListener('click', nextQuestion);
btnNext.style.cursor = 'pointer';
function nextQuestion(){
    //  APRES LA QUESTION 5, PASSER AUX RESULTATS 
    if (counterQuestion === 5){
        home.style.display = 'none';
        quiz.style.display = 'none';
        result.style.display = 'inherit';

        resultCorrect.innerHTML = `Réponses correctes : ${scoreRepCorrect}`;
        resultWrong.innerHTML = `Réponses fausses : ${(scoreRepWrong)}`;
        noReponse.innerHTML = `Sans réponse : ${(5 - (scoreRepCorrect + scoreRepWrong))}`;
        resultScore.innerHTML = `Score : ${scoreRepCorrect} / 5`;
        resultPercentage.innerHTML = `Pourcentage : ${(scoreRepCorrect * 20)}%`;
    } 
    // SINON PASSER A LA QUESTION SUIVANTE
    else {
        // CHANGER LE NUMERO DE LA QUESTION
        let n = counterQuestion + 1;
        numberQuestion.innerHTML = "Question n° " + n;

        // CHANGER LA QUESTION
        textQuestion.innerHTML = arrayQuiz[counterQuestion].question;
        
        // CHANGER LES PROPOSITONS
        // vider la section de la 'div quiz' (supprimer les paragraphes)
        propQuestions.innerHTML = "";
        // recréer des paragraphes
        counterProp = 0;
        while (counterProp < 4){
            // créer les éléments 'p' que l'on stocke dans la variable 'nextOption'
            let nextOption = document.createElement("p");
            // mettre les différentes options dans la variable 'nextOption'
            nextOption.innerHTML = arrayProp[counterQuestion][counterProp];
            // ajouter un 'id' à chaque proposition
            nextOption.id = (counterQuestion + 1) * 10 + counterProp;
            // ajouter les 'p' à la section 'propQuestion'
            propQuestions.appendChild(nextOption);
            propQuestions.style.cursor = 'pointer';
            // compteur qui permrt d'obtenir la proposition suivante
            counterProp++;

            // +++++++++++++++++++++++++++++++++++++++++++++++
            // vérifier la réponse sélectionnée
            nextOption.addEventListener('click', answerTest);
            function answerTest(){
                const id = Number(nextOption.id);
                // si VRAI (vert)
                if (id === arrayQuiz[counterQuestion - 1].rep){
                    nextOption.classList.add('correct');
                    // à chaque bonne réponse, le score augmente de 1
                    scoreRepCorrect++;
                }
                // si FAUX (rouge)  +  montrer la bonne réponse (vert)
                else {
                    nextOption.classList.add('beforeWrong');
                    nextOption.classList.add('wrong');
                    // montrer la réponse correcte (vert)
                    for (let i = 0; i < 4; i++){
                        if (Number(propQuestions.children[i].id) === arrayQuiz[counterQuestion - 1].rep){
                            // propQuestions.children[i].style.backgroundColor = '#008000b3';
                            propQuestions.children[i].classList.add('correct');
                        }
                    }
                    scoreRepWrong++;
                }
                // retirer le pointer pour que l'utilisateur ne puisse pas choisir une autre réponse
                for (let i = 0; i < 4; i++){
                    propQuestions.children[i].style.pointerEvents = 'none';
                }
            }
        }

        // compteur qui permet de passer à la question suivante
        counterQuestion++;
    }
} 




// le bouton "Fin"  -----  qui nous ramène à la page accueil
btnEnd.addEventListener('click', endQuiz);
btnEnd.style.cursor = 'pointer';
function endQuiz(){
    document.location.reload(true);
}
