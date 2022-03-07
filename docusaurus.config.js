// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KubeDL',
  tagline: 'KubeDL makes deep learning workloads run on Kubernetes more easily and efficiently.',
  url: 'https://kubedl.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'kubedl-io', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your website repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'start',
        content:
            '⭐️ If you like KubeDL, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/kubedl-io/kubedl">GitHub</a>! ⭐️',
      },
      navbar: {
        title: 'KubeDL',
        logo: {
          alt: 'KubeDL',
          src: 'img/kubedl/kubedl-icon-color.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Tutorial',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/kubedl-io/kubedl',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Dingtalk',
                href: 'https://h5.dingtalk.com/circle/healthCheckin.html?dtaction=os&corpId=ding66e5c6edd2286ee0daaacaebab5406a2&b2324693-=bf33ff07-&cbdbhh=qwertyuiop',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'KubeDL GitHub',
                href: 'https://github.com/kubedl-io/kubedl',
              },
              {
                label: 'Morphling GitHub',
                href: 'https://github.com/kubedl-io/morphling',
              },
            ],
          },
        ],
        copyright: `
        <br />
        <strong>© ${new Date().getFullYear()} The KubeDL Authors. All rights reserved. The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/trademark-usage/"> Trademark Usage</a> page.</strong
        `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
