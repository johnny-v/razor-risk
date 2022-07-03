import {ReactNode} from 'react';

/* eslint-disable-next-line */
export interface ButtonProps {
  btnClick: Function;
  children: ReactNode;
  classList: string;
}

export function Button(props: ButtonProps) {
  const className = `font-bold
                     uppercase
                     text-sm
                     px-6
                     py-3
                     outline-none
                     focus:outline-none
                     mr-1
                     mb-1
                     ease-linear
                     transition-all
                     duration-150 ${props.classList ? props.classList : ''.trim()}`


  return (
    <button
      className={className}
      type='button'
      onClick={() => props.btnClick()}>{props.children}</button>
  );
}

export default Button;
