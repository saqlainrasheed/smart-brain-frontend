import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import ImgLinkForm from './components/ImgLinkForm/ImgLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

 //ParticleJS library parameters
const ParticlesParams = {
  particles: {
    number:{
      value:60,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}
const initialState ={
    input:'',
    imageUrl : '',
    box:{},
    route:'signin',
    isSignedIn: false,
    user:{
      id:'',
      name:'',
      email:'',
      password:'',
      entries:0,
      joined:new Date(),
    }
}


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = initialState;
  };

  loadUser = (data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      password:data.password,
      entries:data.entries,
      joined:data.joined,
    }})
  }


  calculateFaceLocation = (data)=>{
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#input_image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : ClarifaiFace.left_col * width,
      topRow : ClarifaiFace.top_row * height,
      rightCol : width - (ClarifaiFace.right_col * width),
      bottomRow : height - (ClarifaiFace.bottom_row * height),
    }
  }

  displayFaceBoxOnImage = (box) => {
    this.setState({box:box});
  }


  onInputChange = (event)=>{
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch("https://dry-taiga-70106.herokuapp.com/imageurl",{
      method:'post',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        input:this.state.input
      })
    }).then(response => response.json())
    .then(response =>{ 
      if(response){
        fetch("https://dry-taiga-70106.herokuapp.com/image",{
          method:'put',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}));
        })
        .catch(console.log)
      }
      this.displayFaceBoxOnImage(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route === 'sign_out'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn:'true'});
    }
    this.setState({route:route});
  }

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={ParticlesParams} />
       
        {route === 'home'
          ?<div>
            <Navigation isSignedIn = {isSignedIn}  onRouteChange = {this.onRouteChange} />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImgLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (route === 'signin' || route === 'signout'
            ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :<Register loadUser={this.loadUser} onRouteChange= {this.onRouteChange} />
            )
        }
      </div>
    );
  }

}

export default App;
