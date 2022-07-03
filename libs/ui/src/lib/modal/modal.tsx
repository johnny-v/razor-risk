import {ReactNode, useEffect} from 'react';
import {createPortal} from 'react-dom';
import Button from '../button/button';

export interface ModalProps {
  show: boolean;
  title: string;
  children: ReactNode;
  onClose: Function;
  onSave: Function;
}

export function Modal(props: ModalProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', escHandler);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', escHandler);
      }
    };
  }, []);

  if (!props.show) return <></>;

  function escHandler(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      props.onClose()
    }
  }

  return createPortal(
    <>
      <div onClick={() => props.onClose()}
        className='justify-center
                   items-center
                   flex
                   overflow-x-hidden
                   overflow-y-auto
                   fixed
                   inset-0
                   z-50
                   outline-none
                   focus:outline-none'>
        <div className='relative
                        w-1/3
                        my-6'
             onClick={(e) => e.stopPropagation()}>
          <div className='border-0
                          rounded-lg
                          shadow-lg
                          relative
                          flex
                          flex-col
                          w-full
                          bg-white
                          outline-none
                          focus:outline-none'>
            <div className='flex
                            items-start
                            justify-between
                            p-5
                            border-b
                            border-solid
                            border-slate-200
                            rounded-t'>
              <h3 className='text-3xl
                             font-semibold'>
                {props.title}
              </h3>
            </div>
            <div className='relative
                            px-4
                            w-full
                            pt-4'>
              {props.children}
            </div>
            <div className='flex
                            items-center
                            justify-end
                            p-4
                            border-t
                            border-solid
                            border-slate-200
                            rounded-b'>
              <Button classList='text-red-500 background-transparent'
                      btnClick={() => props.onClose()}>Cancel</Button>
              <Button classList='rounded text-white shadow rounded hover:shadow-lg bg-emerald-500 active:bg-emerald-600'
                      btnClick={() => props.onSave()}>OK</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-50
                      fixed
                      inset-0
                      z-40
                      bg-black'></div>
    </>, document.body);
}

export default Modal;
