import React from 'react'
import { useTranslation } from 'react-i18next'
import ProfileRow from './ProfileRow'
import { KeyIcon, ClockIcon, CloudIcon, QuestionMarkCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ReactComponent as Unlocked } from 'assets/images/icon-unlocked-alt.svg';
import ProfileHead from './ProfileHead';



const ProfileView = () => {
  const { t } = useTranslation() 
  const items = t('profile.sections', { returnObjects: true });
  const classIcon = 'h-7 w-7 text-brand-gold'
  const to = [ 'played', 'permissions', 'account', 'security', 'help', 'terms']
  const icons = [ <ClockIcon className={classIcon} /> , <KeyIcon className={classIcon} />, <CloudIcon className={classIcon} />, 
                  <Unlocked className={classIcon} />, <QuestionMarkCircleIcon className={classIcon} />, <DocumentDuplicateIcon className={classIcon}/> ]
  return (
    <>
       <div className='w-full xl:w-3/5 flex flex-col justify-center mx-auto items-center gap-y-8 xl:gap-y-10 py-6 xl:py-0 px-1 xl:px-0'>
            <ProfileHead />
            <div className='flex flex-col gap-y-3 xl:gap-y-5 w-full'>
                    {items?.map((el, i) => (
                            <ProfileRow title={el.title} subtitle={el.subtitle} to={to[i]} icon={icons[i]}/>
                    ))}
            </div>
            <button className='w-[142.667px] bg-neutral-silver-600 py-3 px-6 rounded-[10px]'>Log out</button>
       </div>
    </>
  )
}

export default ProfileView