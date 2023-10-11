import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon  } from "@heroicons/react/24/solid";

function FAQItem({ answer, question, i }) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  return (
      <div className="bg-neutral-silver-700 p-5 w-full mx-auto rounded-xl" onClick={toggle}>
        <div className={`flex justify-between md:items-center items-top ${i === 0 ? 'gap-x-2' : 'gap-x-10'}  md:gap-auto`}>
          <p className="text-white text-left font-archivo text-lg">{question}</p>
            {show ? (
              <ChevronUpIcon className="h-6 w-6 text-brand-gold" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 text-neutral-silver-300" />
            )}
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
  