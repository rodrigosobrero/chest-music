import AutoComplete from "components/AutoComplete";
import AutoCompleteAlbum from "components/AutoCompleteAlbum";

export default function Test() {
  const roles = [
    'artist',
    'producer',
    'listener',
    'feat'
  ];

  const handleAdd = (e, b) => {
    console.log(e)
    console.log(b)
  }

  const options = [
    'uno',
    'dos',
    'tres'
  ]

  return (
    <>
      <div className='flex items-center justify-center'>
        <AutoCompleteAlbum options={options} />
      </div>
    </>
  )
}