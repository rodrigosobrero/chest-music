import { useTranslation } from 'react-i18next'
const PermissionsButton = ({ toggle }) => {
  const { t } = useTranslation()
  return (
    <>
       <button className='py-1.5'>
          <p className='text-brand-gold font-archivo text-base cursor-pointer' onClick={toggle}>+  {t('global.add_another')}</p>
       </button>
    </>
  )
}

export default PermissionsButton