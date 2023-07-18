import Uploader from 'components/Uploader';
import Chest from 'components/Chest';

export default function MyChest() {
  return (
    <>
      <div className='flex flex-col gap-10'>
        <Uploader />
        <Chest />
      </div>
    </>
  )
}