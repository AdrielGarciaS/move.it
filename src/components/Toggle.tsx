import { useEffect, useState } from 'react'
import styles from 'styles/components/Toggle.module.css'

const light = {
  '--white': '#fff',
  '--background': '#f2f3f5',
  '--gray-line': '#dcdde0',
  '--text': '#666',
  '--text-highlight': '#b3b9ff',
  '--title': '#2e384d',
  '--red': '#e83f5b',
  '--green': '#4cd62b',
  '--blue': '#5965e0',
  '--blue-dark': '#4953b8',
  '--blue-twitter': '#2aa9e0',
}

const dark = {
  '--white': '#0D1117',
  '--background': '#06090F',
  '--gray-line': '#21262D',
  '--text': '#AFB5BB',
  '--text-highlight': '#0D11A5',
  '--title': '#C9D1D9',
  '--red': '#CE3431',
  '--green': '#2EA043',
  '--blue': '#1F6FEB',
  '--blue-dark': '#0D11A5',
  '--blue-twitter': '#2aa9e0',
}

type Theme = 'light' | 'dark'

export function Toggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const _theme = theme === 'light' ? light : dark

    Object.entries(_theme).forEach(([variable, color]) => {
      document.documentElement.style.setProperty(variable, color)
    })
  }, [theme])

  function handleChangeTheme() {
    const _theme = theme === 'light' ? 'dark' : 'light'
    setTheme(_theme)
  }

  return (
    <div className={styles.container}>
      <input type="checkbox" onClick={handleChangeTheme} />
    </div>
  )
}