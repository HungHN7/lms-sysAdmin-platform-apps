import { Label } from 'src/components/ui';
import TemplateCommonWithForm from 'src/containers/form-user';
import FormRegis from './FormRegis';
import styled from 'styled-components';

const TenantRegistration = () => {
  return (
    <Container>
      <TemplateCommonWithForm
        Form={FormRegis}
        Header={() => (
          <div className='flex justify-center'>
            <Label className='text-[42px] leading-[56px] font-semibold text-center text-[#000000]'>
              Create account
            </Label>
          </div>
        )}
      />
    </Container>
  );
};

export default TenantRegistration;
const Container = styled.div`
  .left-login {
    margin-bottom: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-left: 55px;
  }
`;
