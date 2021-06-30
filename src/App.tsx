import React, { useState, useEffect } from 'react'
import './App.css'

function add2(n: number) {
  return n > 9 ? n : `0${n}`
}
function getTimStr(diff: number) {
  let retStr = ``
    if (diff > 0) {
      let hour = Math.floor(diff / (60 * 60 * 1000))
      let minute = Math.floor(diff / (60 * 1000)) - hour * 60
      let second = Math.floor(diff / (1000)) - hour * 60 * 60 - minute * 60
      retStr = `${add2(hour)}:${add2(minute)}:${add2(second)}`
    }
    return retStr
}


function App() {
  const [timeStr, setTimeStr] = useState<string>('')

  let timer:any = null
  const nowDate = new Date()
  const endTime = new Date(`${nowDate.getFullYear()}/${nowDate.getMonth() + 1}/${nowDate.getDate()} 18:40:00`).getTime()
  let diff = endTime - nowDate.getTime()

  useEffect(() => {
    if (typeof timer === 'number') {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      setTimeStr(getTimStr(diff) || '00:00:00')
      diff -= 1000
    }, 1000)
    return () => {
      if (typeof timer === 'number') {
        clearInterval(timer)
      }
    }
  }, []) // 传入一个空数组 [], 只会调用一次，相当于 componentDidMount 和 componentWillUnmount
  


  

  return (
    <div className="app-bg">
      <div className="time-box">
      {timeStr}
      </div>
    </div>
  )
}

export default App
