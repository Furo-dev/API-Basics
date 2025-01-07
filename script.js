// FONCTION BOUTON GET
document.getElementById("btn-get").addEventListener("click", function (e) {
  e.preventDefault();

  // Récupère les données saisies
  const userId = document.getElementById("user-id").value;
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

  if (isNaN(userId) || userId <= 0) {
    alert("Veuillez entrer un ID utilisateur valide !");
    return;
  }

  // Prépare les données à envoyer
  const getData = {
    userId: userId,
  };

  // Envoie la requête POST
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Indique que le corps est en JSON
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })

    .then((data) => {
      console.log("Récupération des données :", data);
      afficherMessage("Données récupérées avec succès", "success");

      // Vide le conteneur avant d'ajouter les nouveaux articles
      const articlesContainer = document.getElementById("articles-container");
      articlesContainer.innerHTML = "";

      // Parcourt les articles récupérés
      data.forEach((article) => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article-item");
        articleDiv.setAttribute("data-id", article.id);

        // Ajoute l'ID de l'article
        const id = document.createElement("p");
        id.textContent = `ID: ${article.id}`;

        // Ajoute le titre et le contenu de l'article
        const title = document.createElement("h3");
        title.textContent = article.title;

        const body = document.createElement("p");
        body.textContent = article.body;

        // Assemble l'article dans le conteneur
        articleDiv.appendChild(id);
        articleDiv.appendChild(title);
        articleDiv.appendChild(body);
        articlesContainer.appendChild(articleDiv);
      });
    })
    .catch((error) => {
      console.error("Erreur :", error);
      afficherMessage(
        "Une erreur est survenue lors de la récupération",
        "error"
      );
    });

  // Réinitialise les champs
  reiniInput();
});

// Fonction POST
document.getElementById("btn-post").addEventListener("click", function (e) {
  e.preventDefault();

  // Récupère les donnees saisies
  const userId = document.getElementById("user-id").value;
  const titre = document.getElementById("titre").value;
  const contenu = document.getElementById("contenu").value;
  const articleId = document.getElementById("id").value;
  const url = "https://jsonplaceholder.typicode.com/posts";

  if (!titre && !contenu) {
    alert("Veuillez remplir les champs");
    return;
  }

  // Préparation des données a envoyer
  const postData = {
    id: articleId,
    title: titre,
    body: contenu,
    userId: userId,
  };

  // Envoi des données
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Données envoyées :", data);
      afficherMessage("Article ajouté avec succès", "success");
      // Ajoute dynamiquement le nouvel article à la liste
      const articlesContainer = document.getElementById("articles-container");
      const articleDiv = document.createElement("div");
      articleDiv.classList.add("article-item");
      articleDiv.setAttribute("data-id", articleId); // Utilise l'ID sélectionné

      const id = document.createElement("p");
      id.textContent = `ID: ${articleId}`; // Utilise l'ID sélectionné

      const title = document.createElement("h3");
      title.textContent = data.title;

      const body = document.createElement("p");
      body.textContent = data.body;

      articleDiv.appendChild(id);
      articleDiv.appendChild(title);
      articleDiv.appendChild(body);
      articlesContainer.appendChild(articleDiv);

      // Réinitialise les champs
      reiniInput();
    })
    .catch((error) => {
      console.error("Erreur :", error);
      afficherMessage("Une erreur est survenue lors de l'ajout", "error");
    });
});

// Fonction DELETE
document.getElementById("btn-delete").addEventListener("click", function (e) {
  e.preventDefault();

  // Récupère les données saisies
  const articleId = document.getElementById("id").value;
  const url = `https://jsonplaceholder.typicode.com/posts/${articleId}`;

  if (!articleId) {
    alert("Veuillez remplir le champs");
  }

  // Envoie la requête DELETE
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      console.log(`Article ${articleId} supprimé avec succès !`);
    })
    .then((data) => {
      console.log("Données supprimées :", data);

      // Supprime l'article de la liste
      const articlesContainer = document.getElementById("articles-container");
      const articleDiv = articlesContainer.querySelector(
        `[data-id="${articleId}"]`
      );
      console.log(articleDiv);
      if (articleDiv) {
        articlesContainer.removeChild(articleDiv);
        afficherMessage("Article supprimé avec succès", "success");
      } else {
        afficherMessage("Article non trouvé dans la liste", "error");
      }

      // Réinitialise les champs
      reiniInput();
    })
    .catch((error) => console.error("Erreur :", error));
});

// Affiche un message d'état
function afficherMessage(message, type) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.style.color = type === "success" ? "green" : "red";
  setTimeout(() => (status.textContent = ""), 3000);
}

// Réinitialise les champs de saisie
function reiniInput() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
}
