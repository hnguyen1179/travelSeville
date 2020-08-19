import { useEffect } from "react"

const useEventListener = (target, type, listener, ...options) => {
  useEffect(() => {
    const targetIsRef = target.hasOwnProperty("current")
    const currentTarget = targetIsRef ? target.current : target
    if (currentTarget)
      currentTarget.addEventListener(type, listener, ...options)
    return () => {
      if (currentTarget)
        currentTarget.removeEventListener(type, listener, ...options)
    }
  }, [target, type, listener, options])
}

export default useEventListener
