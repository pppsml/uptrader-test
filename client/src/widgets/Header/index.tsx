import { IoLogoGithub } from 'react-icons/io5'

import { Container } from '@/shared/ui'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.header__inner}>
          <h1 color='#222'>Uptrader - todo</h1>
          <div className={classes.header__links}>
            <Link to='' target='_blank'><IoLogoGithub /></Link>
          </div>
        </div>
      </Container>
    </header>
  )
}