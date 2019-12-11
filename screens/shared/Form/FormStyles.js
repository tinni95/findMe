import { StyleSheet } from 'react-native';
import { isSmallDevice } from '../../../constants/Layout';

export const FormStyles = StyleSheet.create({
  input: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.3,
    color: '#5F5E5E',
    borderBottomColor: '#B19393',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputError: {
    width: '100%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.3,
    borderBottomColor: '#DD1E63',
    color: '#5F5E5E',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputHalf: {
    width: '95%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.3,
    color: '#5F5E5E',
    borderBottomColor: '#B19393',
    fontSize: isSmallDevice ? 14 : 16,
    fontWeight: '500'
  },
  inputHalfError: {
    width: '95%',
    height: 45,
    padding: 8,
    borderBottomWidth: 0.3,
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
  },
  large: {
    margin: 5,
    padding: 5,
    borderColor: '#ADADAD',
    borderWidth: 0.5,
    height: 75,
  },
  xlarge: {
    margin: 5,
    padding: 5,
    borderColor: '#ADADAD',
    borderWidth: 0.5,
    height: 200,
  },
  requisiti: {
    margin: 5,
    padding: 5,
    borderColor: '#ADADAD',
    borderWidth: 1,
    alignContent: "center",
    height: 30,
  },
  requisitiL: {
    flexDirection: "row",
    flexWrap: "wrap",

    borderWidth: 1,
    borderColor: '#ADADAD',
  }
});
