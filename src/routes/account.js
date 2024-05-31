import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useGetPlansQuery } from 'store/api';
import AccountData from 'components/profile/AccountData';
import AccountPlan from 'components/profile/AccountPlan';
import Breadcrumb from 'components/Breadcrumb';
import Modal from 'components/Modal';
import DeleteModal from 'components/modals/DeleteModal';

const Account = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const toggle = () => {
    setShow(!show);
    setInput('');
  }

  const deleteAccount = () => {
    axios.delete(process.env.REACT_APP_API + 'account/', {
      headers: { Authorization: `Bearer ${user?.token}` }
    }).then(() => {
      signOut(auth);
    })
  }

  useEffect(() => {
    let validation_text = t('account.delete_validation_text');

    if (input.toLowerCase() === validation_text.toLowerCase()) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    };
  }, [input, t]);

  const items = t('profile.sections', { returnObjects: true });

  let paths = [{ name: t('global.profile'), link: '/profile' }, { name: items[2].title }];

  return (
    <>
      <Modal show={show} setShow={setShow}>
        <DeleteModal title={t('account.modals.delete_account')} subtitle={t('account.modals.delete_subtitle')}
          confirmText={t('account.modals.delete_confirm')} primaryButton={t('global.confirm')}
          secondaryButton={t('global.cancel')} placeholder={t('global.placeholder.write_here')} onClick={deleteAccount}
          label={t('global.email')} type={'email'} toggle={toggle} onChange={handleChange} disabled={isAvailable} />
      </Modal>
      <div className='px-3 pt-4 pb-10 container md:px-[120px] md:pb-[60px] md:pt-[40px]'>
        <Breadcrumb className='px-3 md:px-0' items={paths} />
        <div className='container-head-account'>
          <div className='container-items-account'>
            <h4 className='font-thunder-bold text-5xl uppercase font-bold'>{items[2].title}</h4>
            <h5 className='!font-archivo'>{t('account.subtitle')}</h5>
          </div>
        </div>
        <div className='w-full bg-neutral-black lg:p-8 p-3 flex flex-col lg:flex-row gap-y-3 gap-x-8 rounded-3xl !font-archivo'>
          <AccountData data={user?.data} token={user?.token} />
          <AccountPlan data={user?.data} />
        </div>
        <div className='w-full flex justify-center lg:justify-start items-center'>
          <button onClick={toggle} className='px-6 py-3  bg-neutral-silver-600 rounded-[10px] text-[#FF3636] mt-8'>{t('account.modals.delete_account')}</button>
        </div>
      </div>
    </>
  )
}

export default Account
