import React from 'react';
import Header from './header';
import ErrorIMG from "../assets/images/404.svg"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

function Error(props) {
    return (
        <div>
            <Header/>
            <div className="flex flex-col justify-center items-center h-[80vh]">
                <p className="m-0  text-gray-950 lg:text-[46px] md:text-[38px] text-[35px] font-bold text-center">Error</p>
                <div className='md:mt-5 mt-4'>
                    <img src={ErrorIMG} className='lg:max-w-md w-[300px] md:w-[400px]' alt="error-icon" />
                </div>
                <p className="m-0 md:text-[23px] my-9 text-[18px] text-center">We can't seem to find  the page you are looking for</p>
                <Link to={"/"}
                    className="relative bg-gray-900 text-white px-6 py-2 rounded-md shadow-[4px_4px_0_#99a1af] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#99a1af] transition-all"
                    >
                    Home
                </Link>
            </div>
        </div>
    );
}

export default Error;