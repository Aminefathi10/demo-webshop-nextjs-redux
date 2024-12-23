import StarRateIcon from '@mui/icons-material/StarRate';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Products from '../../components/Products';
import Slider from '../../components/Slider.jsx';
import ShippingDetails from '../../components/ShippingDetails.jsx';
import Link from 'next/link';
import { fetchProductDetailsData, fetchProductsByCategory } from '@/app/lib/data'; 


// export async function generateStaticParams() {
  
//   const res = await fetch('https://fakestoreapi.com/products' ).then(data => data.json());
//    return res.map(item => ({
//     id: item.id.toString()
//    }))
// }

async function Details({ params }) {
    
  const productSnap = await fetchProductDetailsData(params.id);


      if (!productSnap.exists()) {
      return (
        <div className='flex flex-col py-64 items-center justify-center'>
          <h1 className=' text-xl font-bold '>The item you are requesting does not exist!</h1>
          <p className='text-lg'>Search somthing or Go back to <Link className='text-sky-500' href='/'>Porducts Feed</Link></p>
        </div>
      )
    }
    

  const {id, title, description, category, images, price, rating} = productSnap.data();
  const products = await fetchProductsByCategory(category);

    const fakePrice = Math.floor(Math.random() * ( Math.ceil(price) - 5)) + 5 + Math.ceil(price);
    const fakePercentage  =  100 - Math.floor((Math.ceil(price) * 100) / fakePrice);


  return (
    <div className='max-w-[1300px] md:flex mx-auto'>
      <div className=" md:w-4/5">
        <div className='flex flex-col md:flex-row w-full'>
          <div className=" md:w-1/2 mx-auto h-full">
            <Slider images={images} />
          </div>

          <div className='px-3 py-2 md:w-1/2'>
              <h1 className='text-2xl font-medium mb-2'>{title}</h1>
              <h1 className='text-xl flex items-center text-orange-500'>
              <span className='font-medium'>{rating.rate}</span>
              {Array(Math.floor(rating.rate)).fill(<StarRateIcon />)}
              {Array(5 - Math.floor(rating.rate)).fill(<StarBorderIcon />)}
              <span className='text-black font-semibold text-lg'>{rating.count} Reviews</span>
              </h1>
              <h1 className='text-xl font-semibold font-display my-2'>

              <span className='text-3xl text-teal-800'>${Math.ceil(price) - 0.01}</span>
              
              <span className='ml-2 text-md text-gray-400 line-through
              '> 
                ${ fakePrice }
              </span>

              <span className='ml-2 text-red-600'>
                -{ fakePercentage }%
              </span>
              
              </h1>
              <p>{description}</p>
          </div>
          </div>

          <div className='mt-4 hidden md:block'>
            <h1 className='text-2xl font-bold ml-4 my-4'>Related Items</h1>
            <Products products={products.filter(item => item.id != id)}/>
          </div>
          

      </div>

      <ShippingDetails product={{id, title, description, category, images, price, rating}} />
      <div className='mt-4 md:hidden block'>
            <h1 className='text-2xl font-bold ml-4 my-4'>Related Items</h1>
            <Products products={products.filter(item => item.id != id)}/>
      </div>
          
    </div>
  )
}

export default Details
