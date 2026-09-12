// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'roadmap',
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/quickstart',
        'guides/integrating-the-sdk',
        'guides/recovery-flow',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/contracts',
        'architecture/sdk',
        'architecture/backend',
        'architecture/apps',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/threat-model',
        'security/responsible-disclosure',
      ],
    },
  ],
};

export default sidebars;
