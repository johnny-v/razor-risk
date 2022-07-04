/* eslint-disable-next-line */
import {MutableRefObject, useState} from 'react';

export interface FormsProps {
  data: any;
  controls: { type: string; placeholder: string; name: string; id: string; }[];
  elRef: MutableRefObject<any>;
  formatters: any;
}

export function Forms(props: FormsProps) {
  const [values, setValues] = useState(Object.keys(props.data)
    .reduce((acc, curr) => {

      acc = {
        ...acc,
        [curr]: curr in props.formatters ? props.formatters[curr](props.data[curr]) : props.data[curr]
      }

      return acc;
    }, {})
  );

  function handleChange(e: any, key: string) {
    setValues({...values, [key]: key in props.formatters ? props.formatters[key](e.target.value): e.target.value })
  }


  return (
    <form ref={props.elRef}>
      {props.controls.map(f => <div key={f.id} className='pb-4'>
        <label className='block text-sm font-semibold pb-2'
               htmlFor={f.name}>
          {f.placeholder}:
        </label>
        <input placeholder={f.placeholder}
               className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
               name={f.name}
               onChange={(e) => handleChange(e, f.name)}
               value={values ?
                 values[f.name as keyof typeof values] :
                 ''
                }
               type={f.type}/>
      </div>)}
    </form>
  );
}

export default Forms;
