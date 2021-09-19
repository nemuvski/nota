import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '@/libs/firebase'
import { setAuth } from '@/stores/auth/slice'
import { buildAuthUser } from '@/models/AuthUser'

export const useAuthStateChanged = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      dispatch(setAuth({ user: user ? buildAuthUser(user) : null }))
    })
    return () => unsubscribe()
  }, [dispatch])
}
