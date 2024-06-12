import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { BaseModal } from 'components/BaseModal';
import Input from 'components/Input';
import Button from 'components/Button';
import { useEffect, useState } from 'react';
import Select from 'components/Select';

export default function SignUpBetaModal(props) {
  const countries = require('data/countries.json');
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    'country': ''
  });

  const handleClose = () => {
    if (props.onClose) props.onClose();
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleBetaSignup = async (data) => {
    setIsLoading(true);

    const body = {
      listado: {
        fullname: data.name,
        artistname: data.artist,
        email: data.email,
        country: form.country,
        language: i18n.language
      }
    }

    const response = await fetch('https://api.sheety.co/a5e55d7839fce9c8a6a726832e76974f/inscriptosBeta/listado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      handleClose();
    } else {
      console.log('error');
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (countries.length > 0) {
      setData(countries.map(({ country, code }) => ({ 'label': country, 'value': code })));
    }
  }, [countries]);

  return (
    <BaseModal
      title={t('global.open chest.beta')}
      description='Request an invitation to access chest BETA. We will contact you with instructions to proceed.'
      show={props.isOpen}
      onClose={handleClose}>
      <form onSubmit={handleSubmit(handleBetaSignup)}>
        <div className='flex flex-col gap-4'>
          <Input
            label={t('signup.full_name')}
            name='name'
            placeholder={t('global.write_here')}
            register={register}
            required
            error={errors.name && t('global.required')} />
          <Input
            label={t('setup.step_two.artist_name')}
            name='artist'
            placeholder={t('global.write_here')}
            register={register}
            required
            error={errors.artist && t('global.required')} />
          <Input
            type='email'
            label='Email'
            name='email'
            placeholder={t('global.write_here')}
            register={register}
            required
            error={errors.email && t('global.required')} />
          <Select
            label={t('account.modals.country_residence')}
            placeholder={t('global.placeholder.select_one')}
            value={form.country}
            options={data}
            required
            onChange={(e) => { setForm({ ...form, 'country': e.target.value }) }} />
        </div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <Button
            text={t('global.cancel')}
            style='tertiary'
            onClick={handleClose} />
          <Button
            type='submit'
            text={t('global.send')}
            style='primary'
            disabled={isLoading}
            loading={isLoading} />
        </div>
      </form>
    </BaseModal>
  )
}