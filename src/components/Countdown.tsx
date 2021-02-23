import { useEffect, useState } from 'react'
import styles from 'styles/components/Countdown.module.css'

export function Countdown() {
  const [time, setTime] = useState(25 * 60)
  const [active, setActive] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [leftMinute, rightMinute] = String(minutes).padStart(2, '0').split('')
  const [leftSecond, rightSecond] = String(seconds).padStart(2, '0').split('')

  useEffect(() => {
    if (!active || time === 0) return

    setTimeout(() => {
      setTime(currentValue => currentValue - 1)
    }, 1000)
  }, [active, time])

  function startCountdown() {
    setActive(currentValue => !currentValue)
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

      <button 
        className={styles.countdownButton} 
        type='button'
        onClick={startCountdown}
      >
        {active ? 'Pausar ciclo' : 'Iniciar um ciclo'}
      </button>
    </>
  )
}