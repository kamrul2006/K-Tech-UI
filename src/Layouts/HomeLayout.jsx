import Banner from '../Components/Home/Banner';
import FeaturedProducts from '../Components/Home/FetureProduct';
import TrendingProducts from '../Components/AllProducts/TrendingProduct';
import FAQs from '../Components/Home/FAQs';
import Categories from '../Components/Home/Categories';
import TrendingCouponsSlider from '../Components/Home/TrendingCouponsSlider';
import ReviewSection from '../Components/Home/Review';
import NewsletterSection from '../Components/Home/NewsLetter';


const HomeLayout = () => {



    return (
        <div className='min-h-screen'>

            <Banner />

            <FeaturedProducts />

            <Categories />

            <TrendingProducts />

            <TrendingCouponsSlider />

            <ReviewSection/>

            <FAQs />

            <NewsletterSection/>

        </div>
    );
};

export default HomeLayout;