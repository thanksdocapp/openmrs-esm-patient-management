import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const sidebarLink = (linkMeta: { name: string; title: string; externalUrl: string }) => {
  return function SidebarLinkComponent() {
    const { t } = useTranslation();
    const { name, title, externalUrl } = linkMeta;

    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames('cds--side-nav__link', {
          'active-left-nav-link': window.location.pathname.includes(name),
        })}>
        {t(title, title)}
      </a>
    );
  };
};
