import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useChallenges } from './ChallengesContext'

const CountdownContext = createContext({} as CountdownContextData)

interface CountdownContextData {
  minutes: number
  seconds: number
  isActive: boolean
  hasFinished: boolean
  startCountdown(): void
  resetCountdown(): void
}

interface Props {
  children: ReactNode
}

const initialTime = 0.1 * 60

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: Props) {
  const { startNewChallenge } = useChallenges()
  
  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  useEffect(() => {
    if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
      return
    }

    if (!isActive || time === 0) return

    countdownTimeout = setTimeout(() => {
      setTime(currentValue => currentValue - 1)
    }, 1000)
  }, [isActive, time])

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setHasFinished(false)
    setTime(initialTime)
  }

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}

export function useCountdown() {
  return useContext(CountdownContext)
}