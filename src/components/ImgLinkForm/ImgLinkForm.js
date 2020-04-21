import React from "react";
import './ImgLinkForm.css'


class ImgLinkForm extends React.Component{
  render(){
    return(
      <div>
        <p className='f3 b yellow'>
          {'This system will detect Faces from images.'}
        </p>
        <div className='flex-center'>
          <div className='center pa3 br2 shadow-5 form'>
            <input type='text' className='f4 pa2 w-70 center br2' placeholder='Paste img link here...' onChange= {this.props.onInputChange} />
            <button className='w-27 grow f2 br2 link ph3 pv2 dib white bg-light-purple b--light-purple ' onClick={this.props.onButtonSubmit}>Detect</button>
          </div>
        </div>
      </div>
    );
  };
}


export default ImgLinkForm;