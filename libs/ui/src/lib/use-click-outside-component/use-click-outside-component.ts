import {useEffect} from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseClickOutsideComponent {
  ref: any;
  cb: Function;
}

export function useClickOutsideComponent(ref: any, cb: Function) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default useClickOutsideComponent;
