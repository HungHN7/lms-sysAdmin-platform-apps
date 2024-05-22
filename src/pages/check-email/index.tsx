import CheckEmailContent from 'src/containers/check-email';
import SignInTemplate from 'src/template/signin-template';

function CheckEmail() {
  return (
    <div className='h-screen'>
      <SignInTemplate
        isShowHeader={false}
        isBorder
        Content={CheckEmailContent}
        Header={() => <p className='p-0'></p>}
      />
    </div>
  );
}

export default CheckEmail;

// const Container = styled.div`
//   .SignInTemplate__card-content {
//     width: 531px;
//     height: 500px;
//     display: flex;
//     justify-content: center;
//     padding: 56px 40px;
//     .tracking-tight {
//       margin-bottom: 28px;
//     }
//   }
// `;
