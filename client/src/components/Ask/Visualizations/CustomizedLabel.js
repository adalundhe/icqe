import React from 'react'

const RADIAN = Math.PI / 180;


const CustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius
  const y = cy  + radius

  return (
    <text x={x} y={y} fill="#34495E" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default CustomizedLabel
