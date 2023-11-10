import { useState, useEffect } from 'react'

import {
  View,
  StyleSheet,
  Alert,
  Text,
  useWindowDimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/instructionText'

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [guessRounds, setGuessRounds] = useState([initialGuess])
  const { width, height } = useWindowDimensions()

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length)
    }
  }, [currentGuess, userNumber, onGameOver])

  useEffect(() => {
    minBoundary = 1
    maxBoundary = 100
  }, [])

  function nexGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      return Alert.alert(
        'Пиздежь обнаружен!!!',
        'Не пытайся наебать систему!',
        [{ text: 'больше не буду!', styles: 'cancel' }]
      )
      return
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess
      const newRndNumber = generateRandomBetween(
        minBoundary,
        maxBoundary,
        currentGuess
      )
    } else {
      minBoundary = currentGuess + 1
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    )
    setCurrentGuess(newRndNumber)
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds])
  }

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>
          Больше или меньше?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nexGuessHandler.bind(this, 'lower')}>
              <Ionicons
                name="md-remove"
                size={24}
              />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nexGuessHandler.bind(this, 'greater')}>
              <Ionicons
                name="md-add"
                size={24}
              />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  )
  if (width > 500) {
    content = (
      <>
        {/*<InstructionText style={styles.instructionText}>
          Больше или меньше?
        </InstructionText>*/}
        <View style={styles.buttonsContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nexGuessHandler.bind(this, 'lower')}>
              <Ionicons
                name="md-remove"
                size={24}
              />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nexGuessHandler.bind(this, 'greater')}>
              <Ionicons
                name="md-add"
                size={24}
              />
            </PrimaryButton>
          </View>
        </View>
      </>
    )
  }
  return (
    <>
      <View style={styles.screen}>
        <Title>Калькулятор думает...</Title>

        {content}

        <View>
          {guessRounds.map((guessRound) => (
            <Text key={guessRound}>{guessRound}</Text>
          ))}
        </View>
      </View>
    </>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
})
