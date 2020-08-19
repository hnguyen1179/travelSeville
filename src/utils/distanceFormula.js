const distanceFormula = (fromArray, toArray) => {
  const [x1, y1] = fromArray
  const [x2, y2] = toArray
  return +(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 1000).toFixed(3)
}

export default distanceFormula
