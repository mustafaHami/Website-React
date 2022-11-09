

class Menu extends React.Component{

  AfficheMusicien(){

    ReactDOM.render(
      <MusicienList></MusicienList>,document.getElementById("musicien")
    );
  }
  AfficheDeconnexion(){
    ReactDOM.render(
      <Connexion></Connexion>,document.getElementById('connexion')
    );
    ReactDOM.render(
      null,document.getElementById('bonjour')
    );
    userAdmin = false
  }
  AfficheConnexion(){
    ReactDOM.render(
      null,document.getElementById("musicien")
    );
  }
  render(){
    return(
      <nav>
      <ul>
        <li onClick={()=> this.AfficheConnexion()} >Connexion</li>
        <li onClick={()=> AfficheGroupe()}>Groupes</li>
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

var arrayMusicien = [        
  { id: 1, surnom: "Trump", specialite: "accordeoniste" ,image : "image/accordéoniste.jpeg"},        
  { id: 2, surnom: "Ivanka", specialite: "pianniste", image : "image/pianniste.jpeg"},        
  { id: 3, surnom: "Kushner", specialite: "pianniste" , image : "image/pianniste2.jpeg"}    
];
var userAdmin = false;
// Employee Component
function AfficheButtonForAdmin(props){
  return (
    <React.Fragment><input type ="button" value="Modifier" className="btnModifier" onClick={props.onClick1}/> 
    <input type ="button" value="Supprimer" className="btnSupprimer" onClick={props.onClick2}/>
    </React.Fragment>
  );
}
class Musicien extends React.Component {
  AffichePopup(){
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
    
    for(var i = 0; i < arrayMusicien.length; i++ ){
      if (arrayMusicien[i].surnom == this.props.surnom){
        arrayMusicien.splice(i,1);
      }
    }
    ReactDOM.render(
      // Try changing to isLoggedIn={true}:
      <MusicienList/>,
      document.getElementById('musicien')
    );

  }
 
  ModifierMusicien(){
    console.log("surnom "+this.props.surnom)

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
      <div>
      <li class="musicien" onClick={()=> this.AffichePopup()}>
      <div>
        <img src={this.props.image}  id="imgMusicien" />
      </div>
        <div>
          <b id="surnom">Surnom : </b><p >{this.props.surnom}</p>
        </div>
        <div>
          <b id="specialite">Spécialité:</b><p id="specialite">{this.props.specialite}</p> 
        </div>

      </li>
      <div>
{this.renderButton()}
        </div>
      </div>
    );
  }
}

// EmployeeList Component
class MusicienList extends React.Component {

  AfficheAjouter(){
    ReactDOM.render(<AjoutMusicien></AjoutMusicien>, document.getElementById("ajoutMusicien"));
  }
  rendBtnAJout(){
      if(userAdmin == true){
        return( <React.Fragment>
              <input type ="button" value="Ajouter" className="btnAjouter" onClick={() => this.AfficheAjouter()}/>
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
      
      <React.Fragment>
      
        <ul class ="musicien-list">
        {this.rendBtnAJout()}
           {listItems}
        </ul>
      </React.Fragment>

      );
  }
}// Render

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
        // Try changing to isLoggedIn={true}:
        <Greeting isLoggedIn={true} />,
        document.getElementById('bonjour'),
        );
        ReactDOM.render(
          // Try changing to isLoggedIn={true}:
          null,
          document.getElementById('musicien')
        );
        ReactDOM.render(
          // Try changing to isLoggedIn={true}:
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
        document.getElementById('musicien')
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
        <input type="password" name ="mdp" id="inputMdp"value={this.state.mdp} onChange={this.handleChange}/><br></br>
      
        <input type="submit" name="btnConne" value="Connexion" id="btnConne" /><br></br>
  </form>
    );
  }
}

ReactDOM.render(
  <Connexion></Connexion>,document.getElementById('connexion')
);



class AjoutMusicien extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      surnom : "",
      specialite : "",
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
    const musicien ={
      id : arrayMusicien.length +1,
      surnom : this.state.surnom,
      specialite : this.state.specialite,
      image : this.state.image,
    }
    arrayMusicien.push(musicien);
    this.setState({
      surnom : "",
      specialite : "",
    }
      
    )

    ReactDOM.render(<MusicienList></MusicienList>, document.getElementById("musicien"));
    ReactDOM.render(null, document.getElementById("ajoutMusicien"));
    event.preventDefault();
  }
  render(){
    const data = this.state.image;
    return (
      <form id="formAjoutMusicien" onSubmit={this.handleSubmit}>

      <label for="">Surnom</label>
        <input type="text" name="surnom" id="inputSurnom" value={this.state.surnom} onChange={this.handleChange} required />
      
      <label for="">Spécialité</label>
        <input type="text" name ="specialite" id="inputSpecialite" value={this.state.specialite} onChange={this.handleChange} required/>
        <label for="">Image</label>
        <input type="file" id="imgMusicien" name="image" onChange={this.onImageChange}/><br></br>
        <input type="submit" name="btnAjout" value="Ajouter" id="btnAjout" /><br></br>
        
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
      image : this.props.image
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
    const modifeMusicien = {
      id : this.state.id,
      surnom : this.state.surnom,
      specialite : this.state.specialite,
      image : this.state.image
    }
    for(var i = 0; i < arrayMusicien.length; i++ ){
      if (arrayMusicien[i].id == this.state.id){
        arrayMusicien.splice(i, 1, modifeMusicien);
      }
    
    }
    ReactDOM.render(
      <MusicienList></MusicienList>,document.getElementById('musicien')
    );
    ReactDOM.render(
      null,document.getElementById('ajoutMusicien')
    );
    event.preventDefault();
  }
FermeModifieMusicien(){
  ReactDOM.render(
    null,document.getElementById('ajoutMusicien')
  );
}
  render(){
    return(
      <form id="formAjoutMusicien" onSubmit={this.handleSubmit}>

      <label for="">Surnom</label>
        <input type="text" name="surnom" id="inputSurnom" value={this.state.surnom} onChange={this.handleChange} required />
      
      <label for="">Spécialité</label>
        <input type="text" name ="specialite" id="inputSpecialite" value={this.state.specialite} onChange={this.handleChange} required/>
        <label for="">Image</label>
        <input type="file" id="imgMusicien" name="image" onChange={this.onImageChange}/><br></br>

        <input type="submit" name="btnAjout" value="Modifier" id="btnModifierMusicien" /><br></br>
        <input type="submit" name="btnAjout" value="Annuler" id="btnModifierMusicien" onClick={()=> this.FermeModifieMusicien()} />
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

  btnConn.click(()=>{
   alert("")
  })
}
