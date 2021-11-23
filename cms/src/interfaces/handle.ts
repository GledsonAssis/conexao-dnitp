import { RefAttributes } from 'react';

export type Handle<T> = T extends React.ForwardRefExoticComponent<RefAttributes<infer T2>> ? T2 : never;
