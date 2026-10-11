"use client";
import Image from 'next/image';

import Logo from '../../../../public/logo-icon.png'
import { Button } from '@heroui/react';
import Link from 'next/link';
import { signOut, useSession } from '@/lib/auth-client';
import { useRouter } from "next/navigation";





const Header = () => {

    const { data: session } = useSession()
    const router=useRouter()

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in"); // redirect to login page
                },
            },
        });
    }


    const date = new Date().toLocaleDateString("bn-DB", {
        dateStyle: "full"
    })



    return (
        <div className='container mx-auto mt-10'>
            <div className='flex justify-between'>
                <div className='flex  gap-4'>
                    <Image src={Logo} alt='logo' width={50} height={50} className='bg-green-600'></Image>
                    <div>
                        <h2 className='font-bold text-gray-900 text-2xl'>বাজার দর</h2>
                        <p className='text-gray-500'>{date} </p>
                    </div>
                </div>

                <div className='flex gap-1'>
                    {
                        session?.user ? <> <Button onClick={handleSignOut}>লগ আউট</Button></> :
                            <>
                                <Link href={"/sign-in"}><Button className="btn"> সাইন ইন</Button></Link>
                                <Link href={"/sign-up"}><Button className="btn btn-success text-white" > সাইন আপ</Button></Link>
                            </>

                    }

                </div>
            </div>
        </div>
    );
};

export default Header;