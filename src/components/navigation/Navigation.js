import React from 'react';
import Logo from '../Logo/Logo'


const Navigation =({onRouteChange,isSignedIn})=>{

     
        if(isSignedIn){
            return (
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <Logo />
                <nav style={{display:'flex',justifyContent:'flex-end'}}>
                  <p onClick={()=>onRouteChange('signout')} className='f3 b link grow yellow pa3 pointer ba bw2 b--yellow mr4 br4 shadow-3'>Sign Out</p>
                </nav>
              </div>
            );
        }else{
          return(
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Logo />
              <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>onRouteChange('signin')} className='f3 b link grow yellow pa3 pointer ba bw2 b--yellow mr4 br4 shadow-3'>Sign In</p>
                <p onClick={()=>onRouteChange('register')} className='f3 b bg-white link grow yellow pa3 pointer ba bw2 b--yellow mr4 br4 shadow-3'>Register</p>
              </nav>
            </div>
          );         
        }
};

export default Navigation;