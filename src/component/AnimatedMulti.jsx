import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const users = [
  { fullname: 'Sarib', id: '2313wda3' },
  { fullname: 'Ahmed', id: '2313wass' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
];

const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

export default function AnimatedMulti() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { getEmpolyees } = useSelector((state) => state.GetEmployeeSlicer);
  // console.log(getEmpolyees);
  const extractedData = getEmpolyees?.map(({ fullname, _id }) => ({ value : fullname, label:fullname, id: _id }));

console.log(extractedData);
  const handleSelectAll = () => {
    setSelectedOptions(extractedData.filter(option => !option.isDisabled));
    console.log(selectedOptions)
  };
  // const handleSelectUser = () => {
  //   // setSelectedOptions(extractedData.filter(option => option.isDisabled));
  //   console.log(selectedOptions)
  // }

  return (
    <section  className='flex flex-col gap-4'>
      <h1 className='font-semibold text-gray-800'>Send To</h1>
      <div className='w-full flex flex-col gap-2'>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          value={selectedOptions}
          onChange={setSelectedOptions}
          isMulti
          options={extractedData}
        />
        
      </div>
      <div className='flex justify-end gap-2'>
      <Button className='bg-blue-700  capitalize ' size='sm'  onClick={handleSelectAll}>Select All Users</Button>
        {/* <Button className='bg-green-700  capitalize ' size='sm'  onClick={handleSelectUser}>Sel/ected Users</Button> */}
      </div>
    </section>
  );
}
