import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import "../styles/ScrollToTop.css"
export const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false)
  const scrollToTop = () => window.scrollTo({top : 0, behavior : "smooth"})
  useEffect(() => {
    const handleShowingButton = () => {
      window.scrollY >= 500 ? setShowButton(true) : setShowButton(false)
    }
    window.addEventListener("scroll", handleShowingButton)
    return () => {
      window.removeEventListener("scroll", handleShowingButton)
    }
  }, [])
  return (
    <span className={showButton ?'scroll-to-top show' :'scroll-to-top'} onClick={scrollToTop}>
    <FaArrowUp />
  </span>
  )
}
