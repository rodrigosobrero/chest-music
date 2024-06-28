import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
import { useGetPlansQuery } from 'store/api';
import countries from 'data/countries.json';
import StorageIndicator from 'components/StorageIndicator';
import Modal from 'components/Modal';
import UpgradeStorage from 'components/modals/UpgradeStorageModal';
import { getFreeTrialDays } from 'utils/helpers';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

const AccountPlan = ({ data }) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlan, setCurrenPlan] = useState('');
  const [lang, setLang] = useState('');
  const [suspended, setSuspended] = useState(false);
  const { onOpen: openConverAccountModal } = useModal('ConvertAccountModal');
  const { onOpen: openUpgradeStorageModal } = useModal('UpgradeStorageModal');
  const { data: plans } = useGetPlansQuery({}, { refetchOnMountOrArgChange: true });

  const handleSelectOption = (i) => {
    setSelected(countries[i]);
    setIsOpen(false);
  }

  const handleChange = (e) => setInput(e.target.value);
  const { t, i18n } = useTranslation();
  const toggleList = () => setIsOpen(!isOpen);

  const closeModal = () => {
    setShow(false);
    setIsOpen(false);
    setSelected();
    setInput('');
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
        .then(() => {
          closeModal();
        }));
  }

  useEffect(() => {
    if (input !== '' && selected && selected.hasOwnProperty('country')) setIsAvailable(true);

    else setIsAvailable(false)

  }, [input, selected]);

  useEffect(() => {
    if (plans && data) {
      const plan = plans.plans.filter(item => item.id === data.subscription.plan);
      const lang = i18n.language.split('-')[0];

      setCurrenPlan(plan[0]);
      setLang(lang);
    }
  }, [plans, data, i18n.language]);

  useEffect(() => {
    if (!data || !data.subscription) {
      setSuspended(true);
      return;
    }

    const { status } = data.subscription || {};

    if (status === 'canceled' || status === 'ended') {
      setSuspended(true);
    }
  }, [data]);
  console.log('DATA EN ACCOUNT',data)
  return (
    <>
      <Modal show={show} setShow={setShow} >
        <UpgradeStorage toggle={closeModal} countries={countries} toggleList={toggleList} selected={selected} onClick={upgrade}
          isOpen={isOpen} handleChange={handleChange} handleSelectOption={handleSelectOption} disabled={!isAvailable} />
      </Modal>
      <div className='container-accountPlan'>
        <h4 className='text-[22px] !font-archivo !font-semibold !normal-case xl:'>{t('account.my_plan')}</h4>
        <div className='flex gap-y-8 md:gap-x-14 flex-wrap xl:flex-nowrap flex-col md:flex-row'>
          <div className='space-y-4 flex flex-col gap-5 w-[50%] '>
            <h5 className='mt-5 text-neutral-silver-200 !font-archivo !text-base'>{t('account.current_plan')}</h5>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='md:w-3/5 '>
                <h5 className='mb-1 !text-xl !capitalize !font-archivo'>{t(`role.${data?.type}`)}</h5>
                
                <span className='text-neutral-silver-300 !text-sm'>
                  {data.full_name}
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-[1.75rem]'>0$</span>
                <span> / {t('global.month')}</span>
            {currentPlan && !suspended && (
              <div className='flex flex-col gap-4'>
                <div className='grow'>
                  <h5 className='!text-lg !capitalize !font-archivo'>
                    {currentPlan.displayed_data[lang].title}
                  </h5>
                  <div className='text-neutral-silver-300 text-sm'>
                    {t('account.plan_description', {
                      price: currentPlan.displayed_data[lang].price,
                      recurrence: currentPlan.displayed_data[lang].recurrence,
                      currency: currentPlan.displayed_data[lang].currency,
                    })}
                  </div>
                </div>
                {data.subscription.free_trial && (
                  <div>
                    {t('account.free_trial_end', { date: getFreeTrialDays(data.subscription.date_started) })}
                  </div>
                )}
                <div>
                  <Link
                    to='subscription'
                    className='text-brand-gold text-lg font-semibold'
                    style={{ 'padding-top': '6px', 'padding-bottom': '6px', 'display': 'block' }}>
                    {t('account.manage_subscription')}
                  </Link>
                </div>
              </div>
            )}
            {suspended && (
              <>
                <div className='flex flex-row gap-1.5 grow'>
                  <div>
                    <ExclamationCircleIcon className='h-5 w-5 text-error-red hidden lg:block' />
                  </div>
                  <div className=' text-error-red'>
                    {t('account.ended_title')}
                  </div>
                </div>
                <div>
                  <Link
                    to='subscription/plan'
                    className='text-brand-gold text-lg font-semibold'
                    style={{ 'padding-top': '6px', 'padding-bottom': '6px', 'display': 'block' }}>
                    {t('account.choose_plan')}
                  </Link>
                </div>
              </>
            )}
            {data?.type === 'fan' && (
              <div className='mt-2'>
                <button
                  type='button'
                  className='text-brand-gold text-lg font-semibold py-1.2'
                  onClick={openConverAccountModal}>
                  {t('global.become an artist.default')}
                </button>
              </div>
            )}
          </div>

        </div>
        
        </div>
        {data && data.type === 'artist' && (
            <div className='flex flex-col justify-between'>
              <h5 className='mt-5 text-neutral-silver-200 !text-base !font-archivo'>{t('account.storage')}</h5>
              <div className='flex items-center gap-x-4 grow mt-12'>
                <StorageIndicator
                  usedSpace={data.used_seconds}
                  totalSpace={data.total_seconds}
                  upgrade={false}
                  reverse />
              </div>
              <div>
                {currentPlan && currentPlan.name === 'mensual' && (
                  <button
                    type='button'
                    className='text-brand-gold font-archivo text-lg font-semibold py-1.5'
                    onClick={() => { openUpgradeStorageModal() }}>
                    {t('account.upgrade')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AccountPlan