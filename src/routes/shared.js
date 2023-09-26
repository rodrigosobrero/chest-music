import SearchBar from "components/SearchBar"
import SharedTable from "components/SharedTable"
import shared from "data/shared.json"
import { useTranslation } from "react-i18next"
export default function Shared() {
  const { t } = useTranslation()
  return (
    <>
       <div className='text-center font-archivo px-3 py-[3.75rem] xl:px-[3.75rem] gap-y-4'>
          <div className='flex flex-col items-center gap-4 mb-[60px] xl:mb-10 px-3'>
              <h3 className="text-[64px]">{t('shared.title')}</h3>
              <span className='text-neutral-silver-200 text-base leading-[44px] xl:leading-[22px] xl:text-lg'>
              {t('shared.subtitle')}
              </span>
              <SearchBar className='!border-[1.5px] placeholder:text-center focus:border-brand-gold' onChange={() => console.log('onChange')}/>
          </div>
          <div className='space-y-6'>
          {
            shared.map((el) => (
              <SharedTable artist={el.username} data={el.tracks}/>
            ))
          }
          </div>
      </div>
    </>
  )
}