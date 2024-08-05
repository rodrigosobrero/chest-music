import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPlansQuery } from 'store/api';
import { Link } from 'react-router-dom';
import { useDeleteSubscriptionMutation, useCreateSubscriptionMutation } from 'store/api';
import { useSelector } from 'react-redux';
import { store } from 'app/store';
import { persistStore } from 'redux-persist';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/Button';
import stripe from 'assets/images/logo-stripe.svg';
import mp from 'assets/images/logo-mp.svg';
import { TagIcon } from "@heroicons/react/24/outline";
import MPModal from 'components/modals/RedirectMPModal';
import Modal from 'components/Modal';

export default function Plan() {
  const { t, i18n } = useTranslation();
  const classIcon = 'h-7 w-7 text-brand-gold'
  const paths = [
    { name: t('global.profile'), link: '/profile' },
    { name: t('global.account'), link: '/profile/account' },
    { name: t('account.update_subscription'), link: '/profile/account/subscription' },
    { name: t('account.update_plan') }
  ];

  const account = useSelector((state) => state.auth.user.data);
  const { data: plans, isLoading: isLoadingPlans } = useGetPlansQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteSubscription, { isLoading: isLoadingDelete }] = useDeleteSubscriptionMutation();
  const [createSubscription, { isLoading: isLoadingSubscription, isSuccess: isSuccessSubscription }] = useCreateSubscriptionMutation();

  const [redirect, setredirect] = useState(false)
  const [redirectCountDown, setRedirectCountDown] = useState(30)

  const [selectedPlan, setSelectedPlan] = useState('');
  const [suspended, setSuspended] = useState(false);

  const handlePlan = (plan) => {
    setSelectedPlan(plan);
  }

  const handleCancel = async () => {
    const result = await deleteSubscription(account.subscription.id);

    if ('error' in result) {
      console.log(result);
    } else {
      window.location.href = '/my-chest';
    }
  }

  const handleMercadoPago = async () =>{
    setRedirectCountDown(30)
    setredirect(true)
  }

  const handleCloseRedirect = async () =>{
    setRedirectCountDown(30)
    setredirect(false)
  }

  const handleSubscription = async () => {
    const result = await createSubscription(selectedPlan).unwrap();
    handleCloseRedirect()
    if ('error' in result) {
      console.log(result);
    } else {
      window.location.href = result.gateway_url;
    }
  }

  useEffect(() => {
    if (plans.plans) {
      setSelectedPlan(plans.plans[0].id);
    }
  }, [plans]);

  useEffect(() => {
    const { status } = account.subscription;

    if (status === 'canceled' || status === 'ended') {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
  }, [account]);

  useEffect(() => {
    if (isSuccessSubscription) {
      persistStore(store).purge();
      console.log('done!')
    }
  }, [isSuccessSubscription]);

  const planOption = (plan) => {
    let desc = plan.name.split(' ')[plan.name.split(' ').length-1]

    if (plan) {
      return (
        <div
          className='account-plan'
          key={plan.id}
          onClick={() => { handlePlan(plan.id) }}>
          <input
            type='radio'
            id={plan.id}
            value={plan.id}
            name='plan'
            onChange={() => {}}
            checked={plan.id === selectedPlan} />
          <label htmlFor='free'>
            <div className='text-lg font-semibold'>{t(`plans.${plan.billing_frequency}.title.${plan.name}`)}</div>
            <div className='text-sm text-neutral-silver-300 mb-3'>{t(`plans.${plan.billing_frequency}.description`)}</div>
            <div className='mt-3 flex gap-1 items-baseline'>
              <span className='font-thunder text-2xl uppercase'>
              {plan.pricing_data.currency}
              </span>
              {["referral", "discount"].includes(plans.discount?.type) ?
              <p>
              <span className='font-thunder text-4xl line-through text-neutral-silver-300' style={{ textDecorationThickness: '1.5px' }}>{(plan.pricing_data.regular_price / plan.billing_frequency).toFixed(2)}</span>
              <span className='font-thunder text-4xl'> {(plan.pricing_data.price / plan.billing_frequency).toFixed(2)}</span>
              </p>
              :
              <span className='font-thunder text-4xl'>
              {(plan.pricing_data.price / plan.billing_frequency).toFixed(2)}
              </span>
              }
              <span>
                / {t(`plans.${plan.billing_frequency}.monthly`)}
              </span>
            </div>
            {
            desc !== 'trial'?
            <div className='text-sm text-neutral-200'>{t(`plans.${plan.billing_frequency}.monthly_desc`,{price:plan.pricing_data.price, currency:plan.pricing_data.currency})}</div>
            :
            <div className='text-sm text-neutral-200'>{t(`plans.1.monthly_desc_trial`)}</div>
            }
          </label>
        </div>
      )
    }
  }

  return (
    <>
      {!isLoadingPlans && (
        <div className='flex flex-col gap-8 h-full pt-10 pb-10 px-3 md:px-[120px] md:py-20 '>
          <div className='flex flex-col items-center gap-5'>
            <Breadcrumb className='px-3 md:px-0' items={paths} />
            <h2 className='text-5xl'>
              {account.subscription.status === 'ended' ? (
                t('account.choose_plan')
              ) : (
                t('account.update_plan')
              )}
            </h2>
            <div className='flex flex-col gap-3 max-w-[480px] w-full mb-6'>
            {["referral", "discount"].includes(plans.discount?.type) &&
          <div className='w-full max-w-[480px] flex flex-col gap-3'>
            <div className='bg-neutral-silver-600 rounded-2xl px-6 py-4 flex flex-row items-center gap-x-4'>
              <div className='bg-neutral-silver-700 rounded-xl flex justify-center items-center p-3'>
                <TagIcon className={classIcon} />
              </div>
              <div className='flex flex-col grow'>
                <span className='text-lg'>{t('account.discount')}</span>
                <span className='text-neutral-silver-300'>
                  {plans.discount?.type === "referral" ? t('referral.referral_code') : t('account.beta')}
                </span>
              </div>
              <div className='discount-container'>
                {plans.discount?.percentage}% OFF
              </div>
            </div>
          </div>}
              {plans.plans && (
                plans.plans.map(plan => planOption(plan))
              )}
            </div>
            <div className='w-full max-w-[480px] flex flex-col gap-3'>
              <span className='font-bold'>{t('account.payment_method')}</span>
              <div className='bg-neutral-black rounded-2xl px-6 py-4 flex flex-row items-center'>
                <div className='flex flex-col grow'>
                  <span className='text-lg'>{t('account.credit_debit')}</span>
                  <span className='text-sm text-neutral-silver-300'>
                    {t('account.redirected_to')} {plans.plans[0].payment_method === 'mercadopago' ? 'Mercado Pago' : 'Stripe'}
                  </span>
                </div>
                <div>
                  <img 
                    src={plans.plans[0].payment_method === 'mercadopago' ? mp : stripe}
                    alt={plans.plans[0].payment_method === 'mercadopago' ? 'Mercado Pago' : 'Stripe'} 
                    width={104} 
                    height={36} />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-3 max-w-[480px] w-full mb-6'>
              <Button
                style='primary'
                type='submit'
                text={t('global.confirm')}
                disabled={selectedPlan === account.subscription.plan && !suspended}
                loading={isLoadingDelete || isLoadingSubscription}
                onClick={() => { handleMercadoPago() }} />
              <Link to='/profile/account/subscription/' className='btn btn-tertiary'>
                {t('global.back')}
              </Link>
              {!suspended && (
                <Button
                  customStyle='text-lg font-semibold text-error-red px-6 py-3'
                  type='submit'
                  text={t('account.cancel_subscription')}
                  onClick={handleCancel} />
              )}
            </div>
          </div>
          <Modal show={redirect} >
              <MPModal redirect={redirect} handleClose={handleCloseRedirect} setTimeLeft={setRedirectCountDown} timeLeft={redirectCountDown} handleConfirm={handleSubscription} ></MPModal>
            </Modal>
        </div>
      )}
    </>
  );
}