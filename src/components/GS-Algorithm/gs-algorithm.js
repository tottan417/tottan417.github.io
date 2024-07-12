import { useState } from "react"
import './gs-algorithm.css'

const PreferenceList = (gender) => {
    let arrayFlag = [1, 1, 1, 1, 1], array = []
    while (array.length < 5) {
        let random = Math.floor(Math.random() * 5)
        if (arrayFlag[random] === 1) {
            if (gender === "man") array.push(String.fromCharCode(97 + random))
            else array.push(random+1)
            arrayFlag[random] = 0
        }
    }
    return array
}

function App() {
    const [count, setCount] = useState(110)
    const menPrefarences = [PreferenceList("man"), PreferenceList("man"), PreferenceList("man"), PreferenceList("man"), PreferenceList("man")]
    const womenPrefarences = [PreferenceList("woman"), PreferenceList("woman"), PreferenceList("woman"), PreferenceList("woman"), PreferenceList("woman")]

  return (
    <>
      <div className="component gs-algorithm">
        <div className="title">Gale-Shapley Algorithm作成中</div>
        <div className="resetButton">
            <button onClick={() => setCount((count) => count + 5)}>
                resetButton {count}
            </button>
        </div>
        <div className="men">
            <div className="man">男性1：{menPrefarences[0]}</div>
            <div className="man">男性2：{menPrefarences[1]}</div>
            <div className="man">男性3：{menPrefarences[2]}</div>
            <div className="man">男性4：{menPrefarences[3]}</div>
            <div className="man">男性5：{menPrefarences[4]}</div>
        </div>
        <div className="women">
            <div className="woman">女性a：{womenPrefarences[0]}</div>
            <div className="woman">女性b：{womenPrefarences[1]}</div>
            <div className="woman">女性c：{womenPrefarences[2]}</div>
            <div className="woman">女性d：{womenPrefarences[3]}</div>
            <div className="woman">女性e：{womenPrefarences[4]}</div>
        </div>
      </div>
    </>
  )
}

export default App