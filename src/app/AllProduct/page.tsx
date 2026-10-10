

import ApiShare from '@/app/baseApiShare/apiShare';
import React from 'react';
import ProductCard from '../components/productCardShare/ProductCard';




const AllProductsPage =async () => {
    const TodayUpData= await fetch (`${ApiShare}/products/`)
    console.log("alllll",TodayUpData);
    const data = await TodayUpData.json()
    console.log("allll data", data);
    
    


    return (
        <div className=' bg-green-100 '>
            <div  className=' container mx-auto mt-10 '>
            <div>
                
                <span id='All-Products'>সব পণ্য</span>
            </div>


            <div className=' grid grid-cols-3 gap-8 '>
                {
                    data.map(all => <div key={all.id}>
                        <ProductCard data={all}></ProductCard>
                    </div>)
                }

            </div>
        </div>
        </div>
    );
};

export default AllProductsPage;