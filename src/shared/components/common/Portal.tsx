import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: Props) => {
  const $portal = document.getElementById(selector);
  return $portal ? createPortal(children, $portal) : null;
};

export default Portal;
