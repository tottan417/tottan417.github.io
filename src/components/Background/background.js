import { useState } from 'react'

function App() {
  const [count, setCount] = useState(110)

  return (
    <>
      <div className="component background">
        兵庫県立大学 社会情報科学部
        <div className="card">
          <button onClick={() => setCount((count) => count + 5)}>
            count is {count}
          </button>
          <p>
            '02 兵庫県出身
          </p>
        </div>
      </div>
    </>
  )
}

export default App