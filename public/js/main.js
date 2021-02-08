// Créer une class Personne.
class Personne {
    constructor(nom, lieu, argent, mainDroite, mainGauche) {
        this.nom = nom;
        this.lieu = lieu;
        this.argent = argent;
        this.mainDroite = mainDroite;
        this.mainGauche = mainGauche;
        this.seDeplacer = lieu => {
            lieu.personnes.push(this);
            this.lieu = lieu.nom;
        }
        this.payerArticle = article => {
            this.argent -= article.prix;
        }
        this.couper = (ingredient, outil) => {
            ingredient.etat = outil.action;
        }
    }
}

// Créer un objet personne
let laurie = new Personne('Laurie', 'maison', 25, [], []);

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

let oignon = new Ingredient('oignon', 'entier', 0.50);
let oeuf = new Ingredient('oeuf', 'entier', 0.10);
let epice = new Ingredient('epice', 'moulu', 1.50);
let fromage = new Ingredient('fromage', 'entier', 3);
let tomate = new Ingredient('tomate', 'entier', 1);
let poivron = new Ingredient('poivron', 'entier', 1);

// Créer un lieu "epicerie"
class Panier {
    constructor() {
        this.type = 'panier';
        this.contenu = [];
    }
}
let panier1 = new Panier();
let panier2 = new Panier();
let panier3 = new Panier();
let epicerie = {
    nom: "epicerie",
    personnes: [],
    paniers: [panier1, panier2, panier3],
    contenu: [oignon, oeuf, epice, fromage, tomate, poivron]
}

// Créer un poele avec un tableau comme contenu
let poele = {
    contenu: [],
    cuire() {
        setTimeout(() => {
            this.contenu[0].etat = 'cuite';
            console.log(`L'${this.contenu[0].nom} est ${this.contenu[0].etat} !`);
        }, 4000);
        
    }
}

// Créer un bol avec un tableau comme contenu
let bol = {
    contenu: [],
    melanger(nomMelange) {
        let newMelange = {
            nom: nomMelange,
            etat: 'cru'
        }
        this.contenu = [newMelange];
    }
}

// DEBUT DE L'OMELETTE
// Pour dire que le personnage est à la maison :
// Avec l'objet personnage, utiliser la method seDeplacer et de passer en paramètre l'objet maison
// Afficher un message tel que :
// console.log(personnage.nom + " est actuellement à la " + personnage.lieu);
setTimeout(() => {
    laurie.seDeplacer(maison);
    console.log(`${laurie.nom} est actuellement à la ${laurie.lieu}.`)
}, 2000);

// Pour aller à l'épicerie acheter les ingrédients pour l'omelette, je répète la première étape en changeant le parametre de la method seDeplacer par l'epicerie

setTimeout(() => {
    maison.personnes.shift();
    laurie.seDeplacer(epicerie);
    console.log(`${laurie.nom} va à l'épicerie`)
}, 4000);
// Mon personnage prend un des paniers dans l'épicerie (il récupère le panier dans les objets de l'épicerie et le met dans sa main droite.)
setTimeout(() => {
    laurie.mainDroite.push(epicerie.paniers.shift());
    console.log(`${laurie.nom} a pris un ${laurie.mainDroite[0].type}`)
}, 6000);


// Je créer une boucle qui va prendre chaque élément (ingrédient) du contenu de l'épicerie (1 à 1) et en faire une COPIE dans le panier du personnage
// Afficher un message à chaque ingrédient pris
setTimeout(() => {
    epicerie.contenu.forEach((element, index) => { 
        laurie.mainDroite[0].contenu[index] = element;
        console.log(`${laurie.nom} prend ${element.nom} et le met dans son panier`);              
    });
}, 8000);
// Payer chaque ingrédient récupéré dans le panier. Avec une boucle aussi, on va les passer 1 à 1 dans la fonction payerArticle()
setTimeout(() => {
    laurie.mainDroite[0].contenu.forEach((element) => {
    laurie.payerArticle(element);
});
    console.log(`Il reste ${laurie.argent} euros a ${laurie.nom}`);
}, 10000);



// rentrer à la maison (comme ça on pourra cuisiner)

setTimeout(() => {
    epicerie.personnes.shift()
    laurie.seDeplacer(maison);

    for(let i = 0 ; laurie.mainDroite[0].contenu[0] ; i++){
        console.log(`${laurie.nom} met ${laurie.mainDroite[0].contenu[0].nom} dans le bol`)
        bol.contenu.push(laurie.mainDroite[0].contenu.shift());
        i--;  
    }
}, 12000);

// // Retourner à l'épicerie pour rapporter le panier. (donc seDeplacer puis enlever le panier de la main droite et le remetre dans les paniers de l'épicerie.)

setTimeout(() => {
    maison.personnes.shift();
    laurie.seDeplacer(epicerie);
    epicerie.paniers.push(laurie.mainDroite.shift());
    console.log(`${laurie.nom} retourne à l'épicerie pour rendre le panier`)
}, 14000);

// Retourner à la maison pour continuer l'omelette

setTimeout(() => {
    epicerie.personnes.shift();
    laurie.seDeplacer(maison);
    console.log(`${laurie.nom} retourne à la ${laurie.lieu} pour cuisiner`);
}, 16000);

// Vérifier chaque ingrédient dans le bol et le couper seulement s'il est entier ! Pour ça on utilise la méthode couper de personnage

setTimeout(() => {
    bol.contenu.forEach(element => {
        if(element.etat == 'entier'){
            setTimeout(() => {
                laurie.couper(element, couteau);
                console.log(`${laurie.nom} coupe ${element.nom} avec le couteau`);
            }, 1000); 
        }
    });
}, 18000);


// Mélanger le contenu du bol avec la méthode melanger. on va nommer ce mélange une 'omelette' (à passer en param).

// Afficher un message avec le nouveau mélange

setTimeout(() => {
    bol.melanger('omelette');
    console.log(`${laurie.nom} melange les ingredients. Il y a maintenant une ${bol.contenu[0].nom} dans le bol.`)
}, 20000);


// vider le contenu du bol dans la poele. Il ne doit plus rien avoir dans le bol et y avoir juste l'omelette pas cuite.

setTimeout(() => {
    poele.contenu.push(bol.contenu.shift());
    console.log(`${laurie.nom} verse le contenu du bol dans la poêle et va maintenant mettre l'omelette a cuire`);
}, 22000);

setTimeout(() => {
   poele.cuire(); 
}, 24000);
