import { useTranslation } from '../libs/i18n.hooks';

export const useSidebarHooks = () => {
  const tSidebar = useTranslation();

  return { tSidebar };
};
