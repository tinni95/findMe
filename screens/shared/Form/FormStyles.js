import { StyleSheet } from 'react-native';
import { isSmallDevice } from '../../../constants/Layout';

export const FormStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.5,
    color: '#5F5E5E',
    borderBottomColor: '#B19393',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputError: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DD1E63',
    color: '#5F5E5E',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputHalf: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.5,
    color: '#5F5E5E',
    borderBottomColor: '#B19393',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputHalfError: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.5,
    color: '#5F5E5E',
    borderBottomColor: '#DD1E63',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputHalfContainer: {
    flexDirection: 'column',
    width: '50%'
  },
  inputHalfsContainer: {
    flexDirection: 'row'
  },
  error: {
    color: '#DD1E63',
    textAlign: 'right',
    fontSize: isSmallDevice ? 10 : 12,
    marginRight: 10,
    marginTop: 2.5,
    marginBottom: -10
  }
});
