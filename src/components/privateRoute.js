import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authChanged, getUserInfo } from '../services/auth'
import { userAtom, utilsAtom } from '../atoms';
import { useAtom } from 'jotai'

const PrivateRoute = ({component: Component, ...rest}) => {
  const [endLoad, setEndLoad] = React.useState(false)
  const [uid, setUid] = useAtom(userAtom.uid)
  const [, setUserInfo] = useAtom(userAtom.userInfo)
  const [, setLoading] = useAtom(utilsAtom.loading)

  React.useEffect(() => {
    authChanged(async (user) => {
      try {
        if (!endLoad) {
          if (user) {
            // Get user info
            const userMe = await getUserInfo()
            if(userMe.onboarding_status === 'completed') {
              // setUid('')
            } else {
              setUid(user.uid)
            }
            setUserInfo(ov => ({...ov, ...userMe}))
            setLoading((ov) => ({...ov, opacity: 0.7}))
          } else {
            setLoading((ov) => ({...ov, opacity: 1}))
          }
        }
        setEndLoad(true)
      } catch (e) {
        setEndLoad(true)
      }
    })
    //eslint-disable-next-line
  }, [])

  return endLoad ? <Route
    {...rest}
    render={(props) => uid
      ? <Component {...props} />
      : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
  /> : null
}

export default PrivateRoute;
