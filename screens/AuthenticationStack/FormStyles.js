import { StyleSheet } from 'react-native';
import { isSmallDevice } from '../../constants/Layout';

export default FormStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.5,
    color: '#5F5E5E',
    borderRadius: 14,
    borderBottomColor: '#B19393',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputError: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: 'red',
    color: '#5F5E5E',
    borderRadius: 14,
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputHalf: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.5,
    color: '#5F5E5E',
    borderRadius: 14,
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
    borderRadius: 14,
    borderBottomColor: 'red',
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
    color: 'red',
    textAlign: 'right',
    fontSize: isSmallDevice ? 10 : 12,
    marginRight: 10,
    marginTop: 2.5,
    marginBottom: -10
  }
});
