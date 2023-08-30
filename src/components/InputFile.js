import { useTranslation } from 'react-i18next';

export default function InputFile({ accept }) {
  const { t } = useTranslation();

  return (
    <>
      <input type='file' accept={accept} className='file-input' title='' data-content={t('global.upload')} />
    </>
  )
}