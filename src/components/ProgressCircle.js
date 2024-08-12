const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill='transparent'
      stroke={strokePct !== circ ? colour : ""}
      strokeWidth='.6rem'
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      className='transition-all duration-300'
    ></circle>
  );
};

const Text = ({ colour, percentage }) => {
  return (
    <text
      x='50%'
      y='52%'
      dominantBaseline='central'
      textAnchor='middle'
      fontSize='56px'
      fill={colour}
      className='font-thunder font-normal'
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const ProgressCircle = ({ percentage, colour, error }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="#25292E" />
        <Circle colour={colour} pct={pct} />
      </g>
      {!error ? 
      <Text percentage={pct} colour={colour} />:
      <text
      x='50%'
      y='56%'
      dominantBaseline='central'
      textAnchor='middle'
      fontSize='120px'
      fill={colour}
      className='font-thunder font-normal'
    >
      X
    </text>    
      }
    </svg>
  );
};

export default ProgressCircle;