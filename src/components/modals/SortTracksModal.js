import { BaseModal } from 'components/BaseModal'
import React, { useState } from 'react'
import { CheckIcon } from "@heroicons/react/24/solid";

const SortTracksModal = (props) => {
  const [tagOrdered, setTagOrdered] = useState(props.meta.tagOrdered)
  const [method, setMethod] = useState(props.meta.method)
  const { customOrderData } = props.meta;

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const titles = [
    {
        title: 'Date added (newest first)',
        tag: 'date_added',
        type: 'asc'
    },
    {
        title: 'Date added (oldest first)',
        tag: 'date_added',
        type: 'des'
    },
    {
        title: 'Title (A-Z)',
        tag: 'name',
        type: 'asc'
    },
    {
        title: 'Title (Z-A)',
        tag: 'name',
        type: 'des'
    },
    {
        title: 'Size (biggest first)',
        tag: 'size',
        type: 'asc'
    },
    {
        title: 'Size (smallest first)',
        tag: 'size',
        type: 'des'
    }
  ]
  const Button = ({ title, onClick, selected }) => {
    return (
        <button className={`w-full px-4 py-3 text-left flex justify-between rounded-xl text-sm ${selected ? 'bg-neutral-black' : 'bg-neutral-silver-600'}`}
                onClick={onClick}>
            {title}
            {selected && <CheckIcon className="h-6 w-6 text-brand-gold" />}
        </button>
    )
  }
  return (
    <BaseModal header='Sort tracks' show={props.isOpen} onClose={handleClose}>
        <div className='flex flex-col gap-3'>
            {
                titles.map(({title, tag, type}) => (
                    <Button title={title} onClick={() => {
                        customOrderData(tag, type)
                        setMethod(type);
                        setTagOrdered(tag)
                    }} selected={tag === tagOrdered && method === type} />
                ))
            }
        </div>
    </BaseModal>
  )
}

export default SortTracksModal