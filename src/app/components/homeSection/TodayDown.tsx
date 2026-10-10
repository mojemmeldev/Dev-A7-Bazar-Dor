

import ApiShare from '@/app/baseApiShare/apiShare';
import React from 'react';
import ProductCard from '../productCardShare/ProductCard';



const TodayDown =async () => {
    const TodayUpData= await fetch (`${ApiShare}/products`)
    const data = await TodayUpData.json()
    const downData = data.filter(ud=> ud.change.dir === "down")
    console.log("object",downData);


    return (
        <div className=' container mx-auto mt-10'>
            <div>
                <span className=' text-green-600'>▼</span>
                <span>আজ দাম কমেছে</span>
            </div>


            <div className=' grid grid-cols-3 gap-8'>
                {
                    downData.map(tdd => <div key={tdd.id}>
                        <ProductCard data={tdd}></ProductCard>
                    </div>)
                }

            </div>
        </div>
    );
};

export default TodayDown;