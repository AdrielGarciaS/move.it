import { useChallenges } from 'contexts/ChallengesContext'

import styles from 'styles/components/Profile.module.css'

export function Profile() {
  const { level } = useChallenges()

  return (
    <div className={styles.container}>
      <img src="https://github.com/adrielgarcias.png" alt="Adriel Garcia"/>
      
      <div>
        <strong>Adriel Garcia</strong>

        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}