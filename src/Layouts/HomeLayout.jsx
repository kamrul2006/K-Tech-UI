import React, { useEffect } from 'react';


const HomeLayout = () => {

        useEffect(() => {
            document.title = "K-Tech || Home"
        }, [])
    

    return (
        <div>

            
            {/* --------------------------call us section---------------------- */}
            <div className='p-20 text-center text-white text-4xl font-semibold bg-black mb-16 italic mx-16'>
                <h1>Call Us: +88 0192345678910</h1>
            </div>


        </div>
    );
};

export default HomeLayout;