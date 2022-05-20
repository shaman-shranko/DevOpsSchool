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
    padding: 15,
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
  },
  Card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    height: "100%"
  },
  Avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  TextCenter: {
    textAlign: 'center',
    color:"#3e3e3e"
  },
  BuyButton: {
    backgroundColor: "green"
  },
  MB0: {
    marginBottom: 0,
  },
  MT20: {
    marginTop: 20,
  },
  PV10: {
    paddingVertical: 10
  },
  PV20: {
    paddingVertical: 20
  },
  PH0: {
    paddingHorizontal: 0,
  },
  W150: {
    // width: 120
  },
  FullHight: {
    height: "100%"
  },
  CabinetButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  TitleText: {
    fontSize: 24,
    textAlign: "center",
    color:"#3e3e3e"
  }

})