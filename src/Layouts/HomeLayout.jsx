import React, { useEffect } from 'react';
import Banner from '../Home/Banner';
import FeaturedProducts from '../Home/FetureProduct';


const HomeLayout = () => {

    useEffect(() => {
        document.title = "K-Tech || Home"
    }, [])


    return (
        <div className='min-h-screen'>

            <Banner />

            <FeaturedProducts />


        </div>
    );
};

export default HomeLayout;