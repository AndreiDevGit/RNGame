import { useState } from 'react'
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

import StartGameScreens from './screens/StartGameScreens'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import { StatusBar } from 'expo-status-bar'

/*---------------------------Logic--Starts-------------------------------------*/

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true)
    setGuessRounds(numberOfRounds)
  }
  function startNewGameHandler() {
    setUserNumber(null)
    //setGameIsOver(true)
    setGuessRounds(0)
  }
  let screen = <StartGameScreens onPickNumber={pickedNumberHandler} />

  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandler}
      />
    )
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    )
  }
  /*---------------------------Logic--Ends-------------------------------------*/

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#20bad1', '#007bff']}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require('./assets/images/background.png')}
          resizeMethod="auto"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    //backgroundColor: '#6f42c1',
  },
  backgroundImage: {
    opacity: 0.15,
  },
})
