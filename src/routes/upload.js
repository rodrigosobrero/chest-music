import Input from 'components/Input';
import Select from 'components/Select';
import ProgressCircle from 'components/ProgressCircle';

export default function Upload() {
  const roles = [
    'artist',
    'producer',
    'feat'
  ];

  return (
    <>
      <div className='uploader'>
        <div className='flex flex-row'>
          <div className='bg-neutral-silver-700 rounded-2xl px-8 py-[37px]'>
            <h3 className='mb-8'>name your treasure</h3>
            <div className='flex flex-col gap-5'>
              <Input type='text' label='Track name' />
              <Input type='text' label='Version' />
              <Input type='text' label='Album' helper='Leave empty for singles' />
              <Select options={roles} label='Your role' />
            </div>
          </div>
          <div className='set-size charts-container'>
            <ProgressCircle />
          </div>
          <div></div>
        </div>
      </div>
    </>
  )
}