export interface ContributorDetails {
  displayName: string
  moreInfoUrl?: string
  avatarUrl?: string
  about?: string
}

export interface ContributorLookup {
  [key: string]: ContributorDetails
}

export const contributors: ContributorLookup = {
  brianfive: {
    displayName: 'Brian Gershon',
    moreInfoUrl: 'https://brianfive.xyz',
    avatarUrl: 'https://brianfive.xyz/profile.png',
    about:
      'Brian has been a member of the DeveloperDAO since November 2021, and enjoys building Web3 user experiences and smart contracts. Also active with Next.js, React and Serverless.',
  },
}