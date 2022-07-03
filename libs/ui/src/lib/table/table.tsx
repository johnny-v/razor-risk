import {v4 as uuid} from 'uuid';

export interface TableProps {
  columns: Column[];
  rows: Row[];
  title: string;
  contextMenuToggle: Function;
  formatters: any;
}

export interface Column {
  id: string;
  name: string;
}

export interface Row {
  [key: string]: string | number
}

export function Table(props: TableProps) {
  return (
    <>
      <table className='w-full border border-collapse table-auto'>
        <caption className='pb-2 text-xl font-bold'>{props.title}</caption>
        <thead>
          <tr>
            {props.columns.map(column =>
              <th key={column.id}
                  className='px-5
                  py-3
                  border-b-2
                  border-gray-200
                  bg-gray-100
                  text-left
                  text-xs
                  font-semibold
                  text-gray-600'>
                {column.name}
              </th>
            )}
          </tr>
        </thead>
        <tbody className='text-sm text-gray-900'>
        {props.rows.map((row, index) => <tr
          onContextMenu={(event: any) => props.contextMenuToggle(true, event, row)}
          onClick={(event: any) => props.contextMenuToggle(false, event, row)}
          className={`cursor-pointer border-b border-gray-200 hover:bg-gray-200 ${index%2 !== 0 ? 'bg-gray-50' : ''}`.trim()}
          key={uuid()}>
          {Object.keys(row).map(key =>
            <td key={uuid()}
                className='p-5
                border-b
                border-gray-200
                whitespace-no-wrap'>
              {key in props.formatters ? props.formatters[key](row[key]) : row[key]}
            </td>
          )}
          </tr>
        )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
