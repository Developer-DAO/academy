import { NextSeo } from 'next-seo'

interface PageSeoLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
}

const PageSeoLayout = ({
  title,
  description,
  children,
}: PageSeoLayoutProps) => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/landing-page-screenshot.png`,
          site_name: 'Developer DAO Academy',
          title: `Developer DAO Academy | ${title}`,
          description: `${description}`,
          images: [
            {
              url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/landing-page-screenshot.png`,
              alt: 'Developer DAO Academy',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@devdao_academy',
          site: '@devdao_academy',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon/favicon.ico',
          },
        ]}
      />
      {children}
    </>
  )
}

export default PageSeoLayout
