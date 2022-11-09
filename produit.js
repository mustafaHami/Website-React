var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var userAdmin = false;
var arrayMusicien;
var arrayMusicienDefault = [{ id: 1, surnom: "TRUMP", specialite: "ACCORDEONISTE", image: "image/accordéoniste.jpeg" }, { id: 2, surnom: "IVANKA", specialite: "PIANNISTE", image: "image/pianniste.jpeg" }, { id: 3, surnom: "KUSHNER", specialite: "PIANNISTE", image: "image/pianniste2.jpeg" }];

var arrayGroup;
// groupe par défaut pour afficher des groupe,
// contient le libelle,une description, une image et une liste de musicien associer à ce groupe
var arrayGroupDefault = [{ id: 1, libelle: "PIANNISTE", description: "c'est le groupe des pianniste", image: "image/piano.jpeg", musicienAssoc: [] }, { id: 2, libelle: "ACCORDEONISTE", description: "c'est le groupe des accordéo", image: "image/accordeon.jpeg", musicienAssoc: [] }];

var Connexion = function (_React$Component) {
  _inherits(Connexion, _React$Component);

  function Connexion(props) {
    _classCallCheck(this, Connexion);

    // création du state
    var _this = _possibleConstructorReturn(this, (Connexion.__proto__ || Object.getPrototypeOf(Connexion)).call(this, props));

    _this.state = {
      login: "",
      mdp: "" };
    //création des composant pour controlé la saisie et le submit
    _this.handleChange = _this.handleChange.bind(_this); // permet de lier les methodes
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(Connexion, [{
    key: "handleChange",
    value: function handleChange(event) {
      // dès le changement de l'une des inpute un récupère le nom et la valeur du input
      // Puis on met à jour le state
      var target = event.target;
      var value = target.value;
      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      if (this.state.login == 'admin' && this.state.mdp == "admin") {
        userAdmin = true;
        ReactDOM.render(React.createElement(Greeting, { isLoggedIn: true }), document.getElementById('bonjour'));
        ReactDOM.render(null, document.getElementById('musicienAndGroup'));
        ReactDOM.render(null, document.getElementById('connexion'));
      } else {
        userAdmin = false;
        ReactDOM.render(
        // Try changing to isLoggedIn={true}:
        React.createElement(Greeting, { isLoggedIn: false }), document.getElementById('bonjour'));
        ReactDOM.render(
        // Try changing to isLoggedIn={true}:
        null, document.getElementById('musicienAndGroup'));
      }
      event.preventDefault();
      // dès qu'il appuis sur connexion on affiche 
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement(
          "label",
          { "for": "" },
          "Login"
        ),
        React.createElement("input", { type: "text", name: "login", id: "inputLogin", value: this.state.login, onChange: this.handleChange }),
        React.createElement(
          "label",
          { "for": "" },
          "Mot de passe"
        ),
        React.createElement("input", { type: "password", name: "mdp", id: "inputMdp", value: this.state.mdp, onChange: this.handleChange }),
        React.createElement("br", null),
        React.createElement("input", { type: "submit", name: "btnConne", value: "Connexion", id: "btnConne" }),
        React.createElement("br", null)
      );
    }
  }]);

  return Connexion;
}(React.Component);

ReactDOM.render(React.createElement(Connexion, null), document.getElementById('connexion'));

var Menu = function (_React$Component2) {
  _inherits(Menu, _React$Component2);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: "AfficheMusicien",
    value: function AfficheMusicien() {

      appelAjaxMusicien("afficher");
    }
  }, {
    key: "AfficheGroupe",
    value: function AfficheGroupe() {
      appelAjaxGroupe("afficher");
    }
  }, {
    key: "AfficheDeconnexion",
    value: function AfficheDeconnexion() {
      ReactDOM.render(React.createElement(Connexion, null), document.getElementById('connexion'));
      ReactDOM.render(null, document.getElementById('bonjour'));
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
      ReactDOM.render(null, document.getElementById('musicienAndGroup'));
      userAdmin = false;
    }
  }, {
    key: "AfficheConnexion",
    value: function AfficheConnexion() {
      ReactDOM.render(null, document.getElementById("musicienAndGroup"));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "nav",
        null,
        React.createElement(
          "ul",
          null,
          React.createElement(
            "li",
            { onClick: function onClick() {
                return _this3.AfficheConnexion();
              } },
            "Connexion"
          ),
          React.createElement(
            "li",
            { onClick: function onClick() {
                return _this3.AfficheGroupe();
              } },
            "Groupes"
          ),
          React.createElement(
            "li",
            { onClick: function onClick() {
                return _this3.AfficheMusicien();
              } },
            "Musicien "
          ),
          React.createElement(
            "li",
            { onClick: function onClick() {
                return _this3.AfficheDeconnexion();
              } },
            " D\xE9connexion "
          )
        )
      );
    }
  }]);

  return Menu;
}(React.Component);

ReactDOM.render(React.createElement(Menu, null), document.getElementById('menu'));

// Employee Component
function AfficheButtonForAdmin(props) {
  return (
    // affichage que des boutons modifier et supprimer 
    // on affiche pas le bouton ajouter avec eux car
    // si l'on supprime tous les musiciens on perd c'est bouton et l'on pourra plus ajouter de musicien
    React.createElement(
      React.Fragment,
      null,
      React.createElement("input", { type: "button", value: "Modifier", className: "btnModifier", onClick: props.onClick1 }),
      React.createElement("input", { type: "button", value: "Supprimer", className: "btnSupprimer", onClick: props.onClick2 })
    )
  );
}
var modifMusiGroup = false;
// classe pour la création d'un musicien

