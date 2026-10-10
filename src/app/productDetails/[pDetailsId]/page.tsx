

import ApiShare from '@/app/baseApiShare/apiShare';
import ProductDetailsCard from '@/app/components/productDetailsCard/ProductDetailsCard';
import React from 'react';

const DynamicProductDetailsPage = async ({ params }) => {
    const { pDetailsId } = await params
    const res = await fetch(`${ApiShare}/products/${pDetailsId}`)
    console.log(" dp", res);
    const pDetailsData = await res.json()
    console.log("y", pDetailsData);

    return (
        <div className=' bg-green-100 '>


            <div className=' container mx-auto mt-10'>

                <ProductDetailsCard data={pDetailsData} />


            </div>
        </div>
    );
};

export default DynamicProductDetailsPage;