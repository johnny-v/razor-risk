export interface MenuProps {
  context: {
    show: boolean;
    event: any
    data: any;
  };
  options: { name: string; type: number; id: string; }[];
  onSelection: (type: number, data: any) => void;
}

export function Menu(props: MenuProps) {
  if (props.context.show) {
    props.context.event.preventDefault();
    return (
      <ul style={{ top: props.context.event.clientY, left: props.context.event.clientX }}
           className='absolute w-48 bg-white rounded-md overflow-hidden shadow-xl z-20'>
        {props.options.map(o =>
          <li className='block cursor-pointer px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200'
              key={o.id}
              onClick={(e: any) => {e.stopPropagation(); props.onSelection(o.type, props.context.data);}}>
            {o.name}
          </li>
        )}
      </ul>
    );
  }
  return <></>;
}

export default Menu;
