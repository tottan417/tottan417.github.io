import { useRef, useState, useEffect } from "react"
import * as d3 from "d3";
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

const GaleSaplay = () => {
  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)
    svgElement.append("circle")
      .attr("cx", 150)
      .attr("cy", 70)
      .attr("r",  50)
  }, [])

  return (
    <svg ref={ref} />
  )
}

function App() {
    const [count, setCount] = useState(110)
    const menPrefarences = [PreferenceList("man"), PreferenceList("man"), PreferenceList("man"), PreferenceList("man"), PreferenceList("man")]
    const womenPrefarences = [PreferenceList("woman"), PreferenceList("woman"), PreferenceList("woman"), PreferenceList("woman"), PreferenceList("woman")]

  return (
    <>
      <div className="component gs-algorithm">
        <div className="titleAndButton">
          <div className="title">Gale-Shapley Algorithm</div>
          <div className="startButton"><button>start</button></div>
          <div className="resetButton">
              <button onClick={() => setCount((count) => count + 5)}>
                  reset
              </button>
          </div>
        </div>
        <div className="algorithm">
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
      </div>
    </>
  )
}

export default App