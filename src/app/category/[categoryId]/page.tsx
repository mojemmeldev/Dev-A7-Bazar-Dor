import ApiShare from '@/app/baseApiShare/apiShare';
import ProductCard from '@/app/components/productCardShare/ProductCard';
import ProductList from '@/app/components/productCardShare/ProductList';
import Image from 'next/image';
import React from 'react';



const get = async () => {
    const res = await fetch(`${ApiShare}/categories`)
    const data = await res.json()
    return data;
}

const DynamicCategoryIdPage = async ({ params }) => {
    const { categoryId } = await params
    const res = await fetch(`${ApiShare}/products?category=${categoryId}`)

    const data = await res.json()


    const getData = await get();
    const currentCat = getData.find(c => c.slug == categoryId)
    console.log(currentCat);



    return (
        <div className='bg-green-100 '>

            <div className=' container mx-auto mt-10 '>



                <div>
                    <div className='flex items-center gap-4'>
                       
                        <span className='bg-amber-200 '>{currentCat.icon}</span>
                        <div>
                            <h2 className='font-bold text-gray-900 text-2xl'>{currentCat?.nameBn}</h2>
                            <p className='text-gray-500'>{data.length} টি পণ্যের আজ কের দাম ও পরিবর্তন</p>
                        </div>
                    </div>
                </div>






                <ProductList products={data} />
                {/* <div className=' grid grid-cols-3 gap-3 '>
                    {
                        data.map(dcd => <div key={dcd.id}>
                            <ProductCard data={dcd}></ProductCard>
                        </div>)
                    }

                </div> */}
            </div>
        </div>
    );
};

export default DynamicCategoryIdPage;