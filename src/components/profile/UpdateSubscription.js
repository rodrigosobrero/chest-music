import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getFreeTrialDays, format } from 'utils/helpers';

export default function UpdateSubscription({ plan, lang, account }) {
  const { t } = useTranslation();

  return (
    <>
      {plan && (
        <>
          <div className='flex flex-col gap-3 max-w-[480px] w-full mb-6'>
            <div className='flex'>
              <div className='font-bold grow'>Plan</div>
              <div>
                <Link
                  to='plan'
                  className='text-brand-gold text-lg font-semibold py-1.2'>
                  {t('global.modify')}
                </Link>
              </div>
            </div>
            <div className='bg-neutral-black p-6 rounded-2xl'>
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
            </div>
          </div>
          <div className='flex flex-col gap-3 max-w-[480px] w-full'>
            <div className='font-bold grow'>{t('account.payment_method')}</div>
            <div className='bg-neutral-black p-6 rounded-2xl'>
              <div className='text-lg font-semibold'>{t('account.credit_debit')}</div>
              <div className='text-sm text-neutral-silver-300 mb-3'>
                {t('account.payment_detail')}
                {plan.payment_method === 'mercadopago' ? ' Mercado Pago' : ' Stripe'}
              </div>
              <div className='mt-3 flex gap-1 items-baseline'>
                <ul className='list-disc list-inside pl-3'>
                  <li>{t('account.start_billing')} {format.dateDdMmYyyy(account.subscription.date_started)}</li>
                  <li>{t('account.free_date')} {getFreeTrialDays(account.subscription.date_started)}</li>
                  <li>{t('account.cancel_anytime')}</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}