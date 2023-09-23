import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon  } from "@heroicons/react/24/solid";

function FAQItem({ answer, question }) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  return (
      <div className="bg-neutral-silver-700 p-5 w-full mx-auto rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-white text-left font-archivo text-lg">{question}</p>
          <button onClick={toggle} className="flex p-4 justify-end">
            {show ? (
              <ChevronUpIcon className="h-5 w-5 text-brand-gold" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div
          className={`transform-gpu transition-transform ${
            show ? 'scale-y-100' : 'scale-y-0'
          } origin-top`}
        >
        {show &&  <div>
            <p className="text-base text-left text-neutral-silver-200">
              {answer}
            </p>
          </div>
          }
        </div>
      </div>
    );
}
export default FAQItem;
  