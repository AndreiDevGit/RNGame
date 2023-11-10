import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import Title from '../components/ui/Title'
import PrimaryButton from '../components/ui/PrimaryButton'

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions()

  /*-------------LandScaleMod-------starts------------*/
  let imageSize = 300
  if (width < 380) {
    imageSize = 150
  }
  if (height < 400) {
    imageSize = 80
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  }
  /*-------------LandScaleMod-------Ends------------*/

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>Игра оконченна!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('.././assets/images/success.png')}
          />
        </View>
        <Text style={styles.summaryText}>
          Понадобилось <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          попыток чтобы угадать число:{' '}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>
          Перезапустить игру
        </PrimaryButton>
      </View>
    </ScrollView>
  )
}

export default GameOverScreen

/*const deviceWidth = Dimensions.get('window').width*/

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    /*width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderRadius: deviceWidth < 380 ? 75 : 150,*/

    borderWidth: 3,
    borderColor: 'white',
    overflow: 'hidden',
    margin: 35,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: 'red',
  },
})
