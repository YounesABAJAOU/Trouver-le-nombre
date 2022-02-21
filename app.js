// Elements du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// Modèle de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

// Fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(to top, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)';
const bgLoose = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';

// Play
const play = () => {

    // nombre aléatoire
    const randomNumber = Math.floor(Math.random() *101);
    const totalVies = 6;
    let vies = totalVies;
    console.log(randomNumber);

    // actualisation à chaque essai - la logique du jeu
    formulaire.addEventListener('submit', (e) =>{
        e.preventDefault(); //empêche l'envoi du formulaire et le rechargement de la page
        const valeurInput = parseInt(input.value); // recuperation de la valeur de l'Input

        if(valeurInput <0 || valeurInput >100) return; // si la valeur de l'Input est inferieur a 0 ou superieur a 100 alors on ne continue pas 

        if(valeurInput === randomNumber){ // si la valeur de l'Input est égale au random number l'utilisateur a gagné 
            body.style.backgroundImage = bgWin; // ca va changer le style du fond d'ecran 
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`; // le message s'affiche 
            rejouerBtn.style.display = "block"; // le bouton "rejouer" s'affiche 
            essayerBtn.setAttribute("disabled", ""); // on desactive le bouton "essayer" lorsqu'on a trouver le bon numero
        }

        if(valeurInput !== randomNumber){ // si la valeur de l'Input est differente du random number
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput -3){ // si la valeur de l'Input est à 2 points ou moins de la valeur du random number
                body.style.backgroundImage = bgBrulant; // le bg change 
                message.textContent = "C'est Brûlant !!!"; // le message change 
            } else if (randomNumber < valeurInput + 6 && randomNumber > valeurInput -6){ // si la valeur de l'Input est à 5 points ou moins de la valeur du random number
                body.style.backgroundImage = bgChaud; // le bg change 
                message.textContent = "C'est Chaud !!!"; // le message change
            } else if (randomNumber < valeurInput + 11 && randomNumber > valeurInput -11){ // si la valeur de l'Input est à 10 points ou moins de la valeur du random number
                body.style.backgroundImage = bgTiede; // le bg change 
                message.textContent = "C'est Tiède !!!"; // le message change
            } else{ // tout le reste 
                body.style.backgroundImage = bgFroid; // le bg change 
                message.textContent = "C'est Froid !!!"; // le message change
            }
            vies--; // si la valeur de l'Input est differente du random number on enleve une vie
            verifyLoose(); // verifier qu'on a perdu
        }
        
        actualiseCoeurs(vies); // appel de la fonction "actualiseCoeurs" qui prend en parametre "vies"


    })

    const verifyLoose = () =>{
        if(vies === 0){ // si on a plus de vie 
            body.style.backgroundImage = bgLoose; // on change le bg
            body.style.color = '#990000'; // on change la couleur du texte en rouge
            essayerBtn.setAttribute("disabled", ""); // on desactive le bouton "essayer"
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}` // affichage du message
            rejouerBtn.style.display = "block"; // apparition du bouton "rejouer"
        }
    }

    const actualiseCoeurs = (vies) => { //fonction "actualiseCoeurs" qui prend en parametre "vies"
        divVies.innerHTML = ""; // on enleve tout le html a l'interieur
        let tableauDeVies = []; // creation du tableau de vies
        for (let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
        }
        for (let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur =>{
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);

    rejouerBtn.addEventListener('click', () => { // lorsqu'on clique sur le bouton "rejouer" on lance une fonction...
        message.style.display = 'none'; // enleve le message 
        document.location.reload(true); // cela recharge la page 
    })

}

play();