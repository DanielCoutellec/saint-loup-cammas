const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();


/* =========================================
   CONFIGURATION
========================================= */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


/* =========================================
   FONCTION DE LECTURE JSON
========================================= */

function lireJSON(nomFichier) {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "data", nomFichier),
      "utf8"
    )
  );
}


/* =========================================
   ACCUEIL
========================================= */

app.get("/", (req, res) => {

  const actualites = lireJSON("actualites.json");
  const agenda = lireJSON("agenda.json");

  const infoMairie =
    actualites.find(
      actualite => actualite.slug === "plan-canicule"
    ) || actualites[0];

  res.render("index", {
    title: "Mairie de Saint-Loup-Cammas",

    infoMairie,

    actualitesAccueil: actualites.slice(0, 3),

    agendaAccueil: agenda.slice(0, 2)
  });

});


/* =========================================
   LA MAIRIE
========================================= */

app.get("/maire-elus", (req, res) => {
  res.render("maire-elus", {
    title: "Le maire et les élus - Saint-Loup-Cammas"
  });
});


app.get("/conseil-municipal", (req, res) => {
  res.render("conseil-municipal", {
    title: "Conseil municipal - Saint-Loup-Cammas"
  });
});


app.get("/services-municipaux", (req, res) => {
  res.render("services-municipaux", {
    title: "Services municipaux - Saint-Loup-Cammas"
  });
});


app.get("/publications", (req, res) => {
  res.render("publications", {
    title: "Publications - Saint-Loup-Cammas"
  });
});


app.get("/marches-publics", (req, res) => {
  res.render("marches-publics", {
    title: "Marchés publics - Saint-Loup-Cammas"
  });
});


/* =========================================
   DÉMARCHES
========================================= */

app.get("/demarches", (req, res) => {
  res.render("demarches", {
    title: "Démarches - Saint-Loup-Cammas"
  });
});


app.get("/etat-civil", (req, res) => {
  res.render("etat-civil", {
    title: "État civil - Saint-Loup-Cammas"
  });
});


app.get("/formalites", (req, res) => {
  res.render("formalites", {
    title: "Formalités administratives - Saint-Loup-Cammas"
  });
});


app.get("/elections", (req, res) => {
  res.render("elections", {
    title: "Élections - Saint-Loup-Cammas"
  });
});


app.get("/urbanisme", (req, res) => {
  res.render("urbanisme", {
    title: "Urbanisme - Saint-Loup-Cammas"
  });
});


app.get("/cimetiere", (req, res) => {
  res.render("cimetiere", {
    title: "Cimetière - Saint-Loup-Cammas"
  });
});


/* =========================================
   ENFANCE
========================================= */

app.get("/enfance", (req, res) => {
  res.render("enfance", {
    title: "Enfance - Saint-Loup-Cammas"
  });
});


app.get("/ecole", (req, res) => {
  res.render("ecole", {
    title: "École - Saint-Loup-Cammas"
  });
});


app.get("/restauration-scolaire", (req, res) => {
  res.render("restauration-scolaire", {
    title: "Restauration scolaire - Saint-Loup-Cammas"
  });
});


app.get("/creche", (req, res) => {
  res.render("creche", {
    title: "Crèche - Saint-Loup-Cammas"
  });
});


app.get("/accueils-loisirs", (req, res) => {
  res.render("accueils-loisirs", {
    title: "Accueils de loisirs - Saint-Loup-Cammas"
  });
});


app.get("/conseil-enfants", (req, res) => {
  res.render("conseil-enfants", {
    title: "Conseil municipal des enfants - Saint-Loup-Cammas"
  });
});


/* =========================================
   VIE LOCALE
========================================= */

app.get("/vie-locale", (req, res) => {
  res.render("vie-locale", {
    title: "Vie locale - Saint-Loup-Cammas"
  });
});


app.get("/associations", (req, res) => {
  res.render("associations", {
    title: "Associations - Saint-Loup-Cammas"
  });
});


app.get("/transports", (req, res) => {
  res.render("transports", {
    title: "Transports - Saint-Loup-Cammas"
  });
});


app.get("/salles-municipales", (req, res) => {
  res.render("salles-municipales", {
    title: "Salles municipales - Saint-Loup-Cammas"
  });
});


app.get("/commerces-services", (req, res) => {
  res.render("commerces-services", {
    title: "Commerces & Services - Saint-Loup-Cammas"
  });
});


/* =========================================
   ACTUALITÉS
========================================= */

app.get("/actualites", (req, res) => {

  const actualites = lireJSON("actualites.json");

  res.render("actualites", {
    title: "Actualités - Saint-Loup-Cammas",
    actualites
  });

});


app.get("/actualites/:slug", (req, res) => {

  const actualites = lireJSON("actualites.json");

  const slugRecherche = String(req.params.slug)
    .trim()
    .toLowerCase();

  const actualite = actualites.find(item =>
    String(item.slug || "")
      .trim()
      .toLowerCase() === slugRecherche
  );

  if (!actualite) {
    return res.status(404).send("Actualité introuvable");
  }

  res.render("actualite", {
    title: `${actualite.titre} - Saint-Loup-Cammas`,
    actualite
  });

});


/* =========================================
   AGENDA
========================================= */

app.get("/agenda", (req, res) => {

  const agenda = lireJSON("agenda.json");

  res.render("agenda", {
    title: "Agenda - Saint-Loup-Cammas",
    agenda
  });

});


app.get("/agenda/:slug", (req, res) => {

  const agenda = lireJSON("agenda.json");

  const slugRecherche = String(req.params.slug)
    .trim()
    .toLowerCase();

  const evenement = agenda.find(item =>
    String(item.slug || "")
      .trim()
      .toLowerCase() === slugRecherche
  );

  if (!evenement) {
    return res.status(404).send("Événement introuvable");
  }

  res.render("evenement", {
    title: `${evenement.titre} - Saint-Loup-Cammas`,
    evenement
  });

});


/* =========================================
   TRAVAUX
========================================= */

app.get("/travaux", (req, res) => {
  res.render("travaux", {
    title: "Travaux & informations - Saint-Loup-Cammas"
  });
});


/* =========================================
   CONTACT
========================================= */

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact - Saint-Loup-Cammas"
  });
});


/* =========================================
   BULLETIN MUNICIPAL
========================================= */

app.get("/bulletin-municipal", (req, res) => {
  res.render("bulletin-municipal", {
    title: "Bulletin municipal - Saint-Loup-Cammas"
  });
});


/* =========================================
   MENTIONS LÉGALES
========================================= */

app.get("/mentions-legales", (req, res) => {
  res.render("mentions-legales", {
    title: "Mentions légales - Saint-Loup-Cammas"
  });
});


/* =========================================
   ACCESSIBILITÉ
========================================= */

app.get("/accessibilite", (req, res) => {
  res.render("accessibilite", {
    title: "Accessibilité - Saint-Loup-Cammas"
  });
});


/* =========================================
   SERVEUR
========================================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Site lancé sur http://localhost:${PORT}`);
});