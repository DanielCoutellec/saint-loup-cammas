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

app.get("/mot-du-maire", (req, res) => {
  res.render("mot-du-maire", {
    title: "Le mot du maire - Saint-Loup-Cammas"
  });
});

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

app.get("/pharmacies-garde", (req, res) => {
  res.render("pharmacies-garde", {
    title: "Pharmacies de garde - Saint-Loup-Cammas"
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


app.get("/salle-fetes", (req, res) => {
  res.render("salle-fetes", {
    title: "Salle des fêtes - Saint-Loup-Cammas"
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

  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);

  const prochainsEvenements = agenda
    .filter(item => {
      if (!item.date) return false;

      const dateEvenement = new Date(item.date + "T00:00:00");

      return dateEvenement >= aujourdHui;
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

  res.render("agenda", {
    title: "Agenda - Saint-Loup-Cammas",
    agenda: prochainsEvenements
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
   MOTEUR DE RECHERCHE
========================================= */

function normaliserRecherche(texte = "") {
  return String(texte)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}


const pagesRecherche = [

  {
    titre: "Le mot du maire",
    url: "/mot-du-maire",
    description: "Message et informations du maire de Saint-Loup-Cammas.",
    mots: "maire municipal mairie"
  },

  {
    titre: "Le maire et les élus",
    url: "/maire-elus",
    description: "Découvrez le maire, les adjoints et les élus municipaux.",
    mots: "elus adjoints conseil municipal maire"
  },

  {
    titre: "Conseil municipal",
    url: "/conseil-municipal",
    description: "Informations sur le Conseil municipal de Saint-Loup-Cammas.",
    mots: "conseil municipal élus mairie"
  },

  {
    titre: "Fonctionnement du Conseil municipal",
    url: "/fonctionnement-conseil-municipal",
    description: "Fonctionnement et organisation du Conseil municipal.",
    mots: "conseil fonctionnement municipal"
  },

  {
    titre: "Commissions municipales",
    url: "/commissions",
    description: "Présentation des commissions municipales.",
    mots: "commissions élus conseil municipal"
  },

  {
    titre: "Syndicats & représentations",
    url: "/syndicats",
    description: "Organismes, syndicats et représentations de la commune.",
    mots: "syndicats eau electricite transports représentants"
  },

  {
    titre: "Comptes rendus du Conseil municipal",
    url: "/comptes-rendus",
    description: "Consultez les comptes rendus et procès-verbaux du Conseil municipal.",
    mots: "compte rendu pv procès verbal conseil municipal archives"
  },

  {
    titre: "Services municipaux",
    url: "/services-municipaux",
    description: "Services proposés par la mairie de Saint-Loup-Cammas.",
    mots: "mairie services municipaux agents"
  },

  {
    titre: "Publications",
    url: "/publications",
    description: "Publications et documents de la commune.",
    mots: "publications documents archives"
  },

  {
    titre: "Bulletin municipal",
    url: "/bulletin-municipal",
    description: "Bulletins municipaux et lettres du maire.",
    mots: "bulletin horizons lettre maire pdf publications"
  },

  {
    titre: "Travaux",
    url: "/travaux",
    description: "Travaux prévus, en cours et réalisés dans la commune.",
    mots: "travaux voirie pont éclairage place église"
  },

  {
    titre: "Marchés publics",
    url: "/marches-publics",
    description: "Marchés publics et consultations de la commune.",
    mots: "marchés publics appels offres consultations"
  },


  /* DÉMARCHES */

  {
    titre: "Démarches",
    url: "/demarches",
    description: "Toutes les démarches administratives.",
    mots: "demarches administratif formulaires mairie"
  },

  {
    titre: "État civil",
    url: "/etat-civil",
    description: "Naissance, mariage, décès et démarches d'état civil.",
    mots: "naissance mariage décès acte état civil"
  },

  {
    titre: "Formalités administratives",
    url: "/formalites",
    description: "Principales formalités administratives.",
    mots: "carte identité passeport formalités administratif"
  },

  {
    titre: "Élections",
    url: "/elections",
    description: "Inscriptions électorales, procurations et élections.",
    mots: "elections vote électoral procuration inscription"
  },

  {
    titre: "Cimetière",
    url: "/cimetiere",
    description: "Informations concernant le cimetière communal.",
    mots: "cimetiere concession funéraire décès"
  },


  /* ENFANCE */

  {
    titre: "Enfance",
    url: "/enfance",
    description: "Services destinés aux enfants et aux familles.",
    mots: "enfance école crèche loisirs famille"
  },

  {
    titre: "École Claude Nougaro",
    url: "/ecole",
    description: "Informations pratiques sur l'école Claude Nougaro.",
    mots: "école scolaire maternelle élémentaire nougaro rentrée"
  },

  {
    titre: "Restauration scolaire",
    url: "/restauration-scolaire",
    description: "Informations sur la cantine et la restauration scolaire.",
    mots: "cantine repas menus restauration école"
  },

  {
    titre: "Crèche Les Bout'Chou",
    url: "/creche",
    description: "Informations concernant la crèche Les Bout'Chou.",
    mots: "crèche petite enfance enfants bout chou"
  },

  {
    titre: "Relais Petite Enfance",
    url: "/relais-petite-enfance",
    description: "Informations pour les familles et assistants maternels.",
    mots: "rpe relais petite enfance assistante maternelle"
  },

  {
    titre: "Accueils de loisirs",
    url: "/accueils-loisirs",
    description: "Accueils périscolaires et centres de loisirs.",
    mots: "loisirs alsh périscolaire vacances enfants"
  },

  {
    titre: "Conseil municipal des enfants",
    url: "/conseil-enfants",
    description: "Présentation du Conseil municipal des enfants.",
    mots: "cme conseil municipal enfants jeunes"
  },


  /* VIE LOCALE */

  {
    titre: "Vie locale",
    url: "/vie-locale",
    description: "Associations, commerces, entreprises et équipements.",
    mots: "vie locale associations commerces entreprises"
  },

  {
    titre: "Associations",
    url: "/associations",
    description: "Associations et activités de Saint-Loup-Cammas.",
    mots: "association sport loisirs culture clubs"
  },

  {
    titre: "Commerces & services",
    url: "/commerces-services",
    description: "Commerces et services présents dans la commune.",
    mots: "commerce magasin services artisans"
  },

  {
    titre: "Entreprises",
    url: "/entreprises",
    description: "Entreprises et professionnels de Saint-Loup-Cammas.",
    mots: "entreprises artisans professionnels sociétés"
  },

  {
    titre: "Salle des fêtes",
    url: "/salle-fetes",
    description: "Informations et réservation de la salle des fêtes.",
    mots: "salle fêtes location réservation"
  },


  /* VIE QUOTIDIENNE */

  {
    titre: "Vie quotidienne",
    url: "/vie-quotidienne",
    description: "Services pratiques destinés aux habitants.",
    mots: "quotidien habitants services pratique"
  },

  {
    titre: "Transports",
    url: "/transports",
    description: "Bus, déplacements et solutions de mobilité.",
    mots: "bus tisseo métro transport mobilité ligne 33"
  },

  {
    titre: "Pharmacies de garde",
    url: "/pharmacies-garde",
    description: "Informations sur les pharmacies de garde.",
    mots: "pharmacie garde santé médicaments"
  },

  {
    titre: "Plan canicule",
    url: "/plan-canicule",
    description: "Prévention et accompagnement en période de fortes chaleurs.",
    mots: "canicule chaleur personnes fragiles ccas"
  },

  {
    titre: "Numéros utiles",
    url: "/numeros-utiles",
    description: "Urgences, santé, sécurité et contacts utiles.",
    mots: "urgence samu pompiers gendarmerie 15 17 18 112"
  },

  {
    titre: "Solidarité & action sociale",
    url: "/solidarite",
    description: "CCAS, permanences sociales, aidants et accompagnement.",
    mots: "solidarité social ccas aidants handicap personnes âgées"
  },


  /* DÉVELOPPEMENT DURABLE */

  {
    titre: "Développement durable",
    url: "/developpement-durable",
    description: "Urbanisme, environnement et aménagement du territoire.",
    mots: "développement durable environnement urbanisme"
  },

  {
    titre: "Urbanisme & PLU",
    url: "/urbanisme",
    description: "PLU, permis de construire et autorisations d'urbanisme.",
    mots: "urbanisme plu permis construire déclaration préalable scot"
  },

  {
    titre: "Environnement & déchets",
    url: "/environnement",
    description: "Tri, collecte, déchetterie, encombrants et déchets verts.",
    mots: "déchets poubelle tri collecte déchetterie compost environnement"
  },


  /* INTERCOMMUNALITÉ */

  {
    titre: "Intercommunalité",
    url: "/intercommunalite",
    description: "Communauté de communes des Coteaux Bellevue.",
    mots: "intercommunalité coteaux bellevue communauté communes"
  },

  {
    titre: "Investissements intercommunaux",
    url: "/investissements",
    description: "Projets et investissements à l'échelle intercommunale.",
    mots: "investissements projets intercommunalité équipements"
  },

  {
    titre: "Emploi & insertion",
    url: "/centre-social-emploi",
    description: "Services d'accompagnement à l'emploi et à l'insertion.",
    mots: "emploi travail insertion france travail"
  },

  {
    titre: "L'Écho des Coteaux",
    url: "/bulletin-intercommunal",
    description: "Publications de la Communauté de communes.",
    mots: "echo coteaux bulletin intercommunal"
  },


  /* COMMUNE */

  {
    titre: "Commune & patrimoine",
    url: "/commune-patrimoine",
    description: "Découvrez Saint-Loup-Cammas et son patrimoine.",
    mots: "commune patrimoine histoire village"
  },

  {
    titre: "Histoire",
    url: "/histoire",
    description: "Histoire de Saint-Loup-Cammas.",
    mots: "histoire ancien patrimoine commune"
  },

  {
    titre: "Saint-Loup en images",
    url: "/saint-loup-en-images",
    description: "Galerie photographique de Saint-Loup-Cammas.",
    mots: "photos images galerie village"
  },

  {
    titre: "Démographie",
    url: "/demographie",
    description: "Informations démographiques sur la commune.",
    mots: "population habitants démographie"
  },

  {
    titre: "Blason",
    url: "/blason",
    description: "Histoire du blason et du logo de Saint-Loup-Cammas.",
    mots: "blason logo armoiries"
  },

  {
    titre: "Patrimoine de la mairie",
    url: "/mairie-patrimoine",
    description: "Découvrez l'histoire de la mairie.",
    mots: "mairie patrimoine bâtiment histoire"
  },

  {
    titre: "L'École - patrimoine",
    url: "/ecole-patrimoine",
    description: "Histoire de l'école de Saint-Loup-Cammas.",
    mots: "école ancienne patrimoine histoire"
  },

  {
    titre: "L'Église",
    url: "/eglise",
    description: "Histoire et patrimoine de l'église.",
    mots: "église patrimoine religion bâtiment"
  },

  {
    titre: "Autres lieux",
    url: "/autres-lieux",
    description: "Autres lieux remarquables de Saint-Loup-Cammas.",
    mots: "lieux patrimoine commune"
  },

  {
    titre: "Cartes postales anciennes",
    url: "/cartes-postales",
    description: "Collection de cartes postales anciennes de la commune.",
    mots: "cartes postales anciennes photos histoire"
  },


  /* INFORMATION */

  {
    titre: "Actualités",
    url: "/actualites",
    description: "Les dernières informations de la commune.",
    mots: "actualités informations nouvelles"
  },

  {
    titre: "Agenda",
    url: "/agenda",
    description: "Événements et manifestations à Saint-Loup-Cammas.",
    mots: "agenda événements manifestations fête loto concert"
  },

  {
    titre: "Contact & accès",
    url: "/contact",
    description: "Coordonnées, horaires et accès à la mairie.",
    mots: "contact mairie téléphone adresse horaires"
  },

  {
    titre: "Accessibilité",
    url: "/accessibilite",
    description: "Informations concernant l'accessibilité du site.",
    mots: "accessibilité handicap rgaa"
  },

  {
    titre: "Mentions légales",
    url: "/mentions-legales",
    description: "Informations légales relatives au site.",
    mots: "mentions légales éditeur hébergeur vercel"
  },

  {
    titre: "Politique de confidentialité",
    url: "/confidentialite",
    description: "Informations concernant la protection des données personnelles.",
    mots: "confidentialité rgpd données personnelles cnil"
  }

];

/* =========================================
   ACCESSIBILITÉ
========================================= */
app.get("/recherche", (req, res) => {

  const recherche = String(req.query.q || "").trim();

  let resultats = [];

  if (recherche.length >= 2) {

    const termes = normaliserRecherche(recherche)
      .split(/\s+/)
      .filter(Boolean);


    /* PAGES */

    const resultatsPages = pagesRecherche
      .map(page => {

        const contenu = normaliserRecherche(
          `${page.titre} ${page.description} ${page.mots}`
        );

        const score = termes.reduce((total, terme) => {

          if (normaliserRecherche(page.titre).includes(terme)) {
            return total + 5;
          }

          if (contenu.includes(terme)) {
            return total + 1;
          }

          return total;

        }, 0);

        return {
          ...page,
          type: "Page",
          score
        };

      })
      .filter(item => item.score > 0);


    /* ACTUALITÉS */

    const actualites = lireJSON("actualites.json");

    const resultatsActualites = actualites
      .map(actualite => {

        const contenu = normaliserRecherche(
          `${actualite.titre || ""} ` +
          `${actualite.description || ""} ` +
          `${actualite.contenu || ""}`
        );

        const score = termes.reduce((total, terme) => {

          if (
            normaliserRecherche(actualite.titre || "")
              .includes(terme)
          ) {
            return total + 5;
          }

          if (contenu.includes(terme)) {
            return total + 1;
          }

          return total;

        }, 0);

        return {
          titre: actualite.titre,
          description:
            actualite.description ||
            "Actualité de Saint-Loup-Cammas.",
          url: `/actualites/${actualite.slug}`,
          type: "Actualité",
          score
        };

      })
      .filter(item => item.score > 0);


    /* AGENDA */

    const agenda = lireJSON("agenda.json");

    const resultatsAgenda = agenda
      .map(evenement => {

        const contenu = normaliserRecherche(
          `${evenement.titre || ""} ` +
          `${evenement.description || ""} ` +
          `${evenement.contenu || ""}`
        );

        const score = termes.reduce((total, terme) => {

          if (
            normaliserRecherche(evenement.titre || "")
              .includes(terme)
          ) {
            return total + 5;
          }

          if (contenu.includes(terme)) {
            return total + 1;
          }

          return total;

        }, 0);

        return {
          titre: evenement.titre,
          description:
            evenement.description ||
            "Événement à Saint-Loup-Cammas.",
          url: `/agenda/${evenement.slug}`,
          type: "Agenda",
          score
        };

      })
      .filter(item => item.score > 0);


    resultats = [
      ...resultatsPages,
      ...resultatsActualites,
      ...resultatsAgenda
    ]
      .sort((a, b) => b.score - a.score)
      .slice(0, 30);

  }


  res.render("recherche", {

    title: recherche
      ? `Recherche : ${recherche} - Saint-Loup-Cammas`
      : "Recherche - Saint-Loup-Cammas",

    recherche,
    resultats

  });

});

app.get("/accessibilite", (req, res) => {
  res.render("accessibilite", {
    title: "Accessibilité - Saint-Loup-Cammas"
  });
});
app.get("/vie-quotidienne", (req, res) => {
  res.render("vie-quotidienne", {
    title: "Vie quotidienne - Saint-Loup-Cammas"
  });
});
app.get("/numeros-utiles", (req, res) => {
  res.render("numeros-utiles", {
    title: "Numéros utiles - Saint-Loup-Cammas"
  });
});

app.get("/solidarite", (req, res) => {
  res.render("solidarite", {
    title: "Solidarité & action sociale - Saint-Loup-Cammas"
  });
});

app.get("/intercommunalite", (req, res) => {
  res.render("intercommunalite", {
    title: "Intercommunalité - Saint-Loup-Cammas"
  });
});
app.get("/centre-social-emploi", (req, res) => {
  res.render("centre-social-emploi", {
    title: "Centre social & emploi - Saint-Loup-Cammas"
  });
});
app.get("/relais-petite-enfance", (req, res) => {
  res.render("relais-petite-enfance", {
    title: "Relais Petite Enfance - Saint-Loup-Cammas"
  });
});
app.get("/bulletin-intercommunal", (req, res) => {
  res.render("bulletin-intercommunal", {
    title: "L'Écho des Coteaux - Saint-Loup-Cammas"
  });
});
app.get("/commune-patrimoine", (req, res) => {
  res.render("commune-patrimoine", {
    title: "La commune, histoire & patrimoine - Saint-Loup-Cammas"
  });
});
app.get("/histoire", (req, res) => {
  res.render("histoire", {
    title: "Histoire de Saint-Loup-Cammas"
  });
});
app.get("/demographie", (req, res) => {
  res.render("demographie", {
    title: "Démographie - Saint-Loup-Cammas"
  });
});
app.get("/blason", (req, res) => {
  res.render("blason", {
    title: "Blason - Saint-Loup-Cammas"
  });
});
app.get("/mairie-patrimoine", (req, res) => {
  res.render("mairie-patrimoine", {
    title: "Histoire de la mairie - Saint-Loup-Cammas"
  });
});
app.get("/ecole-patrimoine", (req, res) => {
  res.render("ecole-patrimoine", {
    title: "Histoire de l'école - Saint-Loup-Cammas"
  });
});
app.get("/eglise", (req, res) => {
  res.render("eglise", {
    title: "L'Église - Saint-Loup-Cammas"
  });
});
app.get("/autres-lieux", (req, res) => {
  res.render("autres-lieux", {
    title: "Autres lieux - Saint-Loup-Cammas"
  });
});
app.get("/cartes-postales", (req, res) => {
  res.render("cartes-postales", {
    title: "Cartes postales - Saint-Loup-Cammas"
  });
});
app.get("/plan-canicule", (req, res) => {
  res.render("plan-canicule", {
    title: "Plan canicule - Saint-Loup-Cammas"
  });
});
app.get("/environnement", (req, res) => {
  res.render("environnement", {
    title: "Environnement & déchets - Saint-Loup-Cammas"
  });
});
app.get("/entreprises", (req, res) => {
  res.render("entreprises", {
    title: "Entreprises - Saint-Loup-Cammas"
  });
});
app.get("/commissions", (req, res) => {
  res.render("commissions", {
    title: "Commissions municipales - Saint-Loup-Cammas"
  });
});
app.get("/syndicats", (req, res) => {
  res.render("syndicats", {
    title: "Syndicats & représentations - Saint-Loup-Cammas"
  });
});
app.get("/fonctionnement-conseil-municipal", (req, res) => {
  res.render("fonctionnement-conseil-municipal", {
    title: "Fonctionnement du Conseil municipal - Saint-Loup-Cammas"
  });
});
app.get("/comptes-rendus", (req, res) => {
  res.render("comptes-rendus", {
    title: "Comptes rendus du Conseil municipal - Saint-Loup-Cammas"
  });
});
app.get("/saint-loup-en-images", (req, res) => {
  res.render("saint-loup-en-images", {
    title: "Saint-Loup en images - Saint-Loup-Cammas"
  });
});
app.get("/developpement-durable", (req, res) => {
  res.render("developpement-durable", {
    title: "Développement durable - Saint-Loup-Cammas"
  });
});
app.get("/syndicats", (req, res) => {
  res.render("syndicats", {
    title: "Syndicats & représentations - Saint-Loup-Cammas"
  });
});
app.get("/investissements", (req, res) => {
  res.render("investissements", {
    title: "Investissements intercommunaux - Saint-Loup-Cammas"
  });
});
app.get("/confidentialite", (req, res) => {
  res.render("confidentialite", {
    title: "Politique de confidentialité - Saint-Loup-Cammas"
  });
});

/* =========================================
   SERVEUR
========================================= */

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Site lancé sur http://localhost:${PORT}`);
  });
}

module.exports = app;