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

export default function Plan() {
  const { t, i18n } = useTranslation();
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

  const handleSubscription = async () => {
    const result = await createSubscription(selectedPlan).unwrap();

    if ('error' in result) {
      console.log(result);
    } else {
      window.location.href = result.gateway_url;
    }
  }

  useEffect(() => {
    if (plans) {
      setSelectedPlan(plans[0].id);
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
    const lang = i18n.language.split('-')[0];

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
            <div className='text-lg font-semibold'>{plan.displayed_data[lang].title}</div>
            <div className='text-sm text-neutral-silver-300 mb-3'>{plan.displayed_data[lang].description}</div>
            <div className='mt-3 flex gap-1 items-baseline'>
              <span className='font-thunder text-2xl uppercase'>
                {plan.displayed_data[lang].currency}
              </span>
              <span className='font-thunder text-4xl'>
                {plan.displayed_data[lang].price}
              </span>
              <span>
                / {plan.displayed_data[lang].recurrence}
              </span>
            </div>
            <div className='text-sm text-neutral-200'>{plan.displayed_data[lang].additional_data}</div>
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
              {plans && (
                plans.map(plan => planOption(plan))
              )}
            </div>
            <div className='w-full max-w-[480px] flex flex-col gap-3'>
              <span className='font-bold'>{t('account.payment_method')}</span>
              <div className='bg-neutral-black rounded-2xl px-6 py-4 flex flex-row items-center'>
                <div className='flex flex-col grow'>
                  <span className='text-lg'>{t('account.credit_debit')}</span>
                  <span className='text-sm text-neutral-silver-300'>
                    {t('account.redirected_to')} {plans[0].payment_method === 'mercadopago' ? 'Mercado Pago' : 'Stripe'}
                  </span>
                </div>
                <div>
                  <img 
                    src={plans[0].payment_method === 'mercadopago' ? mp : stripe}
                    alt={plans[0].payment_method === 'mercadopago' ? 'Mercado Pago' : 'Stripe'} 
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
                onClick={() => { handleSubscription() }} />
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
        </div>
      )}
    </>
  );
}