import InputFile from 'components/InputFile';
import { useTranslation } from 'react-i18next';

export default function Uploader() {
  const { t } = useTranslation();

  return (
    <>
      <div className='uploader py-[60px] px-5'>
        <h5 className='hidden md:block mb-4'>{t('mychest.uploader.title')}</h5>
        <h5 className='block md:hidden mb-2'>{t('mychest.uploader.title_mobile')}</h5>
        <p className='hidden md:block'>{t('mychest.uploader.description')}</p>
        <p className='block md:hidden text-base'>{t('mychest.uploader.description_mobile')}</p>
        <div>
          <InputFile accept={'.mp3'} text={t('global.upload')} />
        </div>
      </div>
    </>
  )
}