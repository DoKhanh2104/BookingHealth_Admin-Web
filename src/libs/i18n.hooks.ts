import {
  createElement,
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { getNestedProperty, replaceArgs } from './i18n.utils';

interface I18nContextType {
  locale: string;
  messages: Record<string, unknown>;
}

export const I18nContext = createContext<I18nContextType | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: string;
  messages?: Record<string, unknown>;
}

export function I18nProvider({ children, defaultLocale = 'ja', messages = {} }: I18nProviderProps) {
  const [locale] = useState(defaultLocale);
  return createElement(I18nContext.Provider, { value: { locale, messages } }, children);
}

// Hooks for translating message
export function useTranslation(ns?: string) {
  const { locale, messages } = useI18n();

  const translate = useCallback(
    (key: string, args?: object | Array<string | number>) => {
      const msgs = ns
        ? (messages as Record<string, Record<string, { [key: string]: string }>>)[
            locale as string
          ]?.[ns]
        : (messages as Record<string, Record<string, { [key: string]: string }>>)[locale as string];

      if (!msgs) return key;

      const msg = getNestedProperty(msgs, key);

      if (!msg || typeof msg !== 'string') return key;

      return replaceArgs(msg, args);
    },
    [locale, ns, messages],
  );

  return translate;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
