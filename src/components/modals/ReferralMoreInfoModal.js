import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/BaseModal';
import Button from 'components/Button';


export default function ReferralMoreInfoModal({handleClose}) {
    const { t } = useTranslation();
  
  return (
    
    <BaseModal>
    <div className='text-neutral-silver-100 pb-8 mw-400px font-bold text-3xl'>Información sobre código de referidos</div>
    <span className='text-neutral-silver-200 pb-8 mw-400px '>
        Se proporcionará al EMBAJADOR un código de referidos para invitar a nuevos usuarios a suscribirse a CHEST.
        <br/><br/>El código de referidos resultará en un veinte por ciento (20%) de beneficio para el EMBAJADOR sobre el valor neto de la suscripción abonada por el referenciante mensualmente, y que se abonará mensualmente durante todos los periodos que el referenciante siga abonando su suscripción.
        <br/><br/>Las sumas indicadas en la presente cláusula se liquidarán de forma trimestral y se abonarán en la forma que convengan las Partes a tal efecto.
        <br/><br/>Asimismo, el EMBAJADOR será elegible para recibir una liquidación en el caso de contar con un saldo favorable de más de USD 50.
        <br/><br/>
        </span>  

      <Button
        text={t('global.close')}
        style='tertiary'
        onClick={handleClose} />

  </BaseModal>
  );
}