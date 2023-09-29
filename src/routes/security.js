import React from 'react'
import { useTranslation } from 'react-i18next';
import { KeyIcon } from "@heroicons/react/24/solid";
import pencil from 'assets/images/icon-pencil-alt.svg'
import { ReactComponent as ViewGrid } from 'assets/images/icon-view-grid.svg'
import { ReactComponent as Elipse } from 'assets/images/icon-elipse.svg'
import Breadcrumb from 'components/Breadcrumb';
const Security = () => {
    const { t } = useTranslation() 
    const items = t('profile.sections', { returnObjects: true });
    let paths = [{ name:'Profile', link: '/profile' }, { name: items[3].title }]
    const Casillero = ({ title, icon, quantity }) => {
        const ellipses = new Array(quantity).fill(null).map((_, index) => (
            <Elipse key={index} /> 
          ));
        return  (
            <div className='xl:w-2/4 p-6 xl:p-8 bg-neutral-black rounded-2xl flex justify-between font-archivo items-center '>
                <div className='flex font-semibold gap-6 items-center'>
                    <div>
                       {icon}
                    </div>
                    <div className='flex flex-col text-xl xl:text-[22px] '> 
                       {title}
                       <div className='flex gap-x-1.5'>
                         {ellipses}
                       </div>
                    </div>
                </div>
                <button className='text-brand-gold text-lg font-semibold flex items-center gap-x-1.5 cursor-pointer'>
                    <img src={pencil} className='h-6 w-6'/>
                    {t('general.edit')}
                </button>
            </div>
    )}
    return (
      <>
      <div className='xl:px-[60px] px-1'>
         <Breadcrumb className='px-3 xl:px-0' items={paths}/>
         <div className='container-head-account'>
          <div className='container-items-account'>
              <h4 className='font-thunder-bold text-5xl font-bold uppercase'>{items[3].title}</h4>
              <h5 className='text-neutral-silver-200 text-base xl:text-lg'>{t('security.change_password')}</h5>
          </div>
         </div>
         <div className='w-full flex flex-col gap-y-4 xl:gap-y-6'>
            <div className='w-full flex flex-col xl:flex-row gap-x-6 gap-y-4'>
              <Casillero title={t('security.pin')} icon={<ViewGrid className="h-8 w-8 " />} quantity={4}/>
              <Casillero title={t('general.password')} icon={<KeyIcon className="h-8 w-8 text-gray-500" />} quantity={8}/>
            </div>
            <div className='w-full bg-neutral-black p-6 xl:p-8 rounded-3xl'>
                <h4 className='font-archivo font-semibold text-lg xl:text-[22px]'>{t('security.subtitle')}</h4>
                <p className='text-neutral-silver-200 text-base text-left mt-2'>
                    {t('security.text')}
                </p>
                <button className='text-left mt-4 py-1.5'>
                    <a className='font-archivo text-xl text-brand-gold ' href='!#'>
                            {t('general.learn_more')}
                    </a>
                </button>
            </div>
         </div>
        </div>
      </>
    )
}

export default Security