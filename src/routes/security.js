import React from 'react'
import { useLocation } from 'react-router-dom';
import Ubication from 'components/Ubication';
import { KeyIcon } from "@heroicons/react/24/solid";
import pencil from 'assets/images/icon-pencil-alt.svg'
import { ReactComponent as ViewGrid } from 'assets/images/icon-view-grid.svg'
import { ReactComponent as Elipse } from 'assets/images/icon-elipse.svg'
const Security = () => {
    const Casillero = ({ title, icon, quantity }) => {
        const ellipses = new Array(quantity).fill(null).map((_, index) => (
            <Elipse key={index} /> 
          ));
        return  (
            <div className='w-2/4 p-8 bg-neutral-black rounded-2xl flex justify-between font-archivo items-center '>
                <div className='flex font-semibold gap-6 items-center'>
                    <div>
                       {icon}
                    </div>
                    <div className='flex flex-col text-[22px] '> 
                       {title}
                       <div className='flex gap-x-1.5'>
                         {ellipses}
                       </div>
                    </div>
                </div>
                <div className='text-brand-gold text-lg font-semibold flex items-center gap-x-1.5 cursor-pointer'>
                    <img src={pencil} className='h-6 w-6'/>
                    Edit
                </div>
            </div>
    )}
    const location = useLocation();
    return (
      <>
      <div className='px-20'>
         <Ubication path={location.pathname}/>
         <div className='flex flex-col mt-5 mb-8'>
          <div>
              <h3 className='font-thunder-bold text-5xl font-bold'>Security</h3>
              <h5 className='text-neutral-silver-200 text-lg'>Change your password, set your PIN Code and learn more about our security</h5>
          </div>
         </div>
         <div className='w-full flex flex-col gap-y-6'>
            <div className='w-full flex space-x-6'>
              <Casillero title={'PIN Code'} icon={<ViewGrid className="h-8 w-8 " />} quantity={4}/>
              <Casillero title={'Password'} icon={<KeyIcon className="h-8 w-8 text-gray-500" />} quantity={8}/>
            </div>
            <div className='w-full bg-neutral-black p-8 rounded-3xl'>
                <h4 className='font-archivo text-[22px]'>Chest keeps your treasure secure</h4>
                <p className='text-neutral-silver-200 text-left'>
                    Aliquet malesuada dolor sit amet consectetur. Viverra id feugiat risus volutpat dictum. Fames adipiscing nunc pretium dolor at enim eu.
                </p>
                <p className='text-left mt-4'>
                    <a className='font-archivo text-xl text-brand-gold ' href='!#'>
                        Learn more
                    </a>
                </p>
            </div>
         </div>
        </div>
      </>
    )
}

export default Security