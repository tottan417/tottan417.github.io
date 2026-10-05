import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import './gs-algorithm.css';

const preferenceList = (side) => {
  const values = side === "man"
    ? ['a', 'b', 'c', 'd', 'e']
    : ['1', '2', '3', '4', '5'];

  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const runGaleShapley = (men, women, menPreferences, womenPreferences) => {
  const nextProposalIndex = Object.fromEntries(men.map((man) => [man, 0]));
  const womanPartner = Object.fromEntries(women.map((woman) => [woman, null]));
  const manPartner = Object.fromEntries(men.map((man) => [man, null]));

  const womenRank = {};
  women.forEach((woman, i) => {
    womenRank[woman] = {};
    womenPreferences[i].forEach((man, rank) => {
      womenRank[woman][man] = rank;
    });
  });

  const freeMen = [...men];

  while (freeMen.length > 0) {
    const man = freeMen.shift();
    const manIndex = men.indexOf(man);
    const proposalIndex = nextProposalIndex[man];

    if (proposalIndex >= women.length) continue;

    const woman = menPreferences[manIndex][proposalIndex];
    nextProposalIndex[man] += 1;

    const currentPartner = womanPartner[woman];

    if (currentPartner === null) {
      womanPartner[woman] = man;
      manPartner[man] = woman;
      continue;
    }

    if (womenRank[woman][man] < womenRank[woman][currentPartner]) {
      womanPartner[woman] = man;
      manPartner[man] = woman;
      manPartner[currentPartner] = null;
      freeMen.push(currentPartner);
    } else {
      freeMen.push(man);
    }
  }

  return manPartner;
};

const GaleShapley = () => {
  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.selectAll("*").remove();

    const men = ['1', '2', '3', '4', '5'];
    const women = ['a', 'b', 'c', 'd', 'e'];
    const menPreferences = men.map(() => preferenceList("man"));
    const womenPreferences = women.map(() => preferenceList("woman"));

    const menNodes = men.map((id, i) => ({
      id,
      x: 155,
      y: 12 + i * 44,
      preferences: menPreferences[i],
    }));

    const womenNodes = women.map((id, i) => ({
      id,
      x: 245,
      y: 12 + i * 44,
      preferences: womenPreferences[i],
    }));

    const nodes = menNodes.concat(womenNodes);

    const node = svgElement
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 10)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", "none")
      .attr("stroke", "black");

    svgElement
      .append("g")
      .selectAll("text.node-label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "node-label")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "black")
      .text((d) => d.id);

    svgElement
      .append("g")
      .selectAll("text.preference-label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "preference-label")
      .attr("x", (d) => (d.x < 200 ? 10 : 265))
      .attr("y", (d) => d.y + 5)
      .text((d) => d.preferences.join(" ≻ "));

    const matching = runGaleShapley(
      men,
      women,
      menPreferences,
      womenPreferences,
    );

    const links = men
      .filter((man) => matching[man] !== null)
      .map((man) => ({
        source: nodes.find((n) => n.id === man),
        target: nodes.find((n) => n.id === matching[man]),
      }));

    const link = svgElement
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "black")
      .attr("x1", (d) => d.source.x + 10)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x - 10)
      .attr("y2", (d) => d.target.y);

    node
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);

    return () => {
      link.remove();
    };
  }, []);

  return (
    <svg ref={ref} width="100%" height="100%" viewBox="0 0 400 200" />
  );
};

function App() {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="component gs-algorithm">
      <div className="titleAndButton">
        <div className="title">Gale-Shapley Algorithm</div>
        <div className="resetButton">
          <button onClick={handleReset}>reset</button>
        </div>
      </div>
      <div className="algorithm">
        <GaleShapley key={resetKey} />
      </div>
    </div>
  );
}

export default App;
