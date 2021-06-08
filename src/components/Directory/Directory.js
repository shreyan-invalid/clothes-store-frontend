

import React from 'react';

import "./Directory.scss";
import {Link} from 'react-router-dom';

function Directory({title, imageUrl, size}) {

   
      
    return (
      <>
        <Link to="/clothes" className={`${size} menu-item`}>
        <div
          className='background-image'
          style={{
            backgroundImage: `url(${imageUrl})`
          }}
        />

        
        <div className='content'>
          <h1 className='title'>{title.toUpperCase()}</h1>
          <span className='subtitle'>SHOP NOW</span>
        </div>
        
        
        
      </Link>
      </>
    )
}

export default Directory;
