import "./Home.scss";

import React from 'react';
import DirectoryMenu from '../Directory/DirectoryMenu';

function Home() {
    return (
        <div className='homepage'>
            <DirectoryMenu/>
        </div>
    )
}

export default Home;
