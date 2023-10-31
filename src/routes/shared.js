import SearchBar from "components/SearchBar"
import SharedTable from "components/shared/SharedTable"
import shared from "data/shared.json"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"
import { useFetch } from "hooks/useFetch"
import { useSelector } from "react-redux"
import { apiUrl } from "utils/api"
export default function Shared() {
  const { t } = useTranslation()
  const user = useSelector((state) => state.auth.user )
  const { data, isFetching, error } = useFetch(apiUrl + 'shared/', user.token)
  
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
          { data.length > 0 ? 
            data?.map((el) => (
              <SharedTable artist={el.artist} data={el.tracks}/>
            )) 
            : 
            <h3>Any yet</h3>
          }
          </div>
      </div>
    </>
  )
}