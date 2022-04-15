import { StyleSheet } from 'react-native';

export const commonStyle = StyleSheet.create({
  AuthContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "white",
    width: "100%",
    height: "100%"
  },
  Container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#6786DA",
    width: "100%",
    height: "100%"
  },
  CardContainer: {
    width: 400,
    height: "90%",
    padding: 20,
  },
  LoaderContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  Centered: {
    justifyContent: "center",
    alignItems: "center"
  }
})