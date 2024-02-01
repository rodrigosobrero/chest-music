import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { KeyIcon } from "@heroicons/react/24/solid";
import Breadcrumb from 'components/Breadcrumb';
import ChangeDataModal from 'components/modals/ChangeDataModal';
import Modal from 'components/Modal';
import pencil from 'assets/images/icon-pencil-alt.svg'
import { ReactComponent as ViewGrid } from 'assets/images/icon-view-grid.svg'
import { ReactComponent as Elipse } from 'assets/images/icon-elipse.svg'
import { useSecurity } from 'hooks/useSecurity';
import { patchData } from 'utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from 'app/auth';
import { resetPassword } from 'utils/api';

const Security = () => {
    const { t } = useTranslation() 
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch()

    const { isOpenPassword, isOpenPin, togglePassword, togglePin, handlePinChange, 
            isAvailable, pin, setIsOpenPin, setIsOpenPassword, checkPin, error, setError }= useSecurity(user?.data.pincode)

    const items = t('profile.sections', { returnObjects: true });

    let paths = [{ name: t('global.profile'), link: '/profile' }, { name: items[3].title }]

    const changePinCode = () => {
      const isEqual = checkPin(user?.data.pincode, 'Incorrect current pincode')
      if(!isEqual) { 
       return; }
      const parsed = parseInt(pin.new)
      patchData('account/', { pincode: parsed }, user?.token )
      .then((response) => {
        dispatch(updateUserData(response))
        togglePin()
      })
      .catch((err) => console.log(err))
    }
    
    const Casillero = ({ title, icon, quantity=0, onClick, type }) => {
        const ellipses = new Array(quantity).fill(null).map((_, index) => (
            <Elipse key={index} /> 
          ));
        return  (
            <div className='md:w-2/4 p-6 md:p-8 md:pr-10 bg-neutral-black rounded-2xl flex justify-between !font-archivo items-center '>
                <div className='flex font-semibold gap-6 items-center'>
                    <div>
                       {icon}
                    </div>
                    <div className={`flex flex-col ${quantity !== 0 ? 'gap-y-2' : 'gap-y-0.5'}`}> 
                       <h5 className='text-xl md:text-[22px] !font-archivo normal-case leading-[26px]'>
                         {title}
                       </h5>
                       {quantity !== 0 ? 
                       <div className='flex gap-x-1.5'>
                         {ellipses}
                       </div>
                       :
                       <span className='!text-base !font-normal text-neutral-silver-200 leading-5'>
                         {type=== 'pin' ? 'None' : 'Provided by Google'}
                       </span>
                       } 
                    </div>
                </div>
                <button className='text-brand-gold !text-lg !font-semibold !font-archivo flex items-center py-1.5 gap-x-1.5 cursor-pointer' onClick={onClick}>
                    {quantity > 0 && <img src={pencil} className='h-5 w-5' alt='pencil'/>}
                    {quantity > 0 && t('global.edit')  }
                    {quantity === 0 && type !== 'password' && t('global.generate')}
                </button>
            </div>
    )}

    const inputsDataPassword = [
        { label:t('global.email'), 
          placeholder:t('global.placeholder.write_here'),
          type: 'email',
          value: user?.data?.email,
          disabled: true,
        }
    ]

    const inputsDataPin = useMemo(() => { 
      if(!user?.data.pincode || user?.data.pincode === '') {
        return [    
        { label:t('security.pin_modal.new_pin'), 
          placeholder:t('global.placeholder.write_here'), 
          type: 'password',
          showHide: true,
          name: 'new',
          onlyNumeric: true,
          error: error
        }]}
      else return [
        { label:t('security.pin_modal.current_pin'), 
          placeholder:t('global.placeholder.write_here'), 
          type: 'password',
          name: 'currentValue',
          showHide: true,
          onlyNumeric: true,
          error: error
        },
        { 
          label:t('security.pin_modal.new_pin'), 
          placeholder:t('global.placeholder.write_here'), 
          type: 'password',
          showHide: true,
          name: 'new',
          onlyNumeric: true,
        }]
    }, [user?.data, t, error])

    return (
      <>
      <Modal show={isOpenPassword} setShow={setIsOpenPassword}>
        <ChangeDataModal toggle={togglePassword} primaryButton={t('global.send')} secondaryButton={t('global.cancel')}
                         title={t('security.password_modal.title')} subtitle={t('security.password_modal.subtitle')}
                         inputsData={inputsDataPassword}  isAvailable={true} onClick={() => resetPassword(user?.data.email, () => setIsOpenPassword(false))}/>
      </Modal>
      <Modal show={isOpenPin} setShow={setIsOpenPin}>
        <ChangeDataModal toggle={togglePin} primaryButton={t('global.confirm')} secondaryButton={t('global.cancel')}
                        inputsData={inputsDataPin} title='Change Pin Code' onClick={changePinCode} 
                        handleChange={handlePinChange} isAvailable={isAvailable}  />
      </Modal>
      {/* <div className='px-3 pt-4 pb-10 md:container md:px-[120px] md:pb-[60px] md:pt-[40px]'> */}
      <div className='container py-4 lg:py-[40px]'>
         <Breadcrumb className='px-3 md:px-0' items={paths}/>
         <div className='container-head-account'>
          <div className='container-items-account'>
              <h4 className='font-thunder-bold !text-5xl !font-bold !uppercase'>{items[3].title}</h4>
              <h5 className='text-neutral-silver-200 !text-base md:text-lg !font-archivo'>{t('security.change_password')}</h5>
          </div>
         </div>
         <div className='w-full px-1 md:px-0 flex flex-col gap-y-4 md:gap-y-6'>
            <div className='w-full flex flex-col md:flex-row gap-x-6 gap-y-4'>
              <Casillero title={t('security.pin')} icon={<ViewGrid className="h-8 w-8 " />} type='pin' 
              quantity={user?.data?.pincode !== '' ? 4 : 0} onClick={() => togglePin()}/>
              <Casillero title={t('global.password')} icon={<KeyIcon className="h-8 w-8 text-gray-500" />} type='password'
              quantity={user?.data.login_method === 'local' ? 8 : 0} onClick={() => togglePassword()}/>
            </div>
            <div className='w-full bg-neutral-black p-6 md:p-8 rounded-3xl'>
                <h4 className='!font-archivo !font-semibold !text-[22px] !normal-case'>
                  {t('security.subtitle')}
                </h4>
                <p className='text-neutral-silver-200 !font-archivo !text-base !text-left mt-2'>
                    {t('security.text')}
                </p>
                <button className='!text-left mt-4 py-1.5'>
                    {/*<a className='!font-archivo !text-lg text-brand-gold ' href='!#'>
                            {t('global.learn_more')}
    </a>*/}
                </button>
            </div>
         </div>
        </div>
      </>
    )
}

export default Security