import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './App.css'

function add2(n: number) {
  return n > 9 ? n : `0${n}`
}
function getTimStr(endTime: number, cb?: Function):string {
  console.log('getTimStr')
  let diff = endTime - Date.now()  
  let retStr = '00:00:00'
  if (diff > 0) {
    let hour = Math.floor(diff / (60 * 60 * 1000))
    let minute = Math.floor(diff / (60 * 1000)) - hour * 60
    let second = Math.floor(diff / (1000)) - hour * 60 * 60 - minute * 60
    retStr = `${add2(hour)}:${add2(minute)}:${add2(second)}`
  } else {
    cb && cb()
  }
  return retStr
}


interface Sentences {
  name: string
  from: string
}
interface SentencesResponse {
  content?: number
  author?: string
}


function getSentences() {
  return axios.get<SentencesResponse>('https://v1.jinrishici.com/all.json').then(res => {
    if (res.data) {
      return res.data
    }
    throw new Error('error')
  })
}


const nowDate = new Date()
const endTime = new Date(`2022/10/31 18:30:00`).getTime()
const initTimeStr = getTimStr(endTime)

function App() {
  console.log('App page', Promise)
  const timerRef = useRef<number>()
  const [timeStr, setTimeStr] = useState<string>(initTimeStr) // 只会初始化一次
  const [sentences, setSentences] = useState<SentencesResponse>({})


  useEffect(() => {
    console.log('App useEffect')

    getSentences().then(res => {
      setSentences(res)
    }).catch(e => {})

    clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      console.log(timerRef.current)
      setTimeStr(getTimStr(endTime, () => {
        window.clearInterval(timerRef.current)
      }))
    }, 1000)
    return () => {
      window.clearInterval(timerRef.current)
    }
  }, []) // 传入一个空数组 [], 只会调用一次，相当于 componentDidMount 和 componentWillUnmount
    

  return (
    <div className="app-bg">
      <div className="sentence-box">
        <div className="name">{sentences.content}</div>
        <div className="name-from">-{sentences.author}</div>
      </div>
      <div className="time-box">
      {timeStr}
      </div>
    </div>
  )
}

export default App
