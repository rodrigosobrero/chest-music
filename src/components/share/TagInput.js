import React, { useState } from 'react';
import Tag from './Tag';
import { useTranslation } from 'react-i18next';

const TagInput = ({ selectedsOptions, handleChange, filteredUsers, selectOption, input, removeOption }) => {
  const { t } = useTranslation()
  return (
    <>
    <div className="relative w-full ">
      <label>Users*</label>
      <div className="flex flex-wrap gap-2 p-3 mt-1.5 rounded-xl border border-neutral-silver-400">
        {selectedsOptions.map((el, index) => (
          <Tag title={el.username} key={index} deleteTag={() => removeOption(el.id)}/>
        ))}
        <input
          type="text"
          onChange={handleChange}
          value={input}
          className="flex-1  rounded px-2 py-1 bg-transparent outline-none min-w-[20%]"
          placeholder={t('global.placeholder.search')}
        />
      </div>
      {filteredUsers.length > 0 && (
        <div className="absolute w-full z-10 mt-1 ">
          <ul className="bg-neutral-black border border-neutral-silver-500 rounded-xl overflow-auto">       
            {filteredUsers.map((el, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer"
                onClick={() => selectOption(index)}
              >
                {el.username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default TagInput;
