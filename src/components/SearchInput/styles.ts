import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  margin: 2px;
  margin-left: 10px;
  background: #e4e3e2;
  border-radius: 20px;

  flex-direction: row;
  align-items: center;
  align-self: center;

  border-width: 1px;
  border-color: #228b22;

  ${(props: {isErrored: any}) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `};
  ${(props: {isFocused: any}) =>
    props.isFocused &&
    css`
      border-color: #228b22;
    `};
`;
export const TextInput = styled.TextInput`
  flex: 1;
  color: #010210;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;
export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
