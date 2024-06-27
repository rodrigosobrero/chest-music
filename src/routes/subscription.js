import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetPlansQuery } from 'store/api';
import { useSelector } from 'react-redux';
import Breadcrumb from 'components/Breadcrumb';
import UpdateSubscription from 'components/profile/UpdateSubscription';

export default function Subscription() {
  const { t, i18n } = useTranslation();
  const paths = [
    { name: t('global.profile'), link: '/profile' },
    { name: t('global.account'), link: '/profile/account' },
    { name: t('account.update_subscription') }
  ];
  const { data: plans } = useGetPlansQuery({}, { refetchOnMountOrArgChange: true });
  const account = useSelector((state) => state.auth.user.data);
  const [currentPlan, setCurrenPlan] = useState('');
  const [lang, setLang] = useState('');

  useEffect(() => {
    if (plans && account) {
      const plan = plans.plans.filter(item => item.id === account.subscription.plan);
      const lang = i18n.language.split('-')[0];

      setCurrenPlan(plan[0]);
      setLang(lang);
    }
  }, [plans, account, i18n.language]);

  return (
    <div className='flex flex-col gap-8 h-full pt-10 pb-10 px-3 md:px-[120px] md:py-20 '>
      <div className='flex flex-col items-center gap-5'>
        <Breadcrumb className='px-3 md:px-0' items={paths} />
        <h2 className='text-5xl'>{t('account.update_subscription')}</h2>
        <UpdateSubscription plan={currentPlan} lang={lang} account={account} />
      </div>
    </div>
  );
}