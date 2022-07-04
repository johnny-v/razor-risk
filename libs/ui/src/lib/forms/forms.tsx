/* eslint-disable-next-line */
import {MutableRefObject} from 'react';

export interface FormsProps {
  data: any;
  controls: { type: string; placeholder: string; name: string; id: string; }[];
  elRef: MutableRefObject<any>;
  formatters: any;
}

export function Forms(props: FormsProps) {
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
               defaultValue={props.data ?
                 f.name in props.formatters ? props.formatters[f.name](props.data[f.name]) : props.data[f.name] :
                 null
               }
               type={f.type}/>
      </div>)}
    </form>
  );
}

export default Forms;
