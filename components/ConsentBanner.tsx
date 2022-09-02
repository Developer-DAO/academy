import CookieConsent from 'react-cookie-consent'
interface ConsentProps {
  isConsented: (p: boolean) => void
}

const ConsentBanner = (props: ConsentProps) => {
  const { isConsented } = props

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
      onAccept={() => isConsented(true)}
      onDecline={() => isConsented(false)}
    >
      This website uses cookies to enhance the user experience.{' '}
    </CookieConsent>
  )
}

export default ConsentBanner
