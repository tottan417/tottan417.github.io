import { useState, useRef, useEffect } from "react"
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
};

const GaleShapley = () => {
  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.selectAll("*").remove(); // 以前の内容をクリア

    const men = ['1', '2', '3', '4', '5'], women = ['a', 'b', 'c', 'd', 'e'];
    const menPreferences = men.map(man => PreferenceList("man"));
    const womenPreferences = women.map(woman => PreferenceList("woman"));

    const menNodes = men.map((d, i) => ({ id: d, x: 155, y: 12 + i * 44, preferences: menPreferences[i] }));
    const womenNodes = women.map((d, i) => ({ id: d, x: 245, y: 12 + i * 44, preferences: womenPreferences[i] }));
    const nodes = menNodes.concat(womenNodes);

    const node = svgElement.append("g").attr("class", "nodes").selectAll("circle", "text").data(nodes).enter()
      .append("circle").attr("class", "node").attr("r", 10).attr("cx", d => d.x).attr("cy", d => d.y).attr("fill", "none").attr("stroke", "black");

    svgElement.append("g").selectAll("text").data(nodes).enter()
      .append("text").attr("x", d => d.x).attr("y", d => d.y + 2).attr("text-anchor", "middle").attr("alignment-baseline", "middle").attr("fill", "black").text(d => d.id);

    svgElement.append("g").selectAll("text").data(nodes).enter()
      .append("text").attr("x", d => d.x - (d.x < 200 ? 145 : -20)).attr("y", d => d.y + 5).text(d => d.preferences.join(" ≻ "));

    console.log('menPreferences', menPreferences);
    const matching = {};
    const algorithm_tmp = [0, 0, 0, 0, 0];

    const stack = [5, 4, 3, 2, 1];
    while (stack.length > 0) {
      const target_man = stack.pop();
      const prefer_woman = menPreferences[target_man-1][algorithm_tmp[target_man-1]];
      var prefer_woman_pair = "-1"
      for (let key in matching) {
        if (matching[key] === prefer_woman) prefer_woman_pair = key;
      }
      if (prefer_woman_pair === "-1") matching[target_man] = prefer_woman;
      else {
        for (let key in womenPreferences[prefer_woman.charCodeAt(0) - 97]) {
          if (key === prefer_woman_pair) {stack.push(target_man); algorithm_tmp[target_man-1] += 1; break;}
          if (key === target_man) {stack.push(prefer_woman_pair); algorithm_tmp[prefer_woman_pair-1] += 1; break;}
        }
      }
    }

    const links = Object.keys(matching).map(man => {
      return {
        source: nodes.find(node => node.id === man),
        target: nodes.find(node => node.id === matching[man])
      };
    });

    const link = svgElement.append("g").attr("class", "links").selectAll("line").data(links).enter()
      .append("line").attr("class", "link").attr("stroke", "black");

    function ticked() {
      link
          .attr("x1", d => d.source.x + 10)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x - 10)
          .attr("y2", d => d.target.y);
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    }

    ticked(); // 初期位置でのリンクの描画
  }, []);

  return (
    <svg ref={ref} width="100%" height="100%" viewBox="0 0 400 200"/>
  );
}

function App() {
  const [resetKey, setResetKey] = useState(0);
  const handleReset = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div className="component gs-algorithm">
        <div className="titleAndButton">
          <div className="title">Gale-Shapley Algorithm</div>
          <div className="startButton"><button>step(工事中)</button></div>
          <div className="resetButton">
            <button onClick={handleReset}>
                  reset
            </button>
          </div>
        </div>
        <div className="algorithm">
          <GaleShapley key={resetKey} />
        </div>
      </div>
    </>
  )
}

export default App