import { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  useCreateAccountMutation,
  useGetAccountQuery,
  useGetPlansQuery,
  useCreateSubscriptionMutation
} from 'store/api';
import Button from 'components/Button';
import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import Modal from 'components/Modal';
import TermsModal from 'components/modals/TermsModal';
import MPModal from 'components/modals/RedirectMPModal';
import stripe from 'assets/images/logo-stripe.svg';
import mp from 'assets/images/logo-mp.svg';
import { TagIcon } from "@heroicons/react/24/outline";
import spinner from 'assets/images/icon-loading-claim.png';
import icon from 'assets/images/icon-exclamation-circle.svg'
import { Tooltip as ReactTooltip } from 'react-tooltip'

export default function Setup() {
  const { t, i18n } = useTranslation();
  const classIcon = 'h-7 w-7 text-brand-gold'
  const [createUser, { isLoading: isLoadingAccount }] = useCreateAccountMutation();
  const [createSubscription, { isLoading: isLoadingSuscription }] = useCreateSubscriptionMutation();
  const { data: account, isLoading: isLoadingGetAccount, refetch: refetchAccount } = useGetAccountQuery({}, { refetchOnMountOrArgChange: true });
  const { data: plans, refetch: refetchPlans } = useGetPlansQuery({}, { refetchOnMountOrArgChange: true });
  const [referralCode, setReferralCode] = useState(() => {
    return localStorage.getItem('referralCode') || '';
  });
  const [plansUpdated, setPlansUpdated] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [redirect, setredirect] = useState(false)
  const [redirectCountDown, setRedirectCountDown] = useState(30)
  const [setupData, setSetupData] = useState({
    username: '',
    full_name: '',
    plan: '',
    email: '',
    login_method: ''
  });
  const [step, setStep] = useState(0);
  const [openTerms, setOpenTerms] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const validate = {
    username: watch('username'),
    name: watch('name'),
    plan: watch('plan'),
    terms: watch('terms')
  }

  const handleFirstStep = (data) => {
    setSetupData(prevData => ({
      ...prevData,
      username: data.username,
      full_name: data.name,
      email: account?.email,
      login_method: account?.login_method,
      referral_code: referralCode
    }));
    setStep(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (step === 1) {
        try {
          await handleSetup(); 
          await refetchAccount(); 
          await refetchPlans(); 
          setPlansUpdated(true); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  }, [setupData, step]);

  

  const handlePlan = (plan) => {
    setSelectedPlan(plan)
  }

  const handleSetup = async () => {
    if (!account?.username) {
      const result = await createUser({
        type: 'artist',
        data: setupData
      });

      if ('error' in result) {
        console.log(result);
        return;
      }
    }
  };

  const handleMercadoPago = async () =>{
    setRedirectCountDown(30)
    setredirect(true)
  }

  const handleConfirm = async () => {
    const resultSuscription = await createSubscription(selectedPlan).unwrap();
    handleCloseRedirect()

    if ('error' in resultSuscription) {
      console.log(resultSuscription);
    } else {
      window.location.href = resultSuscription.gateway_url;
    }
  }

  const handleCloseRedirect = async () =>{
    setRedirectCountDown(30)
    setredirect(false)
  }

  useEffect(() => {
    if (account?.username) {
      setStep(1);
    }
  }, [account]);

  useEffect(() => {
    if (plans?.plans) {
      setSelectedPlan(
        plans.plans[0].id
      )
    }
  }, [plans]);
  
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
            checked={plan.id == selectedPlan}
            {...register('plan', { required: true })} />
          <label htmlFor='free'>
            <div className='flex items-center gap-3 py-3 max-w-md grow justify-between rounded-xl '> 
            <div className='text-lg font-semibold self-center'>{t(`plans.${plan.billing_frequency}.title.${plan.name}`)}</div>
            <img src={icon} className='h-6 w-6 relative' alt='exclamation circle' data-tooltip-id='a'/>
            
          <ReactTooltip id='a' style={{
          width: '306px',
          height: '78px',
          padding: '12px',
          gap: '10px',
          borderRadius: '12px 12px 12px 12px',
          background: '#E6E9ED',
          color: '#000',
        }}>
          {t('plans.tooltip')}
          </ReactTooltip>
            </div>
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
            <div className='text-sm text-neutral-200'>{plan.name.split(' ')[3]}{t(`plans.${plan.billing_frequency}.monthly_desc`,{price:plan.pricing_data.price, currency:plan.pricing_data.currency})}</div>
            :
            <div className='text-sm text-neutral-200'>{t(`plans.1.monthly_desc_trial`)}</div>
            }
          </label>
        </div>
      )
    }
  }

  const stepOne = () => (
    <>
      <div className='flex flex-col items-center px-6'>
        <h2>{t('setup.title')}</h2>
      </div>
      <div className='w-full max-w-[480px]'>
        <form onSubmit={handleSubmit(handleFirstStep)}>
          <div className='flex flex-col gap-6 mb-6'>
            <Input
              value={account?.email}
              type='email'
              name='email'
              label='Email'
              disabled />
            <Input
              type='text'
              name='username'
              label='Usuario'
              required
              noWhiteSpace
              register={register}
              error={errors.username && 'This field is required'} />
            <Input
              type='text'
              name='name'
              label='Nombre de artista'
              required
              register={register}
              error={errors.name && 'This field is required'} />
            {/* {referralCode !== '' && <Input
              value={referralCode}
              type='referralCode'
              name='referralCode'
              label='Referral Code'
              disabled />} */}
          </div>
          {errors.terms && (
            <div className='flex items-center justify-end h-14'>
              <ErrorMessage show={errors.terms} message='Accept Terms and Conditions' />
            </div>
          )}
          <div className='flex items-center gap-3 mb-8'>
            <input
              type='checkbox'
              name='terms'
              id='terms-and-conditions'
              {...register('terms', { required: true })} />
            <label htmlFor='terms-and-conditions'>
              {t('setup.step_two.terms')} {' '}
              <span className='text-brand-gold hover:cursor-pointer' onClick={() => setOpenTerms(true)}>
                {t('setup.step_two.terms_link')}
              </span>
            </label>
          </div>
          <Button
            style='primary'
            type='submit'
            text='Continuar'
            disabled={!validate.username || !validate.name || !validate.terms} />
        </form>
        <Modal show={openTerms} setShow={setOpenTerms}>
        <TermsModal toggle={() => setOpenTerms(false)} />
      </Modal>
      </div>
    </>
  )

  const stepTwo = () => (
    <>
      <div className='px-6 flex flex-col items-center gap-8'>
        <div>
          <h2 className='text-[64px] md:text-[76px]'>{t('account.choose_plan')}</h2>
        </div>
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
        {plansUpdated && refetchPlans && <>
          <div className='w-full max-w-[480px] flex flex-col gap-3'>
            <span className='font-bold'>Plan</span>
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
                <img src={plans.plans[0].payment_method === 'mercadopago' ? mp : stripe} width={104} height={36} />
              </div>
            </div>
          </div>
          <div className='w-full max-w-[480px] flex flex-col gap-3'>
            <Button
              style='primary'
              type='submit'
              text={t('global.confirm')}
              disabled={isLoadingAccount || isLoadingSuscription || !selectedPlan}
              loading={isLoadingAccount || isLoadingSuscription}
              onClick={() => handleMercadoPago()} />
            {/* !account.username && (
              <Button
                style='tertiary'
                text={t('global.back')}
                onClick={() => { setStep(0) }} />
            ) */}
          </div>
        </>}
      </div>
    </>
  );

  const LoadingComponent = () => (
    <div className="loading-spinner">
      <img src={spinner} alt='' width={20} height={20} className='animate-spin' />
    </div>
  );
  
  return (
    <>
      <div className='flex flex-col gap-8 items-center justify-center h-full pt-10 pb-10 md:px-[120px] md:py-20 w-full'>
        {isLoadingGetAccount ? (
          <></>
        ) : (
          <>
            {account?.subscription && <Navigate to={'/my-chest'} />}
            {account?.email_verified
              ? (step === 0 ? stepOne() : (plansUpdated ? stepTwo() : <LoadingComponent />))
              : (<motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex flex-col gap-4 px-4'>
                <h1 className='text-[76px]' style={{ lineHeight: '68px' }}>verify your email</h1>
                <div className='flex flex-col items-center text-lg mb-6'>
                  <span className='text-neutral-silver-200'>A verification email was sent to:</span>
                  <span>{account?.email}</span>
                </div>
                <div className='text-neutral-silver-300 text-sm mb-3 text-center'>
                  TIP: If you can’t find the email, be sure to check your spam folder.
                </div>
                <div className='flex items-center justify-center'>
                  <NavLink to='/' className='text-brand-gold h-10 md:h-auto hover:text-brand-bronze font-semibold text-lg py-1.5'>
                    Having issues? Contact us
                  </NavLink>
                </div>
              </motion.div>
              )
            }
            <Modal show={redirect} >
              <MPModal redirect={redirect} handleClose={handleCloseRedirect} setTimeLeft={setRedirectCountDown} timeLeft={redirectCountDown} handleConfirm={handleConfirm} ></MPModal>
            </Modal>
          </>
        )}      
      </div>
    </>
  )
}