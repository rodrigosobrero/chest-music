import InputFile from 'components/InputFile';
import { useTranslation } from 'react-i18next';

export default function Uploader() {
  const { t } = useTranslation();

  return (
    <>
      <div className='uploader'>
        <h4 className='mb-4'>{t('mychest.uploader.title')}</h4>
        <p>{t('mychest.uploader.description')}</p>
        <InputFile accept={'.mp3'} />
      </div>
    </>
  )
}