import { useState } from 'react'

function App() {
  const [count, setCount] = useState(110)

  return (
    <>
      <div className="component">
        兵庫県立大学 社会情報科学部
        <div className="card">
          <button onClick={() => setCount((count) => count + 5)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App