// Créer une class Personne.
class Personne {
    constructor(nom, lieu, argent, mainDroite, mainGauche) {
        this.nom = nom;
        this.lieu = lieu;
        this.argent = argent;
        this.mainDroite = mainDroite;
        this.mainGauche = mainGauche;
        this.seDeplacer = lieu => {
            lieu.push(this);
            this.lieu = lieu;
        }
        this.payerArticle = article => {
            this.argent -= article.prix;
            this.lieu += article.prix;
        }
        this.couper = (ingredient, outil) => {
            ingredient.etat = outil.action;
        }
    }
}

// Créer un objet personne
let laurie = newPersonne('laurie', 'maison', 100, [], []);

// Créer un lieu "maison"
let maison = {
    nom: 'maison',
    personnes: []
}

// Créer un outil
let couteau = {
    nom: 'couteau',
    action: 'coupé'
}

// Créer des produits (ingrédients) à mettre dans le magasin qui serviront à créer l'omelette (oignon, oeuf, epice, fromage, ...)
class Ingredient {
    constructor(nom, etat, prix) {
        this.nom = nom;
        this.etat = etat;
        this.prix = prix;
    }
}

let oignon = new Ingredient