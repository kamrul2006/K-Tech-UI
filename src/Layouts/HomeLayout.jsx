import React, { useEffect } from 'react';
import Banner from '../Home/Banner';


const HomeLayout = () => {

    useEffect(() => {
        document.title = "K-Tech || Home"
    }, [])


    return (
        <div className='min-h-screen'>

            <Banner />


        </div>
    );
};

export default HomeLayout;