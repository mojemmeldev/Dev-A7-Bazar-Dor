import Image from 'next/image';
import React from 'react';
import Logo from'../../../../public/logo-icon.png'
import { Button } from '@heroui/react';




const Header = () => {

const date=new Date().toLocaleDateString("bn-DB",{
    dateStyle:"full"
})



    return (
        <div className='container mx-auto mt-10'>
            <div className='flex justify-between'>
                <div  className='flex  gap-4'>
                    <Image src={Logo} alt='logo' width={50} height={50} className='bg-green-600'></Image>
                    <div>
                        <h2 className='font-bold text-gray-900 text-2xl'>বাজার দর</h2>
                        <p className='text-gray-500'>{date} </p>
                    </div>
                </div>

                <div className='flex gap-1'>
                    <Button className="btn"> সাইন ইন</Button>
                    <Button className="btn btn-success text-white" > সাইন আপ</Button>
                </div>
            </div>
        </div>
    );
};

export default Header;