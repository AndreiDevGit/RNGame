import { useState } from 'react'
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'
import Card from '../components/ui/Card'
import InstructionText from '../components/ui/instructionText'

function StartGameScreens({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('')

  const { width, height } = useWindowDimensions()

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText)
  }

  function resetInputHandler() {
    setEnteredNumber('')
  }
  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber)

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Неверное чило!', 'Число должно быть от 1 до 99', [
        { text: 'Понял', style: 'destructive', onPress: resetInputHandler },
      ])
      return
    }
    onPickNumber(chosenNumber)
  }

  const marginTopDistance = height < 380 ? '3%' : '10%'

  //console.log(marginTopDistance)

  /*--------------------------Front-end----Start------------------------------*/
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={'position'}
      >
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Угадай мое число</Title>
          <Card>
            <InstructionText>Введите число от 1 до 100</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType={'number-pad'}
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>
                  Сбросить
                </PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Пуск
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default StartGameScreens

//const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    /*textDecorationColor: 'black',*/
  },
  rootContainer: {
    flex: 1,
    /*marginTop: deviceHeight < 380 ? '10%' : '10%',*/
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderColor: 'rgb(255,255,255)',
    borderBottomWidth: 2,
    color: 'white',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
})