var Musicien = function (_React$Component3) {
  _inherits(Musicien, _React$Component3);

  function Musicien() {
    _classCallCheck(this, Musicien);

    return _possibleConstructorReturn(this, (Musicien.__proto__ || Object.getPrototypeOf(Musicien)).apply(this, arguments));
  }

  _createClass(Musicien, [{
    key: "AffichePopup",
    value: function AffichePopup() {
      var _this5 = this;

      // affichage du popup
      var popup = React.createElement(
        React.Fragment,
        null,
        React.createElement("div", { "class": "overlay" }),
        React.createElement(
          "div",
          { className: "wrapper" },
          React.createElement(
            "button",
            { type: "button", className: "close", onClick: function onClick() {
                return _this5.Close();
              } },
            React.createElement(
              "span",
              null,
              "\xD7"
            )
          ),
          React.createElement(
            "div",
            { className: "modale" },
            React.createElement("img", { src: this.props.image, id: "imgMusicienPop" }),
            React.createElement(
              "p",
              { id: "surnom" },
              this.props.surnom
            ),
            React.createElement(
              "p",
              { id: "specialite" },
              this.props.specialite
            )
          )
        )
      );

      ReactDOM.render(popup, document.getElementById('popup'));
    }
  }, {
    key: "Close",
    value: function Close() {
      ReactDOM.render(null, document.getElementById('popup'));
    }
  }, {
    key: "SupprimerMusicien",
    value: function SupprimerMusicien() {
      // on parcours tous les musiciens 
      // on vérifi si le nom selectionné correspond à l'une des personne dans le tableau
      for (var i = 0; i < arrayMusicien.length; i++) {
        if (arrayMusicien[i].surnom == this.props.surnom) {
          arrayMusicien.splice(i, 1);
        }
      }
      for (var i = 0; i < arrayGroup.length; i++) {

        for (var n = 0; n < arrayGroup[i].musicienAssoc.length; n++) {

          if (arrayGroup[i].musicienAssoc[n].surnom == this.props.surnom) {
            arrayGroup[i].musicienAssoc.splice(n, 1);

            modifMusiGroup = true;
          }
        }
      }
      if (modifMusiGroup == true) {
        modifMusiGroup = false;
        alert("Suppression aussi du musicien dans le groupe ");
      }
      appelAjaxMusicien("supprimer");
      appelAjaxGroupe("supprimer");
      ReactDOM.render(
      // Try changing to isLoggedIn={true}:
      React.createElement(MusicienList, null), document.getElementById('musicienAndGroup'));
    }
  }, {
    key: "ModifierMusicien",
    value: function ModifierMusicien() {

      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
      ReactDOM.render(React.createElement(_ModifierMusicien, { surnom: this.props.surnom, image: this.props.image, specialite: this.props.specialite, id: this.props.id }), document.getElementById("ajoutMusicien"));
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      var _this6 = this;

      if (userAdmin == true) {
        return React.createElement(AfficheButtonForAdmin, {
          onClick1: function onClick1() {
            return _this6.ModifierMusicien();
          },
          onClick2: function onClick2() {
            return _this6.SupprimerMusicien();
          } });
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      return React.createElement(
        "div",
        { "class": "col-md-3" },
        React.createElement(
          "div",
          { "class": "card clickable", onClick: function onClick() {
              return _this7.AffichePopup();
            } },
          React.createElement(
            "div",
            { id: "card" },
            React.createElement("img", { src: this.props.image, "class": "card-img-top", alt: "" }),
            React.createElement(
              "div",
              { "class": "card-body" },
              React.createElement(
                "h4",
                { "class": "card-title" },
                this.props.surnom
              ),
              React.createElement(
                "p",
                { "class": "card-text" },
                React.createElement(
                  "i",
                  null,
                  this.props.specialite
                )
              )
            )
          )
        ),
        this.renderButton()
      );
    }
  }]);

  return Musicien;
}(React.Component);

// class pour la creation de la liste de musicien


var MusicienList = function (_React$Component4) {
  _inherits(MusicienList, _React$Component4);

  function MusicienList() {
    _classCallCheck(this, MusicienList);

    return _possibleConstructorReturn(this, (MusicienList.__proto__ || Object.getPrototypeOf(MusicienList)).apply(this, arguments));
  }

  _createClass(MusicienList, [{
    key: "AfficheAjouter",
    value: function AfficheAjouter() {
      ReactDOM.render(React.createElement(AjoutMusicien, null), document.getElementById("ajoutMusicien"));
    }
  }, {
    key: "ResetMusicien",
    value: function ResetMusicien() {
      // permet, en cas de suppression de tous les musiciens
      // rammener les musicien de base
      appelAjaxMusicien("reset");
    }
  }, {
    key: "rendBtnAJout",
    value: function rendBtnAJout() {
      var _this9 = this;

      if (userAdmin == true) {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement("input", { type: "button", value: "Ajouter", className: "btnAjouter", onClick: function onClick() {
              return _this9.AfficheAjouter();
            } }),
          React.createElement("input", { type: "button", value: "Reset Musicien", className: "btnResetMusicien", onClick: function onClick() {
              return _this9.ResetMusicien();
            } })
        );
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      // Array of <Employee>
      var listItems = arrayMusicien.map(function (e) {
        return React.createElement(Musicien, { surnom: e.surnom, specialite: e.specialite, image: e.image, id: e.id });
      });
      return React.createElement(
        "div",
        { "class": "row" },
        React.createElement(
          "div",
          { "class": "main-div" },
          React.createElement(
            "div",
            { "class": "btn" },
            this.rendBtnAJout()
          ),
          React.createElement(
            "div",
            { "class": "card col-md-12" },
            React.createElement(
              "div",
              { "class": "card-header" },
              React.createElement(
                "h1",
                null,
                React.createElement("i", { "class": "fas" }),
                "Liste des Musiciens"
              )
            ),
            React.createElement(
              "div",
              { "class": "card-body row" },
              listItems
            )
          )
        )
      );
    }
  }]);

  return MusicienList;
}(React.Component); // Render

var AjoutMusicien = function (_React$Component5) {
  _inherits(AjoutMusicien, _React$Component5);

  function AjoutMusicien(props) {
    _classCallCheck(this, AjoutMusicien);

    var _this10 = _possibleConstructorReturn(this, (AjoutMusicien.__proto__ || Object.getPrototypeOf(AjoutMusicien)).call(this, props));

    _this10.onImageChange = function (event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        var file = event.target.files[0];
        reader.onloadend = function () {
          _this10.setState({
            image: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    };

    _this10.state = {
      surnom: "",
      specialite: "",
      image: null
    };
    _this10.handleChange = _this10.handleChange.bind(_this10);
    _this10.handleSubmit2 = _this10.handleSubmit2.bind(_this10);
    _this10.onImageChange = _this10.onImageChange.bind(_this10);
    return _this10;
  }

  _createClass(AjoutMusicien, [{
    key: "handleChange",
    value: function handleChange(event) {
      var target = event.target;
      var value = target.value;

      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "handleSubmit2",
    value: function handleSubmit2(event) {
      var specialiteMaj = this.state.specialite;
      specialiteMaj = specialiteMaj.toUpperCase();

      var surnomlisteMaj = this.state.surnom;
      surnomlisteMaj = surnomlisteMaj.toUpperCase();

      var musicien = {
        id: arrayMusicien.length + 1,
        surnom: surnomlisteMaj,
        specialite: specialiteMaj,
        image: this.state.image
      };

      var existe = false;
      arrayMusicien.forEach(function (e) {
        if (e.surnom == surnomlisteMaj) {
          alert("Impossible d'ajouter deux fois le même musicien avec le même surnom");
          existe = true;
        }
      });

      if (existe == false) {
        arrayMusicien.push(musicien);

        this.setState({
          surnom: "",
          specialite: ""
        });
      } else {
        this.setState({
          surnom: "",
          specialite: ""
        });
      }
      appelAjaxMusicien("ajouter");
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
      ReactDOM.render(React.createElement(MusicienList, null), document.getElementById('musicienAndGroup'));
      event.preventDefault();
    }
  }, {
    key: "FermeModifieMusicien",
    value: function FermeModifieMusicien() {
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      return React.createElement(
        "form",
        { id: "formAjoutMusicien", onSubmit: this.handleSubmit2 },
        React.createElement(
          "label",
          { "for": "" },
          "Surnom"
        ),
        React.createElement("input", { type: "text", name: "surnom", id: "inputSurnom", value: this.state.surnom, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Sp\xE9cialit\xE9"
        ),
        React.createElement("input", { type: "text", name: "specialite", id: "inputSpecialite", value: this.state.specialite, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Image"
        ),
        React.createElement("input", { type: "file", id: "imgMusicien", name: "image", onChange: this.onImageChange }),
        React.createElement("br", null),
        React.createElement("input", { type: "submit", name: "btnAjout", value: "Ajouter", id: "btnAjout" }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnAnnuler", value: "Annuler", id: "btnModifierMusicien", onClick: function onClick() {
            return _this11.FermeModifieMusicien();
          } })
      );
    }
  }]);

  return AjoutMusicien;
}(React.Component);

var _ModifierMusicien = function (_React$Component6) {
  _inherits(_ModifierMusicien, _React$Component6);

  function _ModifierMusicien(props) {
    _classCallCheck(this, _ModifierMusicien);

    var _this12 = _possibleConstructorReturn(this, (_ModifierMusicien.__proto__ || Object.getPrototypeOf(_ModifierMusicien)).call(this, props));

    _this12.onImageChange = function (event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        var file = event.target.files[0];
        reader.onloadend = function () {
          _this12.setState({
            image: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    };

    _this12.state = {
      id: _this12.props.id,
      surnom: _this12.props.surnom,
      specialite: _this12.props.specialite,
      image: _this12.props.image,
      ancienSurnom: _this12.props.surnom
    };
    _this12.handleSubmit = _this12.handleSubmit.bind(_this12);
    _this12.handleChange = _this12.handleChange.bind(_this12);
    _this12.onImageChange = _this12.onImageChange.bind(_this12);

    return _this12;
  }

  _createClass(_ModifierMusicien, [{
    key: "handleChange",
    value: function handleChange(event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;

      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var specialiteMaj = this.state.specialite;
      specialiteMaj = specialiteMaj.toUpperCase();

      var surnomlisteMaj = this.state.surnom;
      surnomlisteMaj = surnomlisteMaj.toUpperCase();

      var modifeMusicien = {
        id: this.state.id,
        surnom: surnomlisteMaj,
        specialite: specialiteMaj,
        image: this.state.image
      };
      var musExiste = false;

      arrayMusicien.forEach(function (e) {
        if (e.surnom == surnomlisteMaj) {
          musExiste = true;
        }
      });
      if (musExiste == true) {
        alert("Impossible de modifier le Musicien : Surnom existant");
      } else {
        // modification de l'endroit du musicien dans le tableau
        for (var i = 0; i < arrayMusicien.length; i++) {
          if (arrayMusicien[i].id == this.state.id) {
            arrayMusicien.splice(i, 1, modifeMusicien);
          }
        }
        // modification dans le tableau des musiciens associer au groupe
        // je parcour le tableau du groupe puis celui du musicient puis si le musicien est dans ce groupe
        // je modifie le surnom du musicien
        // vérification de la modification du musicien dans le groupe
        for (var i = 0; i < arrayGroup.length; i++) {

          for (var n = 0; n < arrayGroup[i].musicienAssoc.length; n++) {
            if (arrayGroup[i].musicienAssoc[n].surnom == this.state.ancienSurnom) {
              arrayGroup[i].musicienAssoc.splice(n, 1, modifeMusicien);
              modifMusiGroup = true;
            }
          }
        }
        //
        appelAjaxMusicien("modifier");
        appelAjaxGroupe("modifier");
        ReactDOM.render(React.createElement(MusicienList, null), document.getElementById('musicienAndGroup'));
        ReactDOM.render(null, document.getElementById('ajoutMusicien'));
        if (modifMusiGroup == true) {
          modifMusiGroup = false;
          alert("Le musicien a aussi été modifié dans un des groupes");
        }
      }
    }
  }, {
    key: "FermeModifieMusicien",
    value: function FermeModifieMusicien() {
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      return React.createElement(
        "form",
        { id: "formAjoutMusicien" },
        React.createElement(
          "label",
          { "for": "" },
          "Surnom"
        ),
        React.createElement("input", { type: "text", name: "surnom", id: "inputSurnom", value: this.state.surnom, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Sp\xE9cialit\xE9"
        ),
        React.createElement("input", { type: "text", name: "specialite", id: "inputSpecialite", value: this.state.specialite, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Image"
        ),
        React.createElement("input", { type: "file", id: "imgMusicien", name: "image", onChange: this.onImageChange }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnAjout", value: "Modifier", id: "btnModifierMusicien", onClick: this.handleSubmit }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnAnnuler", value: "Annuler", id: "btnModifierMusicien", onClick: function onClick() {
            return _this13.FermeModifieMusicien();
          } })
      );
    }
  }]);

  return _ModifierMusicien;
}(React.Component);

function UserGreeting(props) {

  return React.createElement(
    "h1",
    null,
    "Bonjour Admin, Vous pouvez Ajouter,Modifier ou Supprimer des musiciens et les groupes"
  );
}

function GuestGreeting(props) {

  return React.createElement(
    "h4",
    null,
    "Bonjour l'Invit\xE9, Pour pouvoir Ajouter, Modifier ou Supprimer des musiciens et les groupes il va falloir ce connecter en tant qu'Admin"
  );
}

function Greeting(props) {
  var isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return React.createElement(UserGreeting, null);
  }
  return React.createElement(GuestGreeting, null);
}

function Vide(props) {
  return null;
}

window.onload = demarrer;

function demarrer() {
  var btnConn = $("#btnConn");
}
function verfiConnexion() {
  login = $("#inputLogin").val();
  mdp = $("#inputMdp").val();
  var obj = { login: login, password: mdp };
}

function appelAjaxMusicien(aff) {
  if (aff == "afficher") {
    $.ajax({
      url: "ajaxMusicien.php",
      type: "POST",
      data: {
        param: aff
      }
    }).done(recupRetourAffichageMusicien);

    aff = "recupGroupe";
    $.ajax({
      url: "ajaxGroup.php",
      type: "POST",
      data: {
        param: aff
      }
    }).done(recupRetourGroupe);
  } else if (aff == "ajouter" || aff == "supprimer" || aff == "modifier") {

    var json = JSON.stringify(arrayMusicien);

    $.ajax({
      url: "ajaxMusicien.php",
      type: "POST",
      data: {
        param: aff,
        param2: json
      }
    });
  } else if (aff == "reset") {
    var json = JSON.stringify(arrayMusicienDefault);
    $.ajax({
      url: "ajaxMusicien.php",
      type: "POST",
      data: {
        param: aff,
        param2: json
      }
    }).done(recupRetourAffichageMusicien);
  }
}

// cette fonction va permettre de récuperer la tableau de groupe
function recupRetourGroupe(arg) {

  var obj = JSON.parse(arg);
  arrayGroup = obj;
}
function recupRetourAffichageMusicien(arg) {

  var obj = JSON.parse(arg);
  arrayMusicien = obj;
  ReactDOM.render(React.createElement(MusicienList, null), document.getElementById("musicienAndGroup"));
  ReactDOM.render(null, document.getElementById("ajoutMusicien"));
}

////////////////////// PARTIE GROUPE ///////////////////////////////:


// fonction d'affichage des musicient dans le groupes

var GroupeMusicien = function (_React$Component7) {
  _inherits(GroupeMusicien, _React$Component7);

  function GroupeMusicien() {
    _classCallCheck(this, GroupeMusicien);

    return _possibleConstructorReturn(this, (GroupeMusicien.__proto__ || Object.getPrototypeOf(GroupeMusicien)).apply(this, arguments));
  }

  _createClass(GroupeMusicien, [{
    key: "render",
    value: function render() {
      var _this15 = this;

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "div",
          { "class": "card", onClick: function onClick() {
              return _this15.AffichePopupGroupe();
            } },
          React.createElement(
            "div",
            { id: "card " },
            React.createElement("img", { src: this.props.image, "class": "card-img-top", alt: "" }),
            React.createElement(
              "div",
              { "class": "card-body" },
              React.createElement(
                "h4",
                { "class": "card-title" },
                this.props.surnom
              ),
              React.createElement(
                "p",
                { "class": "card-text" },
                React.createElement(
                  "i",
                  null,
                  this.props.specialite
                )
              )
            )
          )
        )
      );
    }
  }]);

  return GroupeMusicien;
}(React.Component);
// class représentant un groupe


var Groupe = function (_React$Component8) {
  _inherits(Groupe, _React$Component8);

  function Groupe() {
    _classCallCheck(this, Groupe);

    return _possibleConstructorReturn(this, (Groupe.__proto__ || Object.getPrototypeOf(Groupe)).apply(this, arguments));
  }

  _createClass(Groupe, [{
    key: "Close",
    value: function Close() {
      ReactDOM.render(null, document.getElementById('popup'));
    }
  }, {
    key: "AffichePopupGroupe",
    value: function AffichePopupGroupe() {
      var _this17 = this;

      // affichage du popup
      var popup = React.createElement(
        React.Fragment,
        null,
        React.createElement("div", { "class": "overlay" }),
        React.createElement(
          "div",
          { className: "wrapper" },
          React.createElement(
            "button",
            { type: "button", className: "close", onClick: function onClick() {
                return _this17.Close();
              } },
            React.createElement(
              "span",
              null,
              "\xD7"
            )
          ),
          React.createElement(
            "div",
            { className: "modale" },
            React.createElement("img", { src: this.props.image, id: "imgGroupePop" }),
            React.createElement(
              "p",
              { id: "libelle" },
              this.props.libelle
            ),
            React.createElement(
              "p",
              { id: "description" },
              this.props.description
            ),
            React.createElement("ul", null)
          )
        )
      );

      ReactDOM.render(popup, document.getElementById('popup'));
    }

    // supprimer le groupe

  }, {
    key: "SupprimerGroupe",
    value: function SupprimerGroupe() {
      // on parcours tous les musiciens 
      // on vérifi si le nom selectionné correspond à l'une des personne dans le tableau
      for (var i = 0; i < arrayGroup.length; i++) {
        if (arrayGroup[i].libelle == this.props.libelle) {
          arrayGroup.splice(i, 1);
        }
      }
      appelAjaxGroupe("supprimer");
      ReactDOM.render(
      // Try changing to isLoggedIn={true}:
      React.createElement(GroupList, null), document.getElementById('musicienAndGroup'));
    }
  }, {
    key: "ModifierGroupe",
    value: function ModifierGroupe() {
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));

      ReactDOM.render(React.createElement(_ModifierGroupe, { libelle: this.props.libelle, image: this.props.image, description: this.props.description, id: this.props.id, musicienAssoc: this.props.musicienAssoc }), document.getElementById("ajoutMusicien"));
    }
  }, {
    key: "renderButton",
    value: function renderButton() {
      var _this18 = this;

      if (userAdmin == true) {
        return React.createElement(AfficheButtonForAdmin, {
          onClick1: function onClick1() {
            return _this18.ModifierGroupe();
          },
          onClick2: function onClick2() {
            return _this18.SupprimerGroupe();
          } });
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this19 = this;

      // j'enregsitre la liste des musiciens dans liste
      var liste = this.props.musicienAssoc;
      // parcours la liste des musiciens puis je les affiches
      var listeMusicien = liste.map(function (e) {
        return React.createElement(GroupeMusicien, { surnom: e.surnom, specialite: e.specialite, image: e.image, id: e.id });
      });

      return React.createElement(
        "div",
        { "class": "col-md-3" },
        React.createElement(
          "div",
          { "class": "btn" },
          this.renderButton()
        ),
        React.createElement(
          "div",
          { "class": "card clickable", onClick: function onClick() {
              return _this19.AffichePopupGroupe();
            } },
          React.createElement(
            "div",
            { id: "card" },
            React.createElement("img", { src: this.props.image, "class": "card-img-top", alt: "" }),
            React.createElement(
              "div",
              { "class": "card-body" },
              React.createElement(
                "h4",
                { "class": "card-title" },
                this.props.libelle
              ),
              React.createElement(
                "p",
                { "class": "card-text" },
                React.createElement(
                  "i",
                  null,
                  this.props.description
                )
              )
            ),
            React.createElement("div", { "class": "" }),
            React.createElement(
              "h5",
              null,
              "Liste des musiciens"
            ),
            listeMusicien
          )
        )
      );
    }
  }]);

  return Groupe;
}(React.Component);

// class de toutes les groupes


var GroupList = function (_React$Component9) {
  _inherits(GroupList, _React$Component9);

  function GroupList() {
    _classCallCheck(this, GroupList);

    return _possibleConstructorReturn(this, (GroupList.__proto__ || Object.getPrototypeOf(GroupList)).apply(this, arguments));
  }

  _createClass(GroupList, [{
    key: "AfficheAjouter",

    // affiche l'interface d'ajout
    value: function AfficheAjouter() {

      ReactDOM.render(React.createElement(AjoutGroupe, null), document.getElementById("ajoutMusicien"));
    }
    // affiche l'interface d'association

  }, {
    key: "AssociationMusicienGroupe",
    value: function AssociationMusicienGroupe() {
      ReactDOM.render(React.createElement(AssocMusGroup, null), document.getElementById("ajoutMusicien"));
    }
  }, {
    key: "AfficheSupprimer",
    value: function AfficheSupprimer() {
      ReactDOM.render(React.createElement(SupprimerMusicienGroupe, null), document.getElementById("ajoutMusicien"));
    }
  }, {
    key: "ResetGroupe",
    value: function ResetGroupe() {
      // permet, en cas de suppression de tous le groupes
      // rammener les groupes de base

      appelAjaxGroupe("reset");
    }
  }, {
    key: "rendBtnAJout",
    value: function rendBtnAJout() {
      var _this21 = this;

      if (userAdmin == true) {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { "class": "btn" },
            React.createElement("input", { type: "button", value: "Ajouter un Nouveau Groupe", className: "btnAjouter", onClick: function onClick() {
                return _this21.AfficheAjouter();
              } }),
            React.createElement("input", { type: "button", value: "Associer Musicien Groupe", className: "btnAssocier", onClick: function onClick() {
                return _this21.AssociationMusicienGroupe();
              } }),
            React.createElement("input", { type: "button", value: "Supprimer un musicien d'un Groupe", className: "btnSupprimer", onClick: function onClick() {
                return _this21.AfficheSupprimer();
              } }),
            React.createElement("input", { type: "button", value: "Reset Groupe", className: "btnResetGroupe", onClick: function onClick() {
                return _this21.ResetGroupe();
              } })
          )
        );
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      // enregistrement dans listeItems la une liste de groupes
      var listItems = arrayGroup.map(function (e) {
        return React.createElement(Groupe, { libelle: e.libelle, description: e.description, image: e.image, id: e.id, musicienAssoc: e.musicienAssoc });
      });

      // enregistrement dans listeMusicien la liste de tous les musiciens
      return React.createElement(
        "div",
        { "class": "row" },
        React.createElement(
          "div",
          { "class": "main-div" },
          this.rendBtnAJout(),
          React.createElement(
            "div",
            { "class": "card col-md-12" },
            React.createElement(
              "div",
              { "class": "card-header" },
              React.createElement(
                "h1",
                null,
                React.createElement("i", { "class": "fas" }),
                "Liste des Groupe"
              )
            ),
            React.createElement(
              "div",
              { "class": "card-body row" },
              listItems
            )
          )
        )
      );
    }
  }]);

  return GroupList;
}(React.Component);
// class suppression musicien dans un groupe


var SupprimerMusicienGroupe = function (_React$Component10) {
  _inherits(SupprimerMusicienGroupe, _React$Component10);

  function SupprimerMusicienGroupe(props) {
    _classCallCheck(this, SupprimerMusicienGroupe);

    var _this22 = _possibleConstructorReturn(this, (SupprimerMusicienGroupe.__proto__ || Object.getPrototypeOf(SupprimerMusicienGroupe)).call(this, props));

    _this22.state = {
      nomMusicien: "",
      libelleGroupe: ""
    };
    _this22.handleChange = _this22.handleChange.bind(_this22);
    _this22.handleSubmit = _this22.handleSubmit.bind(_this22);
    return _this22;
  }

  _createClass(SupprimerMusicienGroupe, [{
    key: "handleChange",
    value: function handleChange(event) {
      var target = event.target;
      var value = target.value;

      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var libelleGroupeMaj = this.state.libelleGroupe;
      libelleGroupeMaj = libelleGroupeMaj.toUpperCase();

      var nomMusicienMaj = this.state.nomMusicien;
      nomMusicienMaj = nomMusicienMaj.toUpperCase();

      // on parcours le tableau de groupe
      var groupeExiste = false;
      var groupeAssoc;
      arrayGroup.forEach(function (eg) {
        if (eg.libelle == libelleGroupeMaj) {
          groupeExiste = true;
          groupeAssoc = eg;
        }
      });
      // vérification du groupe
      if (groupeExiste == false) {
        alert("Suppresion Impossible car Groupe inexistant. Pour pouvoir supprimer, il faut que le groupe et le musicien soit existant");
      } else {
        groupeExiste = false;

        var musicienExiste = false;
        var musicienGroupeAssoc;
        // si groupe existant vérification du musicien
        arrayMusicien.forEach(function (em) {
          // si musicien existe, ajout dans le tableau de musicien dans groupe le musicien 
          if (em.surnom == nomMusicienMaj) {
            musicienExiste = true;
            musicienGroupeAssoc = em;
          }
        });

        if (musicienExiste == false) {
          alert("Suppression Impossible car Musicien inexistant. Pour pouvoir supprimer, il faut que le groupe et le musicien soit existant");
        } else {

          musicienExiste = false;
          groupeAssoc.musicienAssoc.forEach(function (e) {
            if (e.surnom == musicienGroupeAssoc.surnom) {
              musicienExiste = true;
            }
          });
          if (musicienExiste == false) {
            alert("Suppression Impossible car le musicien n'est pas associé à ce groupe");
          } else {
            // supprimer un musicien dans le groupe
            // parcour du tableau de groupe


            for (var i = 0; i < arrayGroup.length; i++) {
              // groupe trouvé parcours des musiciens
              if (arrayGroup[i].libelle == groupeAssoc.libelle) {

                for (var n = 0; n < arrayGroup[i].musicienAssoc.length; n++) {
                  // si surnom du musicien dans le groupe correspond à celui passé en paramétre
                  if (arrayGroup[i].musicienAssoc[n].surnom == musicienGroupeAssoc.surnom) {
                    // suppression du musicien
                    arrayGroup[i].musicienAssoc.splice(n, 1);
                  }
                }
              }
            }
            musicienExiste = false;
            appelAjaxGroupe("supprimer");
            appelAjaxGroupe("afficher");
          }
        }
      }
    }
  }, {
    key: "FermeModifieGroupe",
    value: function FermeModifieGroupe() {
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this23 = this;

      var data = this.state.image;
      return React.createElement(
        "form",
        { id: "formAjoutMusicien" },
        React.createElement(
          "label",
          { "for": "" },
          "Nom du Musicien \xE0 supprimer"
        ),
        React.createElement("input", { type: "text", name: "nomMusicien", value: this.state.nomMusicien, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Libelle du Groupe"
        ),
        React.createElement("input", { type: "text", name: "libelleGroupe", value: this.state.libelleGroupe, onChange: this.handleChange, required: true }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnSupp", value: "Supprimer", id: "btnAjout", onClick: this.handleSubmit }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnAnnuler", value: "Annuler", id: "btnModifierMusicien", onClick: function onClick() {
            return _this23.FermeModifieGroupe();
          } })
      );
    }
  }]);

  return SupprimerMusicienGroupe;
}(React.Component);
// la class d'association d'un musicien à un groupe


var AssocMusGroup = function (_React$Component11) {
  _inherits(AssocMusGroup, _React$Component11);

  function AssocMusGroup(props) {
    _classCallCheck(this, AssocMusGroup);

    var _this24 = _possibleConstructorReturn(this, (AssocMusGroup.__proto__ || Object.getPrototypeOf(AssocMusGroup)).call(this, props));

    _this24.state = {
      nomMusicien: "",
      libelleGroupe: ""
    };
    _this24.handleChange = _this24.handleChange.bind(_this24);
    _this24.handleSubmit = _this24.handleSubmit.bind(_this24);
    return _this24;
  }

  _createClass(AssocMusGroup, [{
    key: "handleChange",
    value: function handleChange(event) {
      var target = event.target;
      var value = target.value;

      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var libelleGroupeMaj = this.state.libelleGroupe;
      libelleGroupeMaj = libelleGroupeMaj.toUpperCase();

      var nomMusicienMaj = this.state.nomMusicien;
      nomMusicienMaj = nomMusicienMaj.toUpperCase();

      // on parcours le tableau de groupe
      var groupeExiste = false;
      var groupeAssoc;
      arrayGroup.forEach(function (eg) {
        if (eg.libelle == libelleGroupeMaj) {
          groupeExiste = true;
          groupeAssoc = eg;
        }
      });
      // vérification du groupe
      if (groupeExiste == false) {
        alert("Ajout Impossible car Groupe inexistant. Pour pouvoir associer, il faut que le groupe et le musicien soit existant");
      } else {
        groupeExiste = false;

        var musicienExiste = false;
        var musicienGroupeAssoc;
        // si groupe existant vérification du musicien
        arrayMusicien.forEach(function (em) {
          // si musicien existe, ajout dans le tableau de musicien dans groupe le musicien 
          if (em.surnom == nomMusicienMaj) {
            musicienExiste = true;
            musicienGroupeAssoc = em;
          }
        });

        if (musicienExiste == false) {
          alert("Ajout Impossible car Musicien inexistant. Pour pouvoir associer, il faut que le groupe et le musicien soit existant");
        } else {
          musicienExiste = false;
          groupeAssoc.musicienAssoc.forEach(function (e) {
            if (e.surnom == musicienGroupeAssoc.surnom) {
              musicienExiste = true;
            }
          });
          if (musicienExiste == true) {
            alert("Association Impossible car le musicien est déjà associé à ce groupe");
            musicienExiste = false;
          } else {
            groupeAssoc.musicienAssoc.push(musicienGroupeAssoc);
            appelAjaxGroupe("ajouter");
            appelAjaxGroupe("afficher");
          }
        }
      }
      event.preventDefault();
    }
  }, {
    key: "FermeModifieGroupe",
    value: function FermeModifieGroupe() {
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this25 = this;

      var data = this.state.image;
      return React.createElement(
        "form",
        { id: "formAjoutMusicien", onSubmit: this.handleSubmit },
        React.createElement(
          "label",
          { "for": "" },
          "Nom du Musicien"
        ),
        React.createElement("input", { type: "text", name: "nomMusicien", value: this.state.nomMusicien, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Libelle du Groupe"
        ),
        React.createElement("input", { type: "text", name: "libelleGroupe", value: this.state.libelleGroupe, onChange: this.handleChange, required: true }),
        React.createElement("br", null),
        React.createElement("input", { type: "submit", name: "btnAssoc", value: "Associer", id: "btnAjout" }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnAnnuler", value: "Annuler", id: "btnModifierMusicien", onClick: function onClick() {
            return _this25.FermeModifieGroupe();
          } })
      );
    }
  }]);

  return AssocMusGroup;
}(React.Component);

// la classe d'ajout d'un groupe


var AjoutGroupe = function (_React$Component12) {
  _inherits(AjoutGroupe, _React$Component12);

  function AjoutGroupe(props) {
    _classCallCheck(this, AjoutGroupe);

    var _this26 = _possibleConstructorReturn(this, (AjoutGroupe.__proto__ || Object.getPrototypeOf(AjoutGroupe)).call(this, props));

    _this26.onImageChange = function (event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        var file = event.target.files[0];
        reader.onloadend = function () {
          _this26.setState({
            image: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    };

    _this26.state = {
      libelle: "",
      description: "",
      image: null
    };
    _this26.handleChange = _this26.handleChange.bind(_this26);
    _this26.handleSubmit = _this26.handleSubmit.bind(_this26);
    _this26.onImageChange = _this26.onImageChange.bind(_this26);
    return _this26;
  }

  _createClass(AjoutGroupe, [{
    key: "handleChange",
    value: function handleChange(event) {
      var target = event.target;
      var value = target.value;

      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this27 = this;

      var libeMaj = this.state.libelle;
      libeMaj = libeMaj.toUpperCase();

      var groupe = {
        id: arrayGroup.length + 1,
        libelle: libeMaj,
        description: this.state.description,
        image: this.state.image,
        musicienAssoc: []
      };

      var existe = false;
      arrayGroup.forEach(function (e) {

        // vérification de l'existance du groupe
        if (e.libelle == _this27.state.libelle) {
          alert("Impossble d'ajouter deux fois le même groupe avec le même libelle");
          existe = true;
        }
      });

      if (existe == false) {
        arrayGroup.push(groupe);
        appelAjaxGroupe("ajouter");
        this.setState({
          libelle: "",
          description: ""
        });
      } else {
        this.setState({
          libelle: "",
          description: ""
        });
      }

      ReactDOM.render(React.createElement(GroupList, null), document.getElementById("musicienAndGroup"));
      ReactDOM.render(null, document.getElementById("ajoutMusicien"));
      event.preventDefault();
    }
  }, {
    key: "FermeModifieGroupe",
    value: function FermeModifieGroupe() {
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this28 = this;

      var data = this.state.image;
      return React.createElement(
        "form",
        { id: "formAjoutMusicien" },
        React.createElement(
          "label",
          { "for": "" },
          "Libelle"
        ),
        React.createElement("input", { type: "text", name: "libelle", id: "inputlibelle", value: this.state.libelle, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Description"
        ),
        React.createElement("input", { type: "text", name: "description", id: "inputDescription", value: this.state.description, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Image"
        ),
        React.createElement("input", { type: "file", id: "imgMusicien", name: "image", onChange: this.onImageChange }),
        React.createElement("br", null),
        React.createElement("input", { type: "submit", name: "btnAjout", value: "Ajouter", id: "btnAjout", onClick: this.handleSubmit }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnAnnuler", value: "Annuler", id: "btnModifierMusicien", onClick: function onClick() {
            return _this28.FermeModifieGroupe();
          } })
      );
    }
  }]);

  return AjoutGroupe;
}(React.Component);

// class de modification d'un groupe


var _ModifierGroupe = function (_React$Component13) {
  _inherits(_ModifierGroupe, _React$Component13);

  function _ModifierGroupe(props) {
    _classCallCheck(this, _ModifierGroupe);

    var _this29 = _possibleConstructorReturn(this, (_ModifierGroupe.__proto__ || Object.getPrototypeOf(_ModifierGroupe)).call(this, props));

    _this29.onImageChange = function (event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        var file = event.target.files[0];
        reader.onloadend = function () {
          _this29.setState({
            image: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    };

    _this29.state = {
      id: _this29.props.id,
      libelle: _this29.props.libelle,
      description: _this29.props.description,
      image: _this29.props.image,
      musicienAssoc: _this29.props.musicienAssoc
    };
    _this29.handleSubmit = _this29.handleSubmit.bind(_this29);
    _this29.handleChange = _this29.handleChange.bind(_this29);
    _this29.onImageChange = _this29.onImageChange.bind(_this29);

    return _this29;
  }

  _createClass(_ModifierGroupe, [{
    key: "handleChange",
    value: function handleChange(event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;

      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var libMaj = this.state.libelle;
      libMaj = libMaj.toUpperCase();
      var modifeGroupe = {
        id: this.state.id,
        libelle: libMaj,
        description: this.state.description,
        image: this.state.image,
        musicienAssoc: this.state.musicienAssoc
      };
      var groupExiste = false;

      arrayGroup.forEach(function (e) {
        if (e.libelle == libMaj) {
          groupExiste = true;
        }
      });
      if (groupExiste == true) {
        alert("Impossible de changer le libelle : Libelle existant");
      } else {
        for (var i = 0; i < arrayGroup.length; i++) {
          if (arrayGroup[i].id == this.state.id) {
            arrayGroup.splice(i, 1, modifeGroupe);
          }
        }
        appelAjaxGroupe("modifier");

        ReactDOM.render(React.createElement(GroupList, null), document.getElementById('musicienAndGroup'));
        ReactDOM.render(null, document.getElementById('ajoutMusicien'));
      }
    }
  }, {
    key: "FermeModifieGroupe",
    value: function FermeModifieGroupe() {
      ReactDOM.render(null, document.getElementById('ajoutMusicien'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this30 = this;

      return React.createElement(
        "form",
        { id: "formAjoutMusicien" },
        React.createElement(
          "label",
          { "for": "" },
          "Libelle"
        ),
        React.createElement("input", { type: "text", name: "libelle", id: "inputlibelle", value: this.state.libelle, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Description"
        ),
        React.createElement("input", { type: "text", name: "description", id: "inputDescription", value: this.state.description, onChange: this.handleChange, required: true }),
        React.createElement(
          "label",
          { "for": "" },
          "Image"
        ),
        React.createElement("input", { type: "file", id: "imgGroupe", name: "image", onChange: this.onImageChange }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnAjout", value: "Modifier", id: "btnModifierMusicien", onClick: this.handleSubmit }),
        React.createElement("br", null),
        React.createElement("input", { type: "", name: "btnAnnuler", value: "Annuler", id: "btnModifierMusicien", onClick: function onClick() {
            return _this30.FermeModifieGroupe();
          } })
      );
    }
  }]);

  return _ModifierGroupe;
}(React.Component);

function appelAjaxGroupe(aff) {

  if (aff == "afficher") {

    aff = "recupMusicien";
    $.ajax({
      url: "ajaxGroup.php",
      type: "POST",
      data: {
        param: aff
      }
    }).done(recupMusicienRetourAffichageGroupe);

    aff = "recupGroupe";
    $.ajax({
      url: "ajaxGroup.php",
      type: "POST",
      data: {
        param: aff
      }
    }).done(recupRetourAffichageGroupe);
  } else if (aff == "ajouter" || aff == "modifier" || aff == "supprimer") {
    var json = JSON.stringify(arrayGroup);

    $.ajax({
      url: "ajaxGroup.php",
      type: "POST",
      data: {
        param: aff,
        param2: json
      }
    });
  } else if (aff == "reset") {
    var json = JSON.stringify(arrayGroupDefault);
    $.ajax({
      url: "ajaxGroup.php",
      type: "POST",
      data: {
        param: aff,
        param2: json
      }
    }).done(recupRetourAffichageGroupe);
  }
}
function recupMusicienRetourAffichageGroupe(arg) {
  var obj = JSON.parse(arg);
  arrayMusicien = obj;
}

function recupRetourAffichageGroupe(arg) {

  var obj = JSON.parse(arg);
  arrayGroup = obj;

  ReactDOM.render(null, document.getElementById("musicienAndGroup"));
  ReactDOM.render(React.createElement(GroupList, null), document.getElementById("musicienAndGroup"));
}