import React from 'react'
import Box from '@material-ui/core/Box'
import { authChanged } from '../../services/auth'

const MainPage = (props) => {
  const [firstLoad, setFirstLoad] = React.useState(null)
  const [dataUser, setDataUser] = React.useState(null)
  const [canLoad, setCanLoad] = React.useState(true)

  React.useEffect(() => {
    if (firstLoad === false && canLoad) {
      setFirstLoad(true)
      setCanLoad(false)
      if (dataUser) {
        props.history.push('/dashboard')
      } else {
        props.history.push('/login')
      }
    }
    return () => {}
    //eslint-disable-next-line
  }, [firstLoad]);

  React.useEffect(() => {
    authChanged((user) => {
      setFirstLoad(false)
      setDataUser(user)
    })
    return () => {}
    //eslint-disable-next-line
  }, []);

  return <Box />
}

export default MainPage;
