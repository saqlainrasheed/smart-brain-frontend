import React from 'react';
import BrainLogo from "./Logo.png";
import Tilt from 'react-tilt';


class Logo extends React.Component{
  
  componentDidMount(){
    this.wrapper = React.createRef();
  };

  render(){
    return (
      <div ref={this.wrapper}>
        <div className='ml3 pa3'>
          <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 75, width: 75 }} >
            <div className='Tilt-inner'>
              <img src={BrainLogo} alt='Logo' className='pt1'/>
            </div>
          </Tilt>
        </div>
      </div>
    );
  };
};

export default Logo;