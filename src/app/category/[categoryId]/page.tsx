import ApiShare from '@/app/baseApiShare/apiShare';
import ProductCard from '@/app/components/productCardShare/ProductCard';
import React from 'react';



const DynamicCategoryIdPage = async ({ params }) => {
 const {categoryId}= await params
     const res = await fetch(`${ApiShare}/products?category=${categoryId}`)
     console.log(res);
     const data=await res.json()
     console.log("dcd",data);

    return (
        <div className=' container mx-auto mt-10'>


            <div className=' grid grid-cols-3 gap-8'>
                {
                    data.map(dcd => <div key={dcd.id}>
                        <ProductCard data={dcd}></ProductCard>
                    </div>)
                }

            </div>
        </div>
    );
};

export default DynamicCategoryIdPage;