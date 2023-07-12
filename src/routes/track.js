import Breadcrumb from 'components/Breadcrumb';

export default function Track() {
  const breadcrumbItems = [ 
    'My chest', 
    'Party in the neighborhood' 
  ];

  return (
    <>
      <div className='flex'>
        <Breadcrumb items={breadcrumbItems}/>
        <div className='grow flex items-center justify-end'>actions</div>
      </div>
    </>
  )
}