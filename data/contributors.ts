export interface ContributorDetails {
  displayName: string
  moreInfoUrl?: string
  avatarUrl?: string
  about?: string
}

export interface ContributorLookup {
  [key: string]: ContributorDetails
}

/**
 * This is a mapping of handles to contributor details. The handle key will be used
 * in the <ContributorFooter /> component to look up the details.
 */
export const contributors: ContributorLookup = {
  brianfive: {
    displayName: 'Brian Gershon',
    moreInfoUrl: 'https://brianfive.xyz',
    avatarUrl: 'https://brianfive.xyz/profile.png',
    about:
      'Brian has been a member of the DeveloperDAO since November 2021, and enjoys building Web3 user experiences and smart contracts. Also active with Next.js, React and Serverless.',
  },
  piablo: {
    displayName: 'piablo',
    moreInfoUrl: 'https://twitter.com/Skruffster',
    avatarUrl: 'https://avatars.githubusercontent.com/u/40469149?v=4',
    about:
      'Piablo joined Developer_DAO in October 2021 where his primary focus is on education, with D_D Academy and D_D Mentorship. He is passionate about regenerating our planet back to a liveable state for all life forms in a fully equitable and sustainable manner.',
  },
  georgemac510: {
    displayName: 'georgemac510',
  },
  wolovim: {
    displayName: 'wolovim',
    moreInfoUrl: 'https://twitter.com/wolovim',
    avatarUrl: 'https://avatars.githubusercontent.com/u/3621728?v=4',
  },
  _7i7o: {
    displayName: '7i7o',
    moreInfoUrl: 'https://github.com/7i7o',
    avatarUrl: 'https://avatars.githubusercontent.com/u/84824996?v=4',
    about: '7i7o has been a member of the DeveloperDAO since October 2021.',
  },
  mveve: {
    displayName: 'mveve',
  },
}
