import { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  useCreateAccountMutation, 
  useGetAccountQuery, 
  useGetPlansQuery, 
  useCreateSubscriptionMutation } from 'store/api';
import Button from 'components/Button';
import Input from 'components/Input';
import ErrorMessage from 'components/ErrorMessage';
import Modal from 'components/Modal';
import TermsModal from 'components/modals/TermsModal';
import stripe from 'assets/images/logo-stripe.svg';
import mp from 'assets/images/logo-mp.svg';

export default function Setup() {
  const { t, i18n } = useTranslation();
  const [createUser, { isLoading: isLoadingAccount }] = useCreateAccountMutation();
  const [createSubscription, { isLoading: isLoadingSuscription }] = useCreateSubscriptionMutation();
  const { data: account } = useGetAccountQuery({}, { refetchOnMountOrArgChange: true });
  const { data: plans } = useGetPlansQuery({}, { refetchOnMountOrArgChange: true });

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
    setSetupData({
      ...setupData,
      username: data.username,
      full_name: data.name,
      email: account.email,
      login_method: account.login_method
    });
    setStep(1);
  }

  const handlePlan = (plan) => {
    setSetupData({
      ...setupData,
      plan: plan
    });
  }

  const handleSetup = async () => {
    if (!account.username) {
      const result = await createUser({
        type: 'artist',
        data: setupData
      });

      if ('error' in result) {
        console.log(result);
        return;
      }
    }

    const resultSuscription = await createSubscription(setupData.plan).unwrap();

    if ('error' in resultSuscription) {
      console.log(resultSuscription);
    } else {
      window.location.href = resultSuscription.gateway_url;
    }
  }

  useEffect(() => {
    if (account?.username) {
      setStep(1);
    }
  }, [account]);

  useEffect(() => {
    if (plans) {
      setSetupData({
        ...setupData,
        plan: plans[0].id
      })
    }
  }, [plans]);

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
            checked={plan.id == setupData.plan}
            {...register('plan', { required: true })} />
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
              <span className='text-brand-gold' onClick={() => setOpenTerms(true)}>
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
      </div>
    </>
  )

  const stepTwo = () => (
    <>
      <Modal show={openTerms} setShow={setOpenTerms}>
        <TermsModal toggle={() => setOpenTerms(false)} />
      </Modal>
      <div className='px-6 flex flex-col items-center gap-8'>
        <div>
          <h2 className='text-[64px] md:text-[76px]'>elige un plan</h2>
        </div>
        <div className='w-full max-w-[480px] flex flex-col gap-3'>
          <span className='font-bold'>Plan</span>
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
              <img src={plans[0].payment_method === 'mercadopago' ? mp : stripe} width={104} height={36} />
            </div>
          </div>
        </div>
        <div className='w-full max-w-[480px] flex flex-col gap-3'>
          <Button
            style='primary'
            type='submit'
            text={t('global.confirm')}
            disabled={isLoadingAccount || isLoadingSuscription || !setupData.plan}
            loading={isLoadingAccount || isLoadingSuscription}
            onClick={handleSetup} />
          {!account.username && (
            <Button
              style='tertiary'
              text={t('global.back')}
              onClick={() => { setStep(0) }} />
          )}
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className='flex flex-col gap-8 items-center justify-center h-full pt-10 pb-10 md:px-[120px] md:py-20 w-full'>
        {account?.subscription && <Navigate to={'/my-chest'} />}
        {account?.email_verified
          ? (step === 0 ? stepOne() : stepTwo())
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
          </motion.div>)
        }
      </div>
    </>
  )
}