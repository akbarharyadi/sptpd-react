import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
  },
  mainContainer: {
    flex: 1,
    marginTop: 0,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  logo: {
    width: 250,
    alignSelf: 'center',
    resizeMode: 'contain',
    padding: Metrics.doublePadding
  },
  centered: {
    alignItems: 'center',
    paddingTop: 50
  },
  backgroundImage: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
})
