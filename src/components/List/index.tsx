import { ReactNode } from 'react';

export default function List({ children }: { children: ReactNode }) {
  return (
    <ul className="divide-y divide-slate-100 flex flex-wrap">{children}</ul>
  );
}
