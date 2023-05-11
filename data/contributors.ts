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
  _7i7o: {
    displayName: '7i7o',
    moreInfoUrl: 'https://github.com/7i7o',
    avatarUrl: 'https://avatars.githubusercontent.com/u/84824996?v=4',
    about: '7i7o has been a member of the DeveloperDAO since October 2021.',
  },
  piablo: {
    displayName: 'piablo',
  },
  georgemac510: {
    displayName: 'georgemac510',
  },
}
