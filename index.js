const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
const progressBar = document.getElementById("progress-bar");
let pseudo, email, password, confirmPass;

const errorDisplay = (tag /* pseudo, mail, mdp */, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    // Si c'est pas valide.
    container.classList.add("error");
    span.textContent = message; // Ajoute la class .error span// <span>message</span>
  } else {
    // Si c'est valide
    container.classList.remove("error");
    span.textContent = message;
  }
};

const pseudoChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
    pseudo = null; // Si il y a un message d'erreur, pseudo devient null (On lui vide sa valeur)
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null; // Si il y a un message d'erreur, pseudo devient null (On lui vide sa valeur)
  } else {
    // Si c'est valide
    errorDisplay("pseudo", "", true); // true enlève le message d'erreur
    pseudo = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    // Si c'est pas valide
    errorDisplay("email", "Le mail n'est pas valide");
    email = null; // Si il y a un message d'erreur, mail devient null (On lui vide sa valeur)
  } else {
    // Si c'est valide
    errorDisplay("email", "", true); // (tag, message, valid)
    email = value;
  }
};

const passwordChecker = (value) => {
  progressBar.classList = "";

  if (
    // Si jamais c'est différent de ceci
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
  ) {
    // alors il se passe ca
    errorDisplay(
      "password",
      "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = value;
  } else {
    // Si c'est valide
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = value;
  }
  if (confirmPass) confirmChecker(confirmPass); // Si jamais il y a quelque chose dans confirmPass alors tu peux me lancer confirmChecker
};

const confirmChecker = (value) => {
  if (value !== password) {
    errorDisplay("confirm", "Les mots de passe ne correspondent pas");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && email && password && confirmPass) {
    // Si tout les éléments sont true, renvoie moi dans la console.
    const data = {
      pseudo,
      email,
      password,
    };
    console.log(data);

    // Pour vider la valeur des inputs et de la progressBar.
    inputs.forEach((input) => (input.value = ""));
    progressBar.classList = "";

    // Pour éviter que la personne renvoie une seconde fois le formulaire.
    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validée !");
  } else {
    alert("veuillez remplir correctement les champs");
  }
});
