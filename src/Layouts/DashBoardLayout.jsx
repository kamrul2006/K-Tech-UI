import React from 'react';
import Navbar from '../Components/FixdToAll/NavBar';
import Footer from '../Components/FixdToAll/Footer';
import Sidebar from '../Components/DashBoard/SideBar';

const DashBoardLayout = () => {
    return (
        <div>
            <Navbar />

            <div className='min-h-screen md:mt-16 mt-12'>
                <Sidebar/>
            </div>


            <Footer />
        </div>
    );
};

export default DashBoardLayout;