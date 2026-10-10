

import ApiShare from '@/app/baseApiShare/apiShare';
import React from 'react';
import ProductCard from '../productCardShare/ProductCard';



const TodayUp =async () => {
    const TodayUpData= await fetch (`${ApiShare}/products`)
    const data = await TodayUpData.json()
    const upData = data.filter(ud=> ud.change.dir === "up")
    console.log("object",upData);


    return (
        <div className=' container mx-auto mt-10'>
            <div>
                <span className=' text-red-600'>▲</span>
                <span>আজ দাম বেড়েছে</span>
            </div>


            <div className=' grid grid-cols-3 gap-8'>
                {
                    upData.map(tud => <div key={tud.id}>
                        <ProductCard data={tud}></ProductCard>
                    </div>)
                }

            </div>
        </div>
    );
};

export default TodayUp;