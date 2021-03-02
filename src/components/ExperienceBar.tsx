import { useChallenges } from 'contexts/ChallengesContext'
import styles from 'styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useChallenges()

  const percentToNextLevel = Math.round((currentExperience * 100) / experienceToNextLevel)

  return (
    <header className={styles.container}>
      
      <span>0 xp</span>

      <div>
        <div 
          className={styles.progressBar}
          style={{ width: `${percentToNextLevel}%` }}
        />

        <span className={styles.currentExperience} style={{ left: '50%' }}>
          {currentExperience} xp
        </span>
      </div>
      
      <span>{experienceToNextLevel} xp</span>

    </header>
  )
}