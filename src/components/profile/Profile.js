import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import ProfileRow from './ProfileRow'
import { KeyIcon, ClockIcon, CloudIcon, QuestionMarkCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ReactComponent as Unlocked } from 'assets/images/icon-unlocked-alt.svg';
import ProfileHead from './ProfileHead';
import { signOut } from 'firebase/auth';
import { auth } from 'utils/firebase';
const ProfileView = () => {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  const items_fan = t('profile.fan_sections', { returnObjects: true });
  const classIcon = 'h-7 w-7 text-brand-gold'
  const to_fan = [ 'played',  'account', 'security', 'help', 'terms']
  const to = [ 'played', 'permissions', 'account', 'security', 'help', 'terms']
  const icons = [ <ClockIcon className={classIcon} /> , <KeyIcon className={classIcon} />, <CloudIcon className={classIcon} />, 
                 <Unlocked className={classIcon} />, <QuestionMarkCircleIcon className={classIcon} />, <DocumentDuplicateIcon className={classIcon}/> ]
  const icons_fan = [ <ClockIcon className={classIcon} /> , <CloudIcon className={classIcon} />, 
                 <Unlocked className={classIcon} />, <QuestionMarkCircleIcon className={classIcon} />, <DocumentDuplicateIcon className={classIcon}/> ]            
  return (
    <>
       <div className='w-full md:w-3/5 flex flex-col justify-center mx-auto items-center gap-y-8 md:gap-y-10'>
            <ProfileHead data={user?.data} token={user?.token}/>
            <div className='flex flex-col gap-y-3 md:gap-y-5 w-full'>
              {user && user.data.type === 'artist' ? 
                items?.map((el, i) => (
                            <ProfileRow title={el.title} subtitle={el.subtitle} to={to[i]} icon={icons[i]}/>
                )) :
                items_fan.map((el, i) => (
                  <ProfileRow title={el.title} subtitle={el.subtitle} to={to_fan[i]} icon={icons_fan[i]}/>
                ))
              
              }

            </div>
            <button className='w-[142.667px] bg-neutral-silver-600 py-3 px-6 rounded-[10px]' onClick={() => signOut(auth)}>{t('profile.logout')}</button>
       </div>
    </>
  )
}

export default ProfileView