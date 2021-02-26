import { createContext, ReactNode, useContext, useState } from 'react'

import challenges from '../../challenges.json'

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesContextData {
  level: number
  levelUp(): void
  currentExperience: number
  challengesCompleted: number
  startNewChallenge(): void
  resetChallenge(): void
  activeChallenge: Challenge
  experienceToNextLevel: number
}

const ChallengesContext = createContext({} as ChallengesContextData)

interface Props {
  children: ReactNode
}

export function ChallengesProvider({ children }: Props) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  return (
    <ChallengesContext.Provider 
    value={{ 
      level, 
      levelUp, 
      currentExperience, 
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel
    }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}

export function useChallenges() {
  return useContext(ChallengesContext)
}