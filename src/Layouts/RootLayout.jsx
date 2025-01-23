import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div>


            <div className='max-w-7xl'>
                <Outlet />
            </div>

        </div>
    );
};

export default RootLayout;