
/**
 * Cette fonction vérifie que le contenu d'un champ est au bon format, ici qu'un choix de réponse a été fait. 
 * @param {string} reponseATester 
 * @throws {Error}
 */
function validerReponseSondage(reponseATester) {
    if (reponseATester === undefined) {
        throw new Error("Merci de choisir une réponse");
    }
}

/**
 * Cette fonction vérifie que le contenu d'un champ est au bon format, ici qu'il contient au moins deux caractères. 
 * @param {string} champATester 
 * @throws {Error}
 */
function validerString(champATester) {
    if (champATester.value.length < 2) {
        throw new Error(`${champATester.placeholder} est trop court`);
    }
}

/**
 * Cette fonction vérifie que le contenu d'un champ est au bon format, ici que c'est une adresse mail valide. 
 * @param {string} emailATester
 * @throws {Error}
 */
function validerEmail(emailATester) {
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (regex.test(emailATester.value) === false) { //si l'email ne passe pas le test, une erreur est lancée
        throw new Error("Le format d'email n'est pas valide");
    }
}

/**
 * Cette fonction permet d'afficher un message expliquant le champ incorrect en bas de la fenêtre pop-up.
 * Si le span existe déjà, il est réutilisé afin qu'un seul message ne s'affiche
 * @param {string} messageErreur : message qui s'affiche en cas d'erreur
 * @param {string} domParent : nom de l'élément du DOM au bout duquel sera ajouté le message
 */
function afficherMessageErreur(messageErreur, domParent) {
    let spanErreur = document.getElementById(`spanErreur${domParent}`);
    if (!spanErreur) { // si le span n'existe pas, on le crée, sinon on change juste son contenu interne

        let eltParent = document.querySelector(domParent); //récupération de l'élément parent
        spanErreur = document.createElement("span"); //création du span dans lequel s'affichera le message
        spanErreur.id = `spanErreur${domParent}`; //identification du span pour pouvoir le réutiliser si plusieurs essais erronés s'enchaînent
        eltParent.appendChild(spanErreur); //ajout du span à la fin de l'élément parent
    }
    spanErreur.innerText = messageErreur; // dans tous les cas, on change le contenu du message
}

//---Page Index---
//Gestion de l'évènement Change sur les boutons radio du sondage
//Chaque clic entraîne une mise à jour de la réponse au sondage
let listeBtnRadioSondage = document.querySelectorAll(".sondage input");
if (listeBtnRadioSondage) {
    for (let index = 0; index < listeBtnRadioSondage.length; index++) {
        listeBtnRadioSondage[index].addEventListener("change", (event) => {
            reponseSondage = event.target.value
        })
    }
}

//Gestion de la validation du sondage de la page d'accueil
let btnValiderSondage = document.querySelector(".sondage .cta");
let reponseSondage;
if (btnValiderSondage) {
    btnValiderSondage.addEventListener("click", (e) => {
        e.preventDefault()
        let zoneSondage = document.querySelector(".sondage");
        try {
            validerReponseSondage(reponseSondage);
            zoneSondage.innerHTML = `
    <img class="sondage-image" src="images/apiculteur-tenue-abeilles-ruche-ouverte-isometrique.png">
    <div class="sondage-remerciement">
    <p>Votre réponse a bien été enregistrée.</p>
    <p>Merci de votre participation</p>
    </div>
    `
            afficherMessageErreur("", ".sondage")
        }
        catch (error) { afficherMessageErreur(error.message, ".sondage") }
    })
}

//---Page Contact---
//Gestion de l'envoi d'un message sur la page Contact
let btnValiderMessage = document.querySelector(".envoyer");
if (btnValiderMessage) {
    btnValiderMessage.addEventListener("click", (e) => {
        e.preventDefault(); // évite le rechargement
        let zoneMessage = document.querySelector(".zoneEcritureMessage");
        let zoneNom = document.getElementById("name");
        let zoneEmail = document.getElementById("email");
        let zoneCorpsMessage = document.getElementById("message");
        try {
            validerString(zoneNom);
            validerEmail(zoneEmail);
            validerString(zoneCorpsMessage);
            zoneMessage.innerHTML = `
        <div class="message-remerciement">
        <img class="message-image" src="images/apiculteur-tenue-enfumoir-abeilles-ruche-dadant-isometrique.png">
        <div class="message-remerciement-ecriture">
        <p>Votre mail a bien été envoyé.</p>
        <p>Nous en prendrons connaissance dès notre retour du rucher.</p>
        </div>
        </div>
    `
            afficherMessageErreur("", ".zoneEcritureMessage")
        }
        catch (error) { afficherMessageErreur(error.message, ".zoneEcritureMessage") }
    })
}