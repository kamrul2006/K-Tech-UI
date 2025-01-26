import React from 'react';
import Navbar from '../Components/FixdToAll/NavBar';
import Footer from '../Components/FixdToAll/Footer';
import Sidebar from '../Components/DashBoard/SideBar';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
    return (
        <div>
            <Navbar />

            <div className='grid grid-cols-5'>

                <div className='col-span-1'>
                    <Sidebar />
                </div>

                <div className='col-span-4'>
                    <Outlet />
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default DashBoardLayout;