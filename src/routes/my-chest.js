import Uploader from 'components/Uploader';
import Chest from 'components/Chest';

export default function MyChest() {
  return (
    <>
      <div className='container flex flex-col gap-6 md:gap-10 py-8 lg:py-[60px]'>
        <Uploader />
        <Chest />
      </div>
    </>
  )
}