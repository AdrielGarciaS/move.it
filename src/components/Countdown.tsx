import { useEffect, useState } from 'react'
import { useChallenges } from 'contexts/ChallengesContext'

import styles from 'styles/components/Countdown.module.css'

const initialTime = 0.1 * 60

let countdownTimeout: NodeJS.Timeout

export function Countdown() {
  const { startNewChallenge } = useChallenges()
  
  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [leftMinute, rightMinute] = String(minutes).padStart(2, '0').split('')
  const [leftSecond, rightSecond] = String(seconds).padStart(2, '0').split('')

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
    setTime(initialTime)
  }

  return (
    <>
      <div className={styles.container}>

        <div>
          <span>{leftMinute}</span>
          <span>{rightMinute}</span>
        </div>

        <span>:</span>

        <div>
          <span>{leftSecond}</span>
          <span>{rightSecond}</span>
        </div>
      </div>

      { hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
              type='button'
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              className={styles.countdownButton} 
              type='button'
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          ) }
        </>
      ) }
    </>
  )
}