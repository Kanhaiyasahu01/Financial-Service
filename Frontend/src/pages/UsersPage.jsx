import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { UserManager } from '../components/UserManager'
import { fetchUsers } from '../features/users/usersSlice'

export function UsersPage() {
  const dispatch = useAppDispatch()
  const { error } = useAppSelector((state) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return <UserManager />
}
