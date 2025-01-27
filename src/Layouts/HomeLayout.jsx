import React, { useEffect } from 'react';
import Banner from '../Components/Home/Banner';
import FeaturedProducts from '../Components/Home/FetureProduct';
import TrendingProducts from '../Components/AllProducts/TrendingProduct';
import FAQs from '../Components/Home/FAQs';
import Categories from '../Components/Home/Categories';


const HomeLayout = () => {

    useEffect(() => {
        document.title = "K-Tech || Home"
    }, [])


    return (
        <div className='min-h-screen'>

            <Banner />

            <FeaturedProducts />

            <Categories />

            <TrendingProducts />

            <FAQs />

        </div>
    );
};

export default HomeLayout;