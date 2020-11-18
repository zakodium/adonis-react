import { createContext, useContext } from 'react';

import { AdonisContextContract } from '@ioc:React';

const adonisContext = createContext<AdonisContextContract | null>(null);

export const AdonisContextProvider = adonisContext.Provider;

export function useAdonisContext(): AdonisContextContract {
  const context = useContext(adonisContext);
  if (!context) {
    throw new Error('useAdonisContext called in the wrong context');
  }
  return context;
}
