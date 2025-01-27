import React from 'react';
import Navbar from '../Components/FixdToAll/NavBar';
import Footer from '../Components/FixdToAll/Footer';
import Sidebar from '../Components/DashBoard/SideBar';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
    return (
        <div>
            <Navbar />

            <div className='grid grid-cols-1 md:grid-cols-11 '>

                <div className='col-span-2 mt-10 md:mt-0'>
                    <Sidebar />
                </div>

                <div className='col-span-9 mt-20'>
                    <Outlet />
                </div>

            </div>


        </div>
    );
};

export default DashBoardLayout;