import { BaseModal } from 'components/BaseModal'
import React, { useState } from 'react'
import { CheckIcon } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';

const SortTracksModal = (props) => {
  const { t } = useTranslation()
  const [tagOrdered, setTagOrdered] = useState(props.meta.tagOrdered)
  const [method, setMethod] = useState(props.meta.method)
  const { customOrderData } = props.meta;
  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const titles = [
    {
        name: t('mychest.sort_modal.date_newest'),
        tag: 'date_added',
        type: 'asc',
        title: t('tables.date_added')
    },
    {
        name: t('mychest.sort_modal.date_latest'),
        tag: 'date_added',
        type: 'des',
        title: t('tables.date_added')
    },
    {
        name: t('mychest.sort_modal.title_a'),
        tag: 'name',
        type: 'asc',
        title: t('tables.title')
    },
    {
        name: t('mychest.sort_modal.title_z'),
        tag: 'name',
        type: 'des',
        title: t('tables.title')
    },
    {
        name: t('mychest.sort_modal.size_biggest'),
        tag: 'size',
        type: 'asc',
        title: t('tables.size')

    },
    {
        name: t('mychest.sort_modal.size_smallest'),
        tag: 'size',
        type: 'des',
        title: t('tables.size')
    }
  ];

  function closeWithTimeout() {
    setTimeout(function() {
      handleClose();
    }, 1500);
  };

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
    <BaseModal header={t('mychest.sort_modal.title')} show={props.isOpen} onClose={handleClose}>
        <div className='flex flex-col gap-3'>
            {
                titles.map(({ title, tag, type, name }) => (
                    <Button title={name} onClick={() => {
                        customOrderData(tag, type, title)
                        setMethod(type);
                        setTagOrdered(tag);
                        closeWithTimeout();
                    }} selected={tag === tagOrdered && method === type} />
                ))
            }
        </div>
    </BaseModal>
  )
}

export default SortTracksModal