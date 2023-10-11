import Uploader from 'components/Uploader';
import Chest from 'components/Chest';

export default function MyChest() {
  return (
    <>
      <div className='md:container flex flex-col gap-6 md:gap-10 py-8 md:py-[60px] px-3 md:px-0'>
        <Uploader />
        <Chest />
      </div>
    </>
  )
}