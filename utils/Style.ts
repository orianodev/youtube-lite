import { StyleSheet } from "react-native";

export const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2A3A",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 10,
  },
  heading: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },
  text: {
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    paddingLeft: 5,
    outlineStyle: "none",
    fontFamily: "Poppins-Medium",
  },
  button: {
    width: 100,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 55,
    borderRadius: 5,
  },
  title: {
    marginTop: 5,
    fontSize: 11,
    color: "black",
    fontFamily: "Poppins-Bold",
  },
  info: {
    fontSize: 10,
    color: "black",
    fontFamily: "Poppins-Medium",
    marginBottom: 5,
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  video: {
    flex: 1,
  },
  videoContainer: {
    height: 180,
    width: 320,
  },
  sliderRow: {
    width: 300,
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: {
    width: 200,
    height: 40,
  },
  sliderLabel: {
    color: "white",
    width: 30,
    display: "flex",
    justifyContent: "center",
    fontFamily: "Poppins-Medium",
  },
  router: {
    width: "100%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    position: "absolute",
    bottom: 0,
    zIndex: 100,

    paddingVertical: 15,
    marginTop: 10,

    backgroundColor: "lightgrey",
  },
  routerTab: {},
});
