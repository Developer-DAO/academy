import CookieConsent from 'react-cookie-consent'
import * as FullStory from '@fullstory/browser'
export default function ConsentBanner() {
  return (
    <CookieConsent
      debug={process.env.NODE_ENV === 'development'}
      enableDeclineButton
      declineButtonText="Decline"
      declineButtonStyle={{
        padding: '.25rem 2rem',
        backgroundColor: 'black',
        border: '1px solid gray',
      }}
      flipButtons
      location="bottom"
      buttonText="Accept"
      buttonClasses="btn btn-white"
      style={{ background: '#171717' }}
      buttonStyle={{
        padding: '.25rem 2rem',
        color: '#000',
        backgroundColor: '#fff',
      }}
      expires={150}
      onAccept={() => FullStory.init({ orgId: 'o-1CKVPB-na1' })}
    >
      This website uses cookies to enhance the user experience.{' '}
    </CookieConsent>
  )
}
