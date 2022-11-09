var userAdmin = false;
    var arrayMusicien ;
    var arrayMusicienDefault = [        
      { id: 1, surnom: "TRUMP", specialite: "ACCORDEONISTE" ,image : "image/accordéoniste.jpeg"},        
      { id: 2, surnom: "IVANKA", specialite: "PIANNISTE", image : "image/pianniste.jpeg"},        
      { id: 3, surnom: "KUSHNER", specialite: "PIANNISTE" , image : "image/pianniste2.jpeg"}    
    ];

    var arrayGroup;
    // groupe par défaut pour afficher des groupe,
    // contient le libelle,une description, une image et une liste de musicien associer à ce groupe
    var arrayGroupDefault = [
        {id : 1 , libelle : "PIANNISTE" , description : "c'est le groupe des pianniste", image : "image/piano.jpeg", musicienAssoc : []},
        {id : 2 , libelle : "ACCORDEONISTE" , description : "c'est le groupe des accordéo",image : "image/accordeon.jpeg",musicienAssoc : []}
    ];
    class Connexion extends React.Component {
      constructor(props){
        super(props);
        // création du state
        this.state = {
          login : "",
          mdp : "" };
          //création des composant pour controlé la saisie et le submit
        this.handleChange = this.handleChange.bind(this); // permet de lier les methodes
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
    
      handleChange(event){
        // dès le changement de l'une des inpute un récupère le nom et la valeur du input
        // Puis on met à jour le state
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name] : value});
      }
      handleSubmit(event){
        if(this.state.login == 'admin' && this.state.mdp =="admin"){
          userAdmin = true;
          ReactDOM.render(
           
            <Greeting isLoggedIn={true} />,
            document.getElementById('bonjour'),
            );
            ReactDOM.render(
            
              null,
              document.getElementById('musicienAndGroup')
            );
            ReactDOM.render(
              
              null,
              document.getElementById('connexion')
            );
          
        }else{
          userAdmin = false;
          ReactDOM.render(
            // Try changing to isLoggedIn={true}:
            <Greeting isLoggedIn={false} />,
            document.getElementById('bonjour'),
          );
          ReactDOM.render(
            // Try changing to isLoggedIn={true}:
            null,
            document.getElementById('musicienAndGroup')
          )
        
        }
        event.preventDefault(); 
        // dès qu'il appuis sur connexion on affiche 
      
      }
      render(){
        return (
          <form onSubmit={this.handleSubmit}>
    
          <label for="">Login</label>
            <input type="text" name="login" id="inputLogin" value={this.state.login} onChange={this.handleChange}/>
          
          <label for="">Mot de passe</label>
            <input type="password" name ="mdp" id="inputMdp" value={this.state.mdp} onChange={this.handleChange}/><br></br>
          
            <input type="submit" name="btnConne" value="Connexion" id="btnConne" /><br></br>
      </form>
        );
      }
    }
    
    ReactDOM.render(
      <Connexion></Connexion>,document.getElementById('connexion')
    );
class Menu extends React.Component{

