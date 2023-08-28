import SearchBar from "components/SearchBar"
import SharedTable from "components/SharedTable"
import shared from "data/shared.json"
export default function Shared() {
  return (
    <>
       <div className='text-center font-archivo px-3 py-[3.75rem] xl:px-[3.75rem] gap-y-4'>
          <div className='flex flex-col items-center gap-4 mb-10'>
              <h3>Shared with me</h3>
              <span className='text-neutral-silver-200 text-lg'>Explore and play the tracks that other artists shared with you</span>
              <SearchBar onChange={() => console.log('onChange')}/>
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