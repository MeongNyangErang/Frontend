import { SInfoGroup, SInfoKey, SInfoValue } from './styles';

interface InfoFieldProps {
  name: string;
  children: React.ReactNode;
}

const InfoField = ({ name, children }: InfoFieldProps) => {
  return (
    <SInfoGroup>
      <SInfoKey>{name}</SInfoKey>
      <SInfoValue>{children}</SInfoValue>
    </SInfoGroup>
  );
};

export default InfoField;
