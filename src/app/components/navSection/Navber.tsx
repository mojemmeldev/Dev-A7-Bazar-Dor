import ApiShare from '@/app/baseApiShare/apiShare';
import Link from 'next/link';
import React from 'react';

const getNavCatData = async ()=>{
  const res = await fetch (`${ApiShare}/categories`)
    const data = await res.json ()
   return data;
}


const Navber = async () => {
  const navCatData= await getNavCatData();
  console.log(navCatData);
    return (
        <div className=' container mx-auto'>
            <div className=' flex gap-8 mt-8'>
            {
                navCatData.map(ncd=><div key={ncd.id}>
                    <Link href={`/category/${ncd.slug}`}>
                        <span> {ncd.icon} </span>
                        <span> {ncd.nameBn} </span>
                    </Link>
                </div>)
            }
        </div>
        </div>
    );
};

export default Navber;