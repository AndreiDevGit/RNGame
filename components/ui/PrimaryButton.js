import { StyleSheet, View, Text, Pressable } from 'react-native'

function PrimaryButton({ children, onPress }) {
  return (
    <View style={style.buttonOuterContainer}>
      <View style={style.buttonInnerContainer}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [style.buttonInnerContainer, style.pressedIos]
              : style.buttonInnerContainer
          }
          onPress={onPress}
          android_ripple={{ color: '#17a2b8' }}
        >
          <Text style={style.buttonText}>{children}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default PrimaryButton

const style = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    borderRadius: 28,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  pressedIos: {
    opacity: 0.75,
  },
})
