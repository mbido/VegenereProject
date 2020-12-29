//############ Constante utile au programme ############################

const alphabet_min = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

//############ fonction fonctionnement de la page ###################### 

function main() {
	var partie_cle = document.getElementById("partie_cle")
	partie_cle.style.display = "none";
	var coder = document.getElementById('coder')
	coder.style.display = "none";
	var decoder = document.getElementById('decoder')
	decoder.style.display = "none"
	var texte = document.getElementById('texte')
	texte.style.display = "none";
	var bouton_choix = document.getElementById("bouton_choix")
	bouton_choix.style.display = "flex"
	var taille = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var nav = document.getElementById("proposition_cle")
	nav.style.height = taille + "px"
}


function coder(){
	var bouton_choix = document.getElementById('bouton_choix')
	bouton_choix.style.display = "none"
	var coder = document.getElementById('coder')
	coder.style.display = "flex";
}

function decoder(){  //cacher//
	var bouton_choix = document.getElementById('bouton_choix')
	bouton_choix.style.display = "none"
	var decoder = document.getElementById('decoder')
	decoder.style.display = "flex";
}

function chiffrer(){
	var texte = document.getElementById("texte_a_chiffrer").value
	var cle = document.getElementById("cle_chiffrer").value
	var texte_chiffre = encodage(texte,cle)
	if (document.getElementById("texte_res")){
		document.getElementById("texte_res").remove()
	}
	var texte_res = document.getElementById('texte')
	var res =   document.createElement("p") 
	res.setAttribute("id", "texte_res")
	res.appendChild(document.createTextNode(texte_chiffre))
	texte_res.appendChild(res)
	texte_res.style.display = "block"
}

function dechiffrer(cle){
	var texte = document.getElementById("texte_a_chiffrer").value
	if (cle == "") {
		var cle = document.getElementById("cle_dechiffrer").value
	}
	var texte_chiffre = decodage(texte,cle)
	if (document.getElementById("texte_res")){
		document.getElementById("texte_res").remove()
	}
	var texte_res = document.getElementById('texte')
	var res =   document.createElement("p") 
	res.setAttribute("id", "texte_res")
	res.appendChild(document.createTextNode(texte_chiffre))
	texte_res.appendChild(res)
	texte_res.style.display = "block"
}

function decrypter(){
	var partie_cle = document.getElementById("partie_cle")
	partie_cle.style.display = "block"
	if (document.getElementById("liste_cle")) {
		document.getElementById("liste_cle").remove()
	}
	var texte = document.getElementById("texte_a_chiffrer").value
	var res = programme_principale(texte)
	var liste = document.createElement("ul")
	for (var i = 0; i < res.length; i++) {
		var valeur = document.createElement("input")
		valeur.setAttribute("type","button")
		valeur.setAttribute("id","cle")
		valeur.setAttribute("value",res[i][0])
		valeur.setAttribute("onclick",'dechiffrer('+"'"+res[i][0]+"'"+')')
		var element_liste = document.createElement("li")
		element_liste.appendChild(valeur)
		liste.appendChild(element_liste)
		liste.setAttribute("id",'liste_cle')
	}
	var place= document.getElementById("partie_cle")
	place.appendChild(liste)	
}

//################# Fonction pour Vigenère #################

//################## Chiffrer #############################

function addition(charMot, charClef){
  let c1 = (charMot.charCodeAt()-97)%26;
  let c2 = (charClef.charCodeAt()-97)%26;
  let n = (c1 + c2)%26;
  let res = String.fromCharCode(n+97);
  return res;
}

function encodage(mot, clef){
  let res = "";
  var num_cle = 0;
  for(i = 0; i < mot.length; i++){
    let charMot = mot[i];
    let charClef = clef[num_cle%clef.length];
    if (alphabet_min.includes(mot[i].toLowerCase())) {
    	console.log(charClef,num_cle%clef.length)
    	res = res + addition(charMot, charClef);
    	num_cle = num_cle + 1
    }
    else {
    	res = res + mot[i]
    }
  }
  return res;
}

//################## Dechiffrer ###########################

function soustraction(charMot, charClef){
  let c1 = (charMot.charCodeAt()-97)%26;
  let c2 = (charClef.charCodeAt()-97)%26;
  let n = (c1 - c2);
  while(n < 0){
    n = n + 26
  }
  let res = String.fromCharCode(n+97);
  return res;
}

function decodage(mot, clef){
  let res = "";
  var num_cle = 0;
  for(i = 0; i < mot.length; i++){
    let charMot = mot[i];
    let charClef = clef[num_cle%clef.length];
    if (alphabet_min.includes(mot[i].toLowerCase())) {
    	res = res + soustraction(charMot, charClef);
    	num_cle = num_cle + 1
    }
    else {
    	res = res + mot[i]
    }
  }
  return res;
}

//#################### Décrypter ##########################

function suppression_car(texte){
	var num = 0
	while (num!=texte.length){
		console.log(num,texte.length)
		if (alphabet_min.includes(texte[num].toLowerCase()) == false) {
			texte = texte.slice(0,num) + texte.slice(num+1,texte.length)
		}
		else{
			num = num + 1
		}
	}
	return texte
}

