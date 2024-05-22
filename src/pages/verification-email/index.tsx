import EmailVerification from 'src/containers/email-verification';
import SignInTemplate from 'src/template/signin-template';

function VerificationEmail() {
  return (
    <SignInTemplate
      Content={EmailVerification}
      isBorder
    />
  );
}

export default VerificationEmail;
