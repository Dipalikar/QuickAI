import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const useInitializeUser = () => {
  const { user, isLoaded } = useUser()

  useEffect(() => {
    const initializeUserPlan = async () => {
      if (isLoaded && user && !user.unsafeMetadata?.plan) {
        try {
          await user.update({
            unsafeMetadata: {
              plan: 'free'
            }
          })
        } catch (error) {
          console.error('Failed to initialize user plan:', error)
        }
      }
    }

    initializeUserPlan()
  }, [isLoaded, user])

  return { user, isLoaded }
}