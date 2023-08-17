import SharedTable from "components/SharedTable"
import shared from "data/shared.json"
export default function Shared() {
  return (
    <>
       <div className='text-center font-archivo p-[3.75rem]'>
          <div>
              <h3>Shared with me</h3>
              <span className="text-neutral-silver-200 text-lg">Explore and play the tracks that other artists shared with you</span>
          </div>
          {
            shared.map((el) => (
              <SharedTable artist={el.username} data={el.tracks}/>
            ))
          }
 
      </div>
    </>
  )
}