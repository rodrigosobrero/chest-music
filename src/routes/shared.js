import SearchBar from "components/SearchBar"
import SharedTable from "components/shared/SharedTable"
import shared from "data/shared.json"
import { useTranslation } from "react-i18next"
export default function Shared() {
  const { t } = useTranslation()
  return (
    <>     
       <div className='flex flex-col  md:container px-3 py-10 md:p-[60px] gap-y-6 md:gap-y-10 text-center font-archivo '>
          <div className='flex flex-col items-center gap-y-2 px-3 md:px-0'>
              <h3 className="text-[64px] leading-[44px] md:leading-[58px]">
                 {t('shared.title')}
              </h3>
              <span className='text-neutral-silver-200 text-base  leading-[22px] md:text-lg'>
                 {t('shared.subtitle')}
              </span>
              <div className='mt-4'>
               <SearchBar className='!border-[1.5px] placeholder:text-center focus:border-brand-gold' onChange={() => console.log('onChange')}/>
              </div>
          </div>
          <div className='flex flex-col gap-y-1'>
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