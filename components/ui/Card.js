import { StyleSheet, View, Dimensions } from 'react-native'

function Card({ children }) {
  return <View style={styles.Card}>{children}</View>
}

export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  Card: {
    justifyContent: 'center',
    alignItems: 'center',
    //flex: 1,
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#107380',
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black', //Shadow for Android only
    //Shadow for IOS - Start
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    //Shadow for IOS - END
  },
})
