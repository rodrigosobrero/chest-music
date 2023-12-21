import { useState, useEffect } from "react"
import SearchBar from "components/SearchBar"
import SharedTable from "components/shared/SharedTable"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import Loading from "components/Loading"
import empty from 'assets/images/empty-chest.svg';
import { useGetSharedsQuery } from "store/api"
export default function Shared() {
  const { t } = useTranslation()
  const [filtered, setFiltered] = useState([])
  const [ input, setInput ] = useState('')
  const {
    data = [], 
    isLoading,
    isFetching
  } = useGetSharedsQuery({ refetchOnMountOrArgChange: true });  

  const handleChange = (e) => {
    setInput(e.target.value.toLowerCase())
  }
  useEffect(() => {
    if(!data) return;
    if(input=== '') return setFiltered(data);
    let filtrado = data.filter((artist) => {
      let filtereds = artist.tracks.filter((track) => track.title.toLowerCase().includes(input));
      return filtereds.length > 0;
    }).map((artist) => {
      let filtereds = artist.tracks.filter((track) => track.title.toLowerCase().includes(input));
      return {
        ...artist,
        tracks: filtereds
      };
    });
    
    setFiltered(filtrado);
  }, [input, data])

  const dispatch = useDispatch()

  return (
    <>     
       <div className='flex flex-col md:container px-3 py-10 md:p-[60px] gap-y-6 md:gap-y-10 text-center font-archivo '>
          <div className='flex flex-col items-center gap-y-2 px-3 md:px-0 '>
              <h3 className="text-[64px] leading-[44px] md:leading-[58px]">
                 {t('shared.title')}
              </h3>
              <span className='text-neutral-silver-200 text-base text-center leading-[22px] md:text-lg'>
                 {t('shared.subtitle')}
              </span>
              <div className='mt-4'>
               <SearchBar className='!border-[1.5px] placeholder:text-center focus:border-brand-gold' onChange={handleChange}/>
              </div>
          </div>
          <div className={`${(isFetching || isLoading) && 'items-center'} flex flex-col gap-y-1 text-center`}>
          {(isFetching || isLoading) ? <Loading />  : data.length > 0 ? 
            filtered?.map((el) => (
              <SharedTable artist={el.artist} data={el.tracks} dispatch={dispatch}/>
            )) 
            : 
            <div className='bg-neutral-black rounded-3xl px-4 pt-6 pb-8 md:p-[80px]  md:pt-[60px]'>
                <div className='flex flex-col items-center gap-2'>
                    <p className='!font-archivo !text-[28px] transof'>{t('notification.nothing_here')}</p>
                    <p className='text-lg text-neutral-silver-200 font-light mb-10'>
                      {t('shared.any')}
                    </p>
                    <img src={empty} alt='' width={240} height={128} className='mb-5' />
                </div>
            </div>
          }
          </div>
      </div>
    </>
  )
}