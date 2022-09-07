import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'mapy',
    title: 'Mapy',
    translate: 'MAPY',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'apartment-component',
        title: 'Pomieszkanie',
        translate: 'POMIESZKANIE',
        type: 'item',
        icon: 'whatshot',
        url: 'pomieszkanie ',
      },
      {
        id: 'jobs-component',
        title: 'Praca',
        translate: 'PRACA',
        type: 'item',
        icon: 'whatshot',
        url: 'praca',
      },
    ],
  },
];

export default navigationConfig;
