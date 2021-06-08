import Hero from '../Hero/Hero';
import Banner from '../Banner/Banner';
import {Link} from 'react-router-dom';

import React from 'react'

function Error() {
    return (
        <Hero >
                        <Banner title="Oops! Are you lost?"
                            subtitle="Don't worry we got you"
                        >
                            <Link to="/clothes" className="btn-primary">Take me to the store</Link>
                        </Banner>
                    </Hero>
    )
}

export default Error
