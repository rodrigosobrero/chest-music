import Chest from 'components/Chest';
import Uploader from 'components/Uploader';
import AccountSuspension from 'components/AccountSuspension';
import { useEffect, useState } from 'react';
import { useGetAccountQuery } from 'store/api';

export default function MyChest() {
  const [disabled, setDisabled] = useState(false);
  const { 
    data: account, 
    isSuccess: isSuccessAccount } = useGetAccountQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isSuccessAccount) {
      if (!account) {
        setDisabled(true);
        return;
      }

      const { status } = account.subscription || {};

      if (status === 'canceled' || status === 'ended') {
        setDisabled(true);
      }
    }
  }, [account]);

  return (
    <>
      <div className='container flex flex-col gap-6 md:gap-10 py-8 lg:py-[60px]'>
        {disabled && (
          <AccountSuspension
            status={account.subscription.status}
            expiration={account.subscription.expiration} />
        )}
        <Uploader disabled={disabled} />
        <Chest />
      </div>
    </>
  )
}