import { useCountdown } from 'contexts/CountdownContext'
import styles from 'styles/components/Countdown.module.css'


export function Countdown() {
  const { 
    minutes, 
    seconds, 
    isActive, 
    hasFinished, 
    resetCountdown, 
    startCountdown,
    currentTime,
    totalTime
  } = useCountdown()

  const [leftMinute, rightMinute] = String(minutes).padStart(2, '0').split('')
  const [leftSecond, rightSecond] = String(seconds).padStart(2, '0').split('')

  const percentCountdown = Math.round((currentTime * 100) / totalTime)

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
              <span style={{ width: `${percentCountdown}%` }} />
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