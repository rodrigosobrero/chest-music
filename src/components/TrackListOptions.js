import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';
import dots from 'assets/images/icon-dots-horizontal.svg';
import { ReactComponent as eye} from 'assets/images/icon-eye.svg';
import { ReactComponent as download} from 'assets/images/icon-download.svg';
import { ReactComponent as plus} from 'assets/images/icon-plus.svg';
import { ReactComponent as pencil} from 'assets/images/icon-pencil.svg';
import { ReactComponent as trash} from 'assets/images/icon-trash.svg';
import TrackListButton from 'components/TrackListButton';
import { useModal } from 'hooks/useModal';
import { useGetProjectQuery } from 'store/api';

export default function TrackListOptions({ track }) {
  const { onOpen: openEditModal } = useModal('EditTrackModal');
  const { onOpen: openUploadModal } = useModal('UploadVersionModal');
  const { onOpen: openDeleteModal } = useModal('DeleteTrackModal');
  const { onOpen: openDownloadModal } = useModal('DownloadVersionModal');

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');

  const {
    data: project = {}
  } = useGetProjectQuery(track.id);
  
  const navigate = useNavigate();
  const animation = useAnimationControls();

  const sequence = async () => {
    if (open) {
      await animation.start({ height: 0 });
      await animation.start({ width: 0 });
      animation.start({ opacity: 0 });
    } else {
      await animation.start({ width: 228, opacity: 100 });
      animation.start({ height: 80 });
    }
  }

  const toggleOpen = (e) => {
    setOpen(prev => !prev);
    sequence();
  }

  const handleEditTrack = () => {
    const meta = {
      id: track.id,
      album: track.album,
      name: track.name
    }

    openEditModal(meta)
  }

  const handleCreateVersion = () => {
    const meta = {
      name: track.name,
      participants: track.authors,
      project: track.id
    }

    openUploadModal(meta);
  }

  const handleDeleteTrack = () => {
    const meta = { 
      id: track.id,
      name: track.name
    }

    openDeleteModal(meta);
  }

  const handleDownloadVersion = () => {
    const meta = {
      versions: project.versions,
      lastVersion: track.last_version_id
    }

    openDownloadModal(meta);
  }

  return (
    <>
      <div className='relative'>
        <button
          type='button'
          className={`p-[7px] rounded-[10px] transition duration-500 hover:bg-neutral-silver-700 border-[3px] border-transparent active:border-gray-700 hover:border-neutral-silver-600 ${open && 'bg-neutral-silver-700 border-neutral-silver-600'}`}
          onClick={toggleOpen}>
          <img src={dots} alt='' width={24} height={24} />
        </button>
        <motion.div 
          animate={animation} 
          initial={{ opacity: 0 }} 
          className='bg-neutral-silver-600 rounded-xl pt-2 px-1.5 pb-1.5 absolute bottom-12 right-0 h-0 overflow-hidden' onMouseLeave={toggleOpen}>
          <motion.div
            className='h-full'
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: open ? 1 : 0, width: '100%' }}
            transition={{ delay: 0.6 }}
            key={!open}>
            {
              open &&
              <>
                {
                  <motion.div
                    className='flex flex-col w-full absolute gap-1.5'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}>
                    <div className='text-sm font-light text-neutral-silver-100'>
                      {description ? description : <span>&nbsp;</span>}
                    </div>
                    <div className='flex flex-row gap-1'>
                      <TrackListButton 
                        icon={eye} 
                        onMouseEnter={() => { setDescription('View details') }} 
                        onMouseLeave={() => { setDescription('') }}
                        onClick={ () => { navigate(`treasure/${track.id}`) }} />
                      <TrackListButton 
                        icon={download} 
                        onMouseEnter={() => { setDescription('Download') }} 
                        onMouseLeave={() => { setDescription('') }}
                        onClick={handleDownloadVersion} />
                      <TrackListButton 
                        icon={plus} 
                        onMouseEnter={() => { setDescription('Add') }} 
                        onMouseLeave={() => { setDescription('') }}
                        onClick={handleCreateVersion} />
                      <TrackListButton 
                        icon={pencil} 
                        onMouseEnter={() => { setDescription('Edit') }} 
                        onMouseLeave={() => { setDescription('') }}
                        onClick={handleEditTrack} />
                      <TrackListButton 
                        icon={trash} 
                        onMouseEnter={() => { setDescription('Delete') }} 
                        onMouseLeave={() => { setDescription('') }}
                        onClick={handleDeleteTrack} />
                    </div>
                  </motion.div>
                }
              </>
            }
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}