function comptage_2uplet(texte) {
  	var valeur = [];
	while (texte.length > 1){
		var lettre = texte.slice(0,2)
		for (var i = 1 ; i <= texte.length-1; i++) {
			if (texte.slice(i-1,i+1)==lettre && i-1 !=0) {
				valeur.push(i-1)
			}
		}
		texte = texte.slice(1,-1)
	}
	return(valeur)
}

function max(liste_val){
	var maxi = 0
	for (var i = 0; i <= liste_val.length; i++) {
		if (liste_val[i] > maxi){
			maxi = liste_val[i]
		}
	}
	return maxi
}

function diviseurs(liste_val,maxi){
	var diviseur = []
	var nb_diviseur = []
	for (var i = 2; i <= maxi/2; i++) {
		for (var k = 0; k < liste_val.length; k++) {
			if (liste_val[k]%i==0){
				diviseur.push(i)
			}
		}
		nb_diviseur.push(i)
	}
	var res = [diviseur,nb_diviseur]
	return res
}

function plus_present(ensemble_diviseur,liste_diviseur){
	var valeur = []
	for (var i = 0; i < liste_diviseur.length; i++) {
		var nb = 0
		for (var k = 0; k < ensemble_diviseur.length; k++) {
			if(ensemble_diviseur[k] == liste_diviseur[i]){
				nb =nb + 1
			}
		}
		valeur.push(nb)
	}
	maxi = max(valeur)
	var res = []
	var taille = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	taille = Math.round((taille * 0.0079)-1)
	for (var i = 0; i < valeur.length; i++) {
		if(valeur[i]<=maxi&&liste_diviseur[i]<=taille){
			res.push(liste_diviseur[i])
		}
	}
	return res
}

function reorganise_texte(texte,cle){
	var texte_reorganiser = [];
	var ligne = [];
	for (var i = 0; i < texte.length; i++) {
		ligne.push(texte[i])
		if (ligne.length == cle){
			texte_reorganiser.push(ligne)
			ligne = []
		}
	}
	texte_reorganiser.push(ligne)
	var texte_reorganiser2 = []
	for (var i = 0; i < cle; i++) {
		var ligne = []
		for (var k = 0; k < texte_reorganiser.length; k++) {
			if(texte_reorganiser[k][i]!=undefined){
				ligne.push(texte_reorganiser[k][i])
			}
		}
		texte_reorganiser2.push(ligne)
	}
	return texte_reorganiser2
} 

function trouver_cle(texte,long_cle){
	var num = 0
	var estimations = ""
	for (var i = 0; i<= texte.length - 1; i++){
		var liste_cout = []
		for (var k = 0; k < texte[i].length; k++) {
			var alphabet_ligne = []
			for (var c = 0; c < alphabet_min.length; c++) {
				if (texte[i][k] == alphabet_min[c]){
					num = c
				}
			}
			alphabet_ligne = alphabet_min.slice(num,alphabet_min.length)+","+alphabet_min.slice(0,num)
			alphabet_ligne =alphabet_ligne.split(",")
			liste_cout.push(alphabet_ligne)
			num = 0
		}
		estimations = estimations + estimation(liste_cout)
		liste_cout = []
	}
	return [estimations,long_cle]
}

function estimation(liste){
	var liste_estimation = []
	for (var i = 0; i < liste[0].length; i++) {
		var valeur = 0
		for (var k = 0; k < liste.length; k++) {
			if(["e","s","a","n","t","i","r","u","l","o"].includes(liste[k][i])){
				valeur = valeur + 5
			}
			else if(["d","c","p","m"].includes(liste[k][i])){
				valeur = valeur + 3
			}
			else if(["v","g","f","b","q","h"].includes(liste[k][i])){
				valeur = valeur + 2
			}
			else{
				valeur = valeur + 1
			}
		}
		liste_estimation.push(valeur)	
	}
	var res = 0
	var maxi = 0
	for (var i = 0; i < liste_estimation.length; i++) {
		if (liste_estimation[i]>maxi){
			res = i
			maxi = liste_estimation[i]
		}
	}
	var lettre1 = 0
	var lettre2 = 0
	for (var i = 0; i < alphabet_min.length; i++) {
		if (alphabet_min[i] == liste[0][0]){
			lettre1 = i-1
		}
		if (alphabet_min[i] == liste[0][res]){
			lettre2 =i-1
		}
	}
	lettre1 = (((lettre1-lettre2)%26)+26)%26
	res = alphabet_min[lettre1]
    return res;
}

function programme_principale(texte){
	var texte = suppression_car(texte)
	var long_entre_2uplet = comptage_2uplet(texte)
	var maxi = max(long_entre_2uplet)
	var res = diviseurs(long_entre_2uplet,maxi)
	var long_cle = plus_present(res[0],res[1])
	var liste_cle = []
	for (var i = 0; i < long_cle.length; i++) {
		texte_reorganiser = reorganise_texte(texte,long_cle[i])
		liste_cle.push(trouver_cle(texte_reorganiser,long_cle[i]))
	}
	return liste_cle
}
