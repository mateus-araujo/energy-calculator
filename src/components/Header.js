import React from 'react'

import title from '../images/energy-title.jpeg'
import tomada from '../images/energy-tomada.jpeg'

/* margin: 0;
  background-color: #93C47D;
  height: auto;
  padding: 10px;
  color: white;
  margin-bottom: 40px; */

const Header = () => (
  <div>
    <div style={{ backgroundColor: "#000", height: 80, position: 'absolute', paddingRight: '100%' }}>
      <img src={tomada}
        style={{
          padding: 10,
          height: 80,
          position: 'absolute',
          left: 10
        }}
        alt="tomada"
      />
      <img
        src={title}
        style={{
          padding: 10,
          height: 50,
          position: 'absolute',
          top: 20,
          left: 150
        }}
        alt="title"
      />
    </div>
  </div>
)

export default Header