    AfficheMusicien(){
      
        appelAjaxMusicien("afficher")
    }
    AfficheGroupe(){
        appelAjaxGroupe("afficher")
    
    }
    AfficheDeconnexion(){
      ReactDOM.render(
        <Connexion></Connexion>,document.getElementById('connexion')
      );
      ReactDOM.render(
        null,document.getElementById('bonjour')
      );
      ReactDOM.render(
        null,document.getElementById('ajoutMusicien')
      );
      ReactDOM.render(
        null,document.getElementById('musicienAndGroup')
      );
      userAdmin = false
    }
    AfficheConnexion(){
      ReactDOM.render(
        null,document.getElementById("musicienAndGroup")
      );
    }
    render(){
      return(
        <nav>
        <ul>
          <li onClick={()=> this.AfficheConnexion()} >Connexion</li>
          <li onClick={()=> this.AfficheGroupe()}>Groupes</li>
          <li onClick={()=> this.AfficheMusicien()}>Musicien </li>
          <li onClick={()=> this.AfficheDeconnexion()}> Déconnexion </li>
        </ul>
    </nav>
      );
    }
  }
  
  ReactDOM.render(
  <Menu></Menu>,  document.getElementById('menu')
  );


  // Employee Component
  function AfficheButtonForAdmin(props){
    return (
    // affichage que des boutons modifier et supprimer 
    // on affiche pas le bouton ajouter avec eux car
    // si l'on supprime tous les musiciens on perd c'est bouton et l'on pourra plus ajouter de musicien
      <React.Fragment><input type ="button" value="Modifier" className="btnModifier" onClick={props.onClick1}/> 
      <input type ="button" value="Supprimer" className="btnSupprimer" onClick={props.onClick2}/>
      </React.Fragment>
    );
  }
  var modifMusiGroup = false; 
  // classe pour la création d'un musicien
  class Musicien extends React.Component {

    AffichePopup(){
        // affichage du popup
      const popup = <React.Fragment>
  
      <div class = "overlay"/>
      <div className = "wrapper">
            <button type="button" className="close" onClick={()=> this.Close()}>
                  <span>&times;</span>
            </button>
          <div className="modale">
              <img src={this.props.image} id="imgMusicienPop"></img>
            <p id="surnom">{this.props.surnom}</p>
            <p id="specialite">{this.props.specialite}</p>
          </div>
      </div>
      </React.Fragment>
  
          ReactDOM.render(
            popup,
            document.getElementById('popup')
          );
    }
    Close(){
      ReactDOM.render(
        null,
        document.getElementById('popup')
      );
    }
  
    SupprimerMusicien(){
      // on parcours tous les musiciens 
      // on vérifi si le nom selectionné correspond à l'une des personne dans le tableau
      for(var i = 0; i < arrayMusicien.length; i++ ){
        if (arrayMusicien[i].surnom == this.props.surnom){
          arrayMusicien.splice(i,1);
        }
      }
      for(var i = 0; i < arrayGroup.length; i++ ){

        for(var n = 0; n < arrayGroup[i].musicienAssoc.length; n++ ){

          if(arrayGroup[i].musicienAssoc[n].surnom == this.props.surnom){
            arrayGroup[i].musicienAssoc.splice(n, 1);

            modifMusiGroup = true;
          }
        }
      }
      if(modifMusiGroup == true){
        modifMusiGroup = false;
        alert("Suppression aussi du musicien dans le groupe ")
      }
      appelAjaxMusicien("supprimer");
      appelAjaxGroupe("supprimer")
      ReactDOM.render(
        // Try changing to isLoggedIn={true}:
        <MusicienList/>,
        document.getElementById('musicienAndGroup')
      );
  
    }
   
    ModifierMusicien(){  
   
      ReactDOM.render(
        null,document.getElementById('ajoutMusicien')
      );
      ReactDOM.render(<ModifierMusicien surnom = {this.props.surnom} image = {this.props.image} specialite ={this.props.specialite} id = {this.props.id} ></ModifierMusicien>, document.getElementById("ajoutMusicien"));
 
    }
    renderButton(){
        
        if(userAdmin == true){
          return( <AfficheButtonForAdmin
          onClick1 = {()=> this.ModifierMusicien()}
          onClick2 = {()=> this.SupprimerMusicien()}/>
      );
          }else{
            return(
              null
            )
          }
  
    }
    render() {
      return (
    
        <div class="col-md-3">
            <div class="card clickable" onClick={()=> this.AffichePopup()}>
            <div id="card">
            <img src={this.props.image} class="card-img-top" alt=""/>
                <div class="card-body">
                    <h4 class="card-title">{this.props.surnom}</h4>
                    <p class="card-text"><i>{this.props.specialite}</i></p>
                    
                </div> 
                </div> 
            </div>
            {this.renderButton()}
          </div>
                
      
      );
    }
  }
  
  // class pour la creation de la liste de musicien
  class MusicienList extends React.Component {
  
    AfficheAjouter(){
      ReactDOM.render(<AjoutMusicien></AjoutMusicien>, document.getElementById("ajoutMusicien"));
    }
    ResetMusicien(){
        // permet, en cas de suppression de tous les musiciens
        // rammener les musicien de base
        appelAjaxMusicien("reset")
    }
    rendBtnAJout(){
        if(userAdmin == true){
          return( <React.Fragment>
                <input type ="button" value="Ajouter" className="btnAjouter" onClick={() => this.AfficheAjouter()}/>

                <input type ="button" value="Reset Musicien" className="btnResetMusicien" onClick={() => this.ResetMusicien()}/>
          </React.Fragment>
          );
          }else{
            return(
              null
            )
          }
    }
    render() {
      // Array of <Employee>
      var listItems = arrayMusicien.map(e => (
        <Musicien surnom={e.surnom} specialite={e.specialite} image ={e.image} id = {e.id}/>
      ));
      return (
          <div class="row">
                  <div class="main-div">
                  <div class="btn">
                    {this.rendBtnAJout()}
                  </div>
                 
                  {/* debut du block body */}
                    <div class="card col-md-12">
                      <div class="card-header">
                        <h1><i class="fas"></i>Liste des Musiciens</h1>
                      </div>
                      <div class="card-body row">
                        
                        {listItems}
                      </div>
                </div>
              </div>
          </div>
        );
    }
  }// Render
  
  class AjoutMusicien extends React.Component{
    constructor(props){
      super(props);
      this.state ={
        surnom : "",
        specialite : "",
        image : null,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit2 = this.handleSubmit2.bind(this);
      this.onImageChange = this.onImageChange.bind(this)
    }
  
    onImageChange = (event) => {
      if(event.target.files && event.target.files[0]){
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend= () => {
          this.setState({
            image : reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
      
    }
    handleChange(event){
      const target = event.target;
      const value = target.value;
      
      const name = target.name;
        this.setState({[name] : value});
  
      
    }
    handleSubmit2(event){
      var specialiteMaj = this.state.specialite
      specialiteMaj = specialiteMaj.toUpperCase()

      var surnomlisteMaj = this.state.surnom
      surnomlisteMaj = surnomlisteMaj.toUpperCase()

      const musicien ={
        id : arrayMusicien.length +1,
        surnom : surnomlisteMaj,
        specialite : specialiteMaj,
        image : this.state.image,
      }

      var existe = false;
      arrayMusicien.forEach((e)=> {
          if(e.surnom == surnomlisteMaj){
              alert("Impossible d'ajouter deux fois le même musicien avec le même surnom")
              existe = true;
          }
      });

      if(existe == false){
        arrayMusicien.push(musicien);
        
        this.setState({
            surnom : "",
            specialite : "",
          });
      }else{
        this.setState({
            surnom : "",
            specialite : "",
          });
        }
      appelAjaxMusicien("ajouter")
      ReactDOM.render(
        null,document.getElementById('ajoutMusicien')
      );
      ReactDOM.render(
        <MusicienList></MusicienList>,document.getElementById('musicienAndGroup')
      );
      event.preventDefault();
      
    }
    FermeModifieMusicien(){
      ReactDOM.render(
        null,document.getElementById('ajoutMusicien')
      );
    }
    render(){
      
      return (
        <form id="formAjoutMusicien" onSubmit={this.handleSubmit2}>
  
        <label for="">Surnom</label>
          <input type="text" name="surnom" id="inputSurnom" value={this.state.surnom} onChange={this.handleChange} required />
        
        <label for="">Spécialité</label>
          <input type="text" name ="specialite" id="inputSpecialite" value={this.state.specialite} onChange={this.handleChange} required/>
          <label for="">Image</label>
          <input type="file" id="imgMusicien" name="image" onChange={this.onImageChange}/><br></br>
          <input type="submit" name="btnAjout" value="Ajouter" id="btnAjout" /><br></br>
          <input type="" name="btnAnnuler" value="Annuler" id="btnModifierMusicien" onClick={()=> this.FermeModifieMusicien()} />

      </form>
      );
    }
  }
  
  class ModifierMusicien extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        id : this.props.id,
        surnom : this.props.surnom,
        specialite : this.props.specialite,
        image : this.props.image,
        ancienSurnom : this.props.surnom
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.onImageChange = this.onImageChange.bind(this)
  
    }
    onImageChange = (event) => {
      if(event.target.files && event.target.files[0]){
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend= () => {
          this.setState({
            image : reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
      
    }
    handleChange(event){
      const target = event.target;
      const value = target.value;
      const name = target.name;
      
      this.setState({[name] : value});
  
    }

    handleSubmit(event){
      var specialiteMaj = this.state.specialite
      specialiteMaj = specialiteMaj.toUpperCase()

      var surnomlisteMaj = this.state.surnom
      surnomlisteMaj = surnomlisteMaj.toUpperCase()
      
      const modifeMusicien = {
        id : this.state.id,
        surnom : surnomlisteMaj,
        specialite : specialiteMaj,
        image : this.state.image
      }
      var musExiste = false;


      arrayMusicien.forEach(e => {
        if(e.surnom == surnomlisteMaj){
          musExiste = true;
        }
      });
      if(musExiste == true){
        alert("Impossible de modifier le Musicien : Surnom existant")
      }else{
        // modification de l'endroit du musicien dans le tableau
        for(var i = 0; i < arrayMusicien.length; i++ ){
          if (arrayMusicien[i].id == this.state.id){
            arrayMusicien.splice(i, 1, modifeMusicien);
          }

        }
        // modification dans le tableau des musiciens associer au groupe
        // je parcour le tableau du groupe puis celui du musicient puis si le musicien est dans ce groupe
        // je modifie le surnom du musicien
        // vérification de la modification du musicien dans le groupe
        for(var i = 0; i < arrayGroup.length; i++ ){

          for(var n = 0; n < arrayGroup[i].musicienAssoc.length; n++ ){
            if(arrayGroup[i].musicienAssoc[n].surnom == this.state.ancienSurnom){
              arrayGroup[i].musicienAssoc.splice(n, 1, modifeMusicien);
              modifMusiGroup = true;
            }
          }

        }
        //
        appelAjaxMusicien("modifier")
        appelAjaxGroupe("modifier")
        ReactDOM.render(
          <MusicienList></MusicienList>,document.getElementById('musicienAndGroup')
        );
        ReactDOM.render(
          null,document.getElementById('ajoutMusicien')
        );
        if(modifMusiGroup == true){
          modifMusiGroup = false;
          alert("Le musicien a aussi été modifié dans un des groupes")
        }
      }
      
    }
  FermeModifieMusicien(){
    ReactDOM.render(
      null,document.getElementById('ajoutMusicien')
    );

  }
    render(){
      return(
        <form id="formAjoutMusicien">
  
        <label for="">Surnom</label>
          <input type="text" name="surnom" id="inputSurnom" value={this.state.surnom} onChange={this.handleChange} required />
        
        <label for="">Spécialité</label>
          <input type="text" name ="specialite" id="inputSpecialite" value={this.state.specialite} onChange={this.handleChange} required/>
          <label for="">Image</label>
          <input type="file" id="imgMusicien" name="image" onChange={this.onImageChange}/><br></br>
  
          <input type="" name="btnAjout" value="Modifier" id="btnModifierMusicien" onClick={this.handleSubmit}/><br></br>
          <input type="" name="btnAnnuler" value="Annuler" id="btnModifierMusicien" onClick={()=> this.FermeModifieMusicien()} />
      </form>
      );
    }
  }
  
  
  function UserGreeting(props) {
    
    return <h1>Bonjour Admin, Vous pouvez Ajouter,Modifier ou Supprimer des musiciens et les groupes</h1>;
  }
  
  function GuestGreeting(props) {
  
    return <h4>Bonjour l'Invité, Pour pouvoir Ajouter, Modifier ou Supprimer des musiciens et les groupes il va falloir ce connecter en tant qu'Admin</h4>;
  }
  
  function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }
  
  function Vide(props){
    return null;
  }
  
  window.onload = demarrer;
  
  function demarrer(){
    var btnConn = $("#btnConn");
  

  }
  function verfiConnexion(){
    login = $("#inputLogin").val();
    mdp = $("#inputMdp").val();
    var obj = {login:login, password :mdp} 
   
  }
  

    
  
  function appelAjaxMusicien(aff){
      if(aff == "afficher"){
        $.ajax({
          url: "ajaxMusicien.php", 
          type:"POST",
          data: {
             param: aff
          } 
          }).done(recupRetourAffichageMusicien);

        aff = "recupGroupe"
        $.ajax({
            url: "ajaxGroup.php", 
            type:"POST",
            data: {
               param: aff
            } 
            }).done(recupRetourGroupe);



      }else if (aff == "ajouter" || aff == "supprimer" || aff == "modifier"){

        var json = JSON.stringify(arrayMusicien)

        $.ajax({
        url: "ajaxMusicien.php", 
        type:"POST",
        data: {
            param: aff,
            param2 : json
        } 
        })
      }else if (aff == "reset"){
        var json = JSON.stringify(arrayMusicienDefault) 
        $.ajax({
            url: "ajaxMusicien.php", 
            type:"POST",
            data: {
               param: aff,
               param2 : json
            } 
            }).done(recupRetourAffichageMusicien);
      }
  
    
}

// cette fonction va permettre de récuperer la tableau de groupe
function recupRetourGroupe(arg){

  var obj = JSON.parse(arg);
  arrayGroup = obj

}
function recupRetourAffichageMusicien(arg){

    var obj = JSON.parse(arg);
    arrayMusicien = obj
    ReactDOM.render(
        <MusicienList></MusicienList>,document.getElementById("musicienAndGroup")
      );
     ReactDOM.render(
        null,document.getElementById("ajoutMusicien")
      );
}

////////////////////// PARTIE GROUPE ///////////////////////////////:


// fonction d'affichage des musicient dans le groupes
class GroupeMusicien extends React.Component{
  render(){
      return(
        <React.Fragment>
          
        <div class="card" onClick={()=> this.AffichePopupGroupe()}>
          <div id="card ">
              <img src={this.props.image} class="card-img-top" alt=""/>
              <div class="card-body">
                  <h4 class="card-title">{this.props.surnom}</h4>
                  <p class="card-text"><i>{this.props.specialite}</i></p>
              </div> 
            </div> 
        </div>
      
        </React.Fragment>
    );
  }
       
}
// class représentant un groupe
class Groupe extends React.Component {
    Close(){
        ReactDOM.render(
          null,
          document.getElementById('popup')
        );
      }
     AffichePopupGroupe() {
               // affichage du popup
      const popup = <React.Fragment>
  
      <div class = "overlay"/>
      <div className = "wrapper">
            <button type="button" className="close" onClick={()=> this.Close()}>
                  <span>&times;</span>
            </button>
          <div className="modale">
              <img src={this.props.image} id="imgGroupePop"></img>
            <p id="libelle">{this.props.libelle}</p>
            <p id="description">{this.props.description}</p>
            <ul>
            
            </ul>
          </div>
      </div>
      </React.Fragment>
  
          ReactDOM.render(
            popup,
            document.getElementById('popup')
          );
    }

    // supprimer le groupe
    SupprimerGroupe(){
            // on parcours tous les musiciens 
        // on vérifi si le nom selectionné correspond à l'une des personne dans le tableau
        for(var i = 0; i < arrayGroup.length; i++ ){
          if (arrayGroup[i].libelle == this.props.libelle){
            arrayGroup.splice(i,1);
          }
        }
        appelAjaxGroupe("supprimer");
        ReactDOM.render(
          // Try changing to isLoggedIn={true}:
          <GroupList/>,
          document.getElementById('musicienAndGroup')
        );
      }
      ModifierGroupe(){  
        ReactDOM.render(
          null,document.getElementById('ajoutMusicien')
        );
    
        ReactDOM.render(<ModifierGroupe libelle = {this.props.libelle} image = {this.props.image} description ={this.props.description} id = {this.props.id} musicienAssoc={this.props.musicienAssoc}></ModifierGroupe>, document.getElementById("ajoutMusicien"));
      }
    renderButton(){
        
        if(userAdmin == true){
          return( <AfficheButtonForAdmin
          onClick1 = {()=> this.ModifierGroupe()}
          onClick2 = {()=> this.SupprimerGroupe()}/>
      );
          }else{
            return(
              null
            )
          }
  
    }
    render(){
        // j'enregsitre la liste des musiciens dans liste
        var liste = this.props.musicienAssoc;
          // parcours la liste des musiciens puis je les affiches
          var listeMusicien = liste.map(e => (
            <GroupeMusicien surnom={e.surnom} specialite={e.specialite} image ={e.image} id = {e.id}/>          
            ));
        

      
        return(


          <div class="col-md-3">
            <div class="btn">
              {this.renderButton()}
            </div>
            <div class="card clickable" onClick={()=> this.AffichePopupGroupe()}>
              <div id="card">
                  <img src={this.props.image} class="card-img-top" alt=""/>
                  <div class="card-body">
                      <h4 class="card-title">{this.props.libelle}</h4>
                      <p class="card-text"><i>{this.props.description}</i></p>
                  </div> 
                  <div class=""></div>
                  <h5>Liste des musiciens</h5>
                  {listeMusicien}
                  </div> 
            </div>
          </div>
  
        );
    }
}

// class de toutes les groupes
class GroupList extends React.Component {
     // affiche l'interface d'ajout
    AfficheAjouter(){

        ReactDOM.render(<AjoutGroupe></AjoutGroupe>, document.getElementById("ajoutMusicien"));

    }
    // affiche l'interface d'association
    AssociationMusicienGroupe(){
      ReactDOM.render(<AssocMusGroup></AssocMusGroup>, document.getElementById("ajoutMusicien"));
    }
    AfficheSupprimer(){
      ReactDOM.render(<SupprimerMusicienGroupe></SupprimerMusicienGroupe>, document.getElementById("ajoutMusicien"));

    }
    ResetGroupe(){
      // permet, en cas de suppression de tous le groupes
      // rammener les groupes de base
      
      appelAjaxGroupe("reset")
  }

    rendBtnAJout(){
        if(userAdmin == true){
          return( <React.Fragment>
          <div class="btn">
               <input type ="button" value="Ajouter un Nouveau Groupe" className="btnAjouter" onClick={() => this.AfficheAjouter()}/>
                <input type ="button" value="Associer Musicien Groupe" className="btnAssocier" onClick={() => this.AssociationMusicienGroupe()}/>
                <input type ="button" value="Supprimer un musicien d'un Groupe" className="btnSupprimer" onClick={() => this.AfficheSupprimer()}/>
                <input type ="button" value="Reset Groupe" className="btnResetGroupe" onClick={() => this.ResetGroupe()}/>
          </div>
   
          </React.Fragment>
          );
          }else{
            return(
              null
            )
          }
    }
    render(){
        // enregistrement dans listeItems la une liste de groupes
        var listItems = arrayGroup.map(e => (
            <Groupe libelle={e.libelle} description={e.description} image ={e.image} id = {e.id} musicienAssoc ={e.musicienAssoc}/>
            
          ));
        
          // enregistrement dans listeMusicien la liste de tous les musiciens
        return(
                <div class="row">
                  <div class="main-div">
                  {this.rendBtnAJout()}
                  {/* debut du block body */}
                    <div class="card col-md-12">
                      <div class="card-header">
                        <h1><i class="fas"></i>Liste des Groupe</h1>
                      </div>
                      <div class="card-body row">
                        
                        {listItems}
                      </div>
                </div>
              </div>
          </div>
        
                
        );
    }

}
// class suppression musicien dans un groupe
class SupprimerMusicienGroupe extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      nomMusicien : "",
      libelleGroupe : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    const target = event.target;
    const value = target.value;
    
    const name = target.name;
      this.setState({[name] : value});

  }

  handleSubmit(event){
    var libelleGroupeMaj = this.state.libelleGroupe 
    libelleGroupeMaj = libelleGroupeMaj.toUpperCase()
    
    var nomMusicienMaj = this.state.nomMusicien
    nomMusicienMaj = nomMusicienMaj.toUpperCase()
  
  // on parcours le tableau de groupe
  var groupeExiste = false;
  var groupeAssoc ;
  arrayGroup.forEach((eg)=> {
    if(eg.libelle == libelleGroupeMaj){
      groupeExiste = true;
      groupeAssoc = eg;
    }
  });
    // vérification du groupe
        if(groupeExiste == false){
          alert("Suppresion Impossible car Groupe inexistant. Pour pouvoir supprimer, il faut que le groupe et le musicien soit existant")
        }else{
          groupeExiste = false

          var musicienExiste = false;
          var musicienGroupeAssoc ;
        // si groupe existant vérification du musicien
          arrayMusicien.forEach((em) =>{
            // si musicien existe, ajout dans le tableau de musicien dans groupe le musicien 
            if(em.surnom == nomMusicienMaj){
              musicienExiste = true;
              musicienGroupeAssoc = em;
            }
          });
          
            if(musicienExiste == false){
              alert("Suppression Impossible car Musicien inexistant. Pour pouvoir supprimer, il faut que le groupe et le musicien soit existant")
            }else{
    
              musicienExiste = false
              groupeAssoc.musicienAssoc.forEach((e) =>{
                if(e.surnom == musicienGroupeAssoc.surnom){
                    musicienExiste = true
                }
                
              })
              if(musicienExiste == false){
                alert("Suppression Impossible car le musicien n'est pas associé à ce groupe")
              
              }else{
                // supprimer un musicien dans le groupe
                // parcour du tableau de groupe

                  
                for(var i = 0; i < arrayGroup.length; i++ ){
                  // groupe trouvé parcours des musiciens
                  if (arrayGroup[i].libelle == groupeAssoc.libelle){

                    for(var n = 0; n < arrayGroup[i].musicienAssoc.length; n++ ){
                      // si surnom du musicien dans le groupe correspond à celui passé en paramétre
                      if (arrayGroup[i].musicienAssoc[n].surnom == musicienGroupeAssoc.surnom){
                        // suppression du musicien
                        arrayGroup[i].musicienAssoc.splice(n,1);
                      }
                    }          
                  }
                }
                musicienExiste =false;
                appelAjaxGroupe("supprimer")
                appelAjaxGroupe("afficher")
              }
            }
          }
  }
          
   
  FermeModifieGroupe(){
    ReactDOM.render(
      null,document.getElementById('ajoutMusicien')
    );
  }
  render(){
    const data = this.state.image;
    return (
      <form id="formAjoutMusicien" >

      <label for="">Nom du Musicien à supprimer</label>
        <input type="text" name="nomMusicien" value={this.state.nomMusicien} onChange={this.handleChange} required />
      <label for="">Libelle du Groupe</label>
        <input type="text" name ="libelleGroupe" value={this.state.libelleGroupe} onChange={this.handleChange} required/>
        <br></br>
        
        <input type="" name="btnSupp" value="Supprimer" id="btnAjout" onClick={this.handleSubmit}/><br></br>
        <input type="" name="btnAnnuler" value="Annuler" id="btnModifierMusicien" onClick={()=> this.FermeModifieGroupe()} />
    </form>
    );
  }
}
// la class d'association d'un musicien à un groupe
class AssocMusGroup extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      nomMusicien : "",
      libelleGroupe : ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    const target = event.target;
    const value = target.value;
    
    const name = target.name;
      this.setState({[name] : value});

  }

  handleSubmit(event){
    var libelleGroupeMaj = this.state.libelleGroupe 
    libelleGroupeMaj = libelleGroupeMaj.toUpperCase()
    
    var nomMusicienMaj = this.state.nomMusicien
    nomMusicienMaj = nomMusicienMaj.toUpperCase()
  
  // on parcours le tableau de groupe
  var groupeExiste = false;
  var groupeAssoc ;
  arrayGroup.forEach((eg)=> {
    if(eg.libelle == libelleGroupeMaj){
      groupeExiste = true;
      groupeAssoc = eg;
    }
  });
    // vérification du groupe
        if(groupeExiste == false){
          alert("Ajout Impossible car Groupe inexistant. Pour pouvoir associer, il faut que le groupe et le musicien soit existant")
        }else{
          groupeExiste = false

          var musicienExiste = false;
          var musicienGroupeAssoc ;
        // si groupe existant vérification du musicien
          arrayMusicien.forEach((em) =>{
            // si musicien existe, ajout dans le tableau de musicien dans groupe le musicien 
            if(em.surnom == nomMusicienMaj){
              musicienExiste = true;
              musicienGroupeAssoc = em;
            }
          });
          
            if(musicienExiste == false){
              alert("Ajout Impossible car Musicien inexistant. Pour pouvoir associer, il faut que le groupe et le musicien soit existant")
            }else{
              musicienExiste = false
              groupeAssoc.musicienAssoc.forEach((e) =>{
                if(e.surnom == musicienGroupeAssoc.surnom){
                    musicienExiste = true
                }
                
              })
              if(musicienExiste == true){
                alert("Association Impossible car le musicien est déjà associé à ce groupe")
                musicienExiste =false;
              }else{
                groupeAssoc.musicienAssoc.push(musicienGroupeAssoc)
                appelAjaxGroupe("ajouter")
                appelAjaxGroupe("afficher")
              }
            
            }
          }
          event.preventDefault();
        }
          
   
  FermeModifieGroupe(){
    ReactDOM.render(
      null,document.getElementById('ajoutMusicien')
    );
  }
  render(){
    const data = this.state.image;
    return (
      <form id="formAjoutMusicien" onSubmit={this.handleSubmit}>

      <label for="">Nom du Musicien</label>
        <input type="text" name="nomMusicien" value={this.state.nomMusicien} onChange={this.handleChange} required />
      <label for="">Libelle du Groupe</label>
        <input type="text" name ="libelleGroupe" value={this.state.libelleGroupe} onChange={this.handleChange} required/>
        <br></br>
        
        <input type="submit" name="btnAssoc" value="Associer" id="btnAjout" /><br></br>
        <input type="" name="btnAnnuler" value="Annuler" id="btnModifierMusicien" onClick={()=> this.FermeModifieGroupe()} />
    </form>
    );
  }
}

// la classe d'ajout d'un groupe
class AjoutGroupe extends React.Component{
    constructor(props){
        super(props);
        this.state ={
          libelle : "",
          description : "",
          image : null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this)
      }
    
      onImageChange = (event) => {
        if(event.target.files && event.target.files[0]){
          let reader = new FileReader();
          let file = event.target.files[0];
          reader.onloadend= () => {
            this.setState({
              image : reader.result,
            });
          };
          reader.readAsDataURL(file);
        }
        
      }
      handleChange(event){
        const target = event.target;
        const value = target.value;
        
        const name = target.name;
          this.setState({[name] : value});
    
      }
      handleSubmit(event){
          var libeMaj = this.state.libelle
          libeMaj = libeMaj.toUpperCase()

        const groupe ={
          id : arrayGroup.length +1,
          libelle : libeMaj,
          description : this.state.description,
          image : this.state.image,
          musicienAssoc : []
        }
 
        var existe = false;
        arrayGroup.forEach((e)=> {

        // vérification de l'existance du groupe
        if(e.libelle == this.state.libelle){
            alert("Impossble d'ajouter deux fois le même groupe avec le même libelle")
            existe = true;
        }
      });

      if(existe == false){
        arrayGroup.push(groupe);
        appelAjaxGroupe("ajouter")
        this.setState({
          libelle : "",
          description : "",
        });
      }else{
        this.setState({
            libelle : "",
            description : "",
          });
        }
    
        ReactDOM.render(<GroupList></GroupList>, document.getElementById("musicienAndGroup"));
        ReactDOM.render(null, document.getElementById("ajoutMusicien"));
        event.preventDefault();
      }
      FermeModifieGroupe(){
        ReactDOM.render(
          null,document.getElementById('ajoutMusicien')
        );
      }
      render(){
        const data = this.state.image;
        return (
          <form id="formAjoutMusicien" >
    
          <label for="">Libelle</label>
            <input type="text" name="libelle" id="inputlibelle" value={this.state.libelle} onChange={this.handleChange} required />
          
          <label for="">Description</label>
            <input type="text" name ="description" id="inputDescription" value={this.state.description} onChange={this.handleChange} required/>
            <label for="">Image</label>
            <input type="file" id="imgMusicien" name="image" onChange={this.onImageChange}/><br></br>
            <input type="submit" name="btnAjout" value="Ajouter" id="btnAjout" onClick={this.handleSubmit}/><br></br>
            <input type="" name="btnAnnuler" value="Annuler" id="btnModifierMusicien" onClick={()=> this.FermeModifieGroupe()} />

        </form>
        );
      }
    }
  
    // class de modification d'un groupe
    class ModifierGroupe extends React.Component{
      constructor(props){
        super(props);
        this.state = {
          id : this.props.id,
          libelle : this.props.libelle,
          description : this.props.description,
          image : this.props.image,
          musicienAssoc : this.props.musicienAssoc
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.onImageChange = this.onImageChange.bind(this)
    
      }
      onImageChange = (event) => {
        if(event.target.files && event.target.files[0]){
          let reader = new FileReader();
          let file = event.target.files[0];
          reader.onloadend= () => {
            this.setState({
              image : reader.result,
            });
          };
          reader.readAsDataURL(file);
        }
        
      }
      handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({[name] : value});
    
      }
      handleSubmit(event){
        var libMaj = this.state.libelle
        libMaj = libMaj.toUpperCase()
        const modifeGroupe = {
          id : this.state.id,
          libelle : libMaj,
          description : this.state.description,
          image : this.state.image,
          musicienAssoc : this.state.musicienAssoc  
        }
        var groupExiste = false;

        arrayGroup.forEach((e) => {
          if(e.libelle == libMaj){
            groupExiste = true;
          }
        })
        if(groupExiste == true){
          alert("Impossible de changer le libelle : Libelle existant")
        }else{
          for(var i = 0; i < arrayGroup.length; i++ ){
            if (arrayGroup[i].id == this.state.id){
              arrayGroup.splice(i, 1, modifeGroupe);
            }
          
          }
          appelAjaxGroupe("modifier")
    
          ReactDOM.render(
            <GroupList></GroupList>,document.getElementById('musicienAndGroup')
          );
          ReactDOM.render(
            null,document.getElementById('ajoutMusicien')
          );
        }
        
      }
    FermeModifieGroupe(){
      ReactDOM.render(
        null,document.getElementById('ajoutMusicien')
      );
    }
      render(){
        return(
          <form id="formAjoutMusicien" >
    
          <label for="">Libelle</label>
            <input type="text" name="libelle" id="inputlibelle" value={this.state.libelle} onChange={this.handleChange} required />
          
          <label for="">Description</label>
            <input type="text" name ="description" id="inputDescription" value={this.state.description} onChange={this.handleChange} required/>
            <label for="">Image</label>
            <input type="file" id="imgGroupe" name="image" onChange={this.onImageChange}/><br></br>
    
            <input type="" name="btnAjout" value="Modifier" id="btnModifierMusicien" onClick={this.handleSubmit}/><br></br>
            <input type="" name="btnAnnuler" value="Annuler" id="btnModifierMusicien" onClick={()=> this.FermeModifieGroupe()} />
        </form>
        );
      }
    }
function appelAjaxGroupe(aff){
    
    if(aff == "afficher"){
        
        aff = "recupMusicien"
        $.ajax({
            url: "ajaxGroup.php", 
            type:"POST",
            data: {
               param: aff
            } 
            }).done(recupMusicienRetourAffichageGroupe);

        aff = "recupGroupe"
        $.ajax({
            url: "ajaxGroup.php", 
            type:"POST",
            data: {
               param: aff
            } 
            }).done(recupRetourAffichageGroupe);

  
    }else if(aff == "ajouter" || aff == "modifier" || aff == "supprimer"){
        var json = JSON.stringify(arrayGroup)

        $.ajax({
        url: "ajaxGroup.php", 
        type:"POST",
        data: {
            param: aff,
            param2 : json
        }  
        });
    }else if (aff == "reset"){
      var json = JSON.stringify(arrayGroupDefault) 
      $.ajax({
          url: "ajaxGroup.php", 
          type:"POST",
          data: {
             param: aff,
             param2 : json
          } 
          }).done(recupRetourAffichageGroupe);
    }
}
function recupMusicienRetourAffichageGroupe(arg){
    var obj = JSON.parse(arg);
    arrayMusicien = obj

}

function recupRetourAffichageGroupe(arg){

    var obj = JSON.parse(arg);
    arrayGroup = obj

    ReactDOM.render(null, document.getElementById("musicienAndGroup"));
    ReactDOM.render(
        <GroupList></GroupList>,document.getElementById("musicienAndGroup")
      );
}
  
