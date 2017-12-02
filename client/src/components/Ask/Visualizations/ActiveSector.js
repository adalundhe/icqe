import React from 'react'
import {Sector} from 'recharts'

const ActiveSectorMark = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }) => { //eslint-disable-line react/no-multi-comp
  return (
      <g>
          <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius * 1.1}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
          />
      </g>
  );
}

export default ActiveSectorMark
