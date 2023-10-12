import { getRandomInt } from './algorithms'

const funnyWrongReactions = [
  'Puh',
  'Oh je',
  'Sto to jenoz budze',
  'Wuslobodz mje....',
  'Nek pa so raz kusk napinaj',
  'Tak to dale njendze',
  'amateur....',
  '🙄'
]

const funnyCorrectReactions = ['Super', 'Mega', 'Perfekt']

export const getFunnyReaction = (value: 'correct' | 'wrong') => {
  switch (value) {
    case 'correct':
      const randomCorrectNumber = getRandomInt(
        0,
        funnyCorrectReactions.length
      )
      return funnyCorrectReactions[randomCorrectNumber]

    case 'wrong':
      const randomWrongNumber = getRandomInt(0, funnyWrongReactions.length)
      return funnyWrongReactions[randomWrongNumber]
  }
}
