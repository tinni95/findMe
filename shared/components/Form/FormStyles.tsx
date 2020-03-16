import { StyleSheet, Platform } from "react-native";
import { isSmallDevice } from "../../constants/Layout";

export const FormStyles = StyleSheet.create({
  input: {
    width: "100%",
    height: 45,
    padding: 8,
    color: "#5F5E5E",
    borderBottomColor: "#D3CFCF",
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: "500"
  },
  inputRequisiti: {
    width: "100%",
    height: 45,
    padding: 8,
    borderBottomWidth: 0.5,
    color: "#5F5E5E",
    borderBottomColor: "#D3CFCF",
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: "500"
  },
  inputError: {
    width: "100%",
    height: 45,
    padding: 8,
    borderBottomWidth: 0.3,
    borderBottomColor: "#DD1E63",
    color: "#5F5E5E",
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: "500"
  },
  inputHalf: {
    width: "95%",
    height: 45,
    padding: 8,
    color: "#5F5E5E",
    borderBottomColor: "#D3CFCF",
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: "500"
  },
  inputHalfError: {
    width: "95%",
    height: 45,
    padding: 8,
    borderBottomWidth: 0.3,
    color: "#5F5E5E",
    borderBottomColor: "#DD1E63",
    fontSize: isSmallDevice ? 12 : 14,
    fontWeight: "500"
  },
  inputHalfContainer: {
    flexDirection: "column",
    width: "50%"
  },
  inputHalfsContainer: {
    flexDirection: "row"
  },
  error: {
    color: "#DD1E63",
    textAlign: "right",
    fontSize: isSmallDevice ? 10 : 12,
    marginRight: 10,
    marginTop: 2.5,
    marginBottom: -10
  },
  large: {
    margin: 5,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "#D3CFCF",
    borderWidth: 0.5,
    height: 75,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  largeShadow: {
    margin: 5,
    padding: 7.5,
    borderRadius: 8,
    height: 100,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  xlarge: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderColor: "#D3CFCF",
    backgroundColor: "white",
    borderWidth: 0.5,
    height: 200,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  requisiti: {
    margin: 5,
    padding: 5,
    borderColor: "#D3CFCF",

    borderRadius: 5,
    alignContent: "center",
    height: 30
  },
  requisitiL: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 5,
    borderColor: "#D3CFCF"
  }
});
