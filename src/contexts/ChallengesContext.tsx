import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

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
  completeChallenge(): void
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

  const [activeChallenge, setActiveChallenge] = useState<Challenge>(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex] as Challenge

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()
    
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
        silent: true
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) return

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
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
      completeChallenge,
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