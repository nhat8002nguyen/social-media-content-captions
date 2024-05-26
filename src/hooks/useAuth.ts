import { useEffect, useState } from "react"
import * as localstorage from "@src/utilities/localforageUtils"

export default function useAuth() {
  const [isAuthenticated, setIsAutheticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const expiredTime = await localstorage.getItem("expiredTime")

      if (expiredTime && new Date(expiredTime).getTime() > new Date().getTime()) {
        setIsAutheticated(true)
      } else {
        setIsAutheticated(false)
      }
    }
    checkAuth()
  }, [])

  return [isAuthenticated]
}
