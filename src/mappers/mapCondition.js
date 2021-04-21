const mapCondition = ({ list }) => {
  const [ item1 ] = list;
  const { weather: [weather1] } = item1;
  return weather1
};

module.exports = mapCondition
