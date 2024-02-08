import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'utils/helpers';
import { useModal } from 'hooks/useModal';
import countries from 'data/countries.json';

import ProgressBar from 'components/ProgressBar';
import Modal from 'components/Modal';
import UpgradeStorage from 'components/modals/UpgradeStorageModal';

const AccountPlan = ({ data }) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen: openConverAccountModal } = useModal('ConvertAccountModal');

  const handleSelectOption = (i) => {
    setSelected(countries[i]);
    setIsOpen(false);
  }

  const handleChange = (e) => setInput(e.target.value)
  // const toggle = () => setShow(!show);
  const { t } = useTranslation()
  const toggleList = () => setIsOpen(!isOpen)
  const closeModal = () => {
    setShow(false);
    setIsOpen(false);
    setSelected()
    setInput('')
  }

  const upgrade = () => {
    let url = process.env.REACT_APP_SHEETY_API;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contact: {
          name: input,
          country: selected.code,
        }
      })
    })
      .then((response) => response.json()
        .then(json => {
          closeModal();
        }));
  }

  useEffect(() => {
    if (input !== '' && selected && selected.hasOwnProperty('country')) setIsAvailable(true);

    else setIsAvailable(false)

  }, [input, selected]);

  return (
    <>
      <Modal show={show} setShow={setShow} >
        <UpgradeStorage toggle={closeModal} countries={countries} toggleList={toggleList} selected={selected} onClick={upgrade}
          isOpen={isOpen} handleChange={handleChange} handleSelectOption={handleSelectOption} disabled={!isAvailable} />
      </Modal>
      <div className='container-accountPlan'>
        <h4 className='text-[22px] !font-archivo !font-semibold !normal-case xl:'>{t('account.my_plan')}</h4>
        <div className='flex gap-y-8 md:gap-x-14 flex-wrap xl:flex-nowrap flex-col md:flex-row'>
          {data && data.type === 'artist' && (
            <div className='space-y-4'>
              <h5 className='text-neutral-silver-200 !text-base !font-archivo'>{t('account.storage')}</h5>
              <div className='flex gap-x-4'>
                <span className='text-brand-uva !font-thunder !font-normal !text-4xl'>{Math.round((data?.used_storage / data?.total_space) * 100)}%</span>
                <div className='flex flex-col items-start '>
                  <span className='!text-left !font-archivo text-neutral-silver-100'>{format.time(data?.used_seconds)}
                    <span className='!text-neutral-silver-300 !font-archivo'> of </span> {format.time(data?.total_seconds, 0)}
                  </span>
                  <ProgressBar
                    progress={(data?.used_seconds / data?.total_seconds) * 100}
                    color='violet'
                    size='150'
                    direction='left'
                    background='gray' />
                </div>
              </div>
              {/* <button className='py-1.5' onClick={toggle}>
                <h5 className='text-brand-gold !font-archivo !text-lg !font-semibold'>
                  {t('account.upgrade')}
                </h5>
              </button> */}
            </div>
          )}
          <div className='space-y-4'>
            <h5 className='text-neutral-silver-200 !font-archivo !text-base'>{t('account.current_plan')}</h5>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='md:w-3/5 '>
                <h5 className='mb-1 !text-xl !capitalize !font-archivo'>{data?.type}</h5>
                <span className='text-neutral-silver-300 !text-sm'>
                  {t('account.plan_description')}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-[1.75rem]'>0$</span>
                <span> / {t('global.month')}</span>
              </div>
            </div>
            {data?.type === 'fan' && (
              <div className='mt-2'>
                <button
                  type='button'
                  className='text-brand-gold text-lg font-semibold py-1.2'
                  onClick={openConverAccountModal}>
                  {t('global.become an artist')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountPlan