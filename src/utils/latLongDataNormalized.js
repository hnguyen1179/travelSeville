// const latLongDataNormalized = {
//   centro: [37.38904, 5.99485],
//   arenal: [37.38668, 5.99828],
//   santaCruz: [37.38422, 5.99034],
//   macarena: [37.40254, 5.98919],
//   pilatos: [37.38999,  5.9872],
//   catedralSevilla: [37.38582, 5.9931],
//   setas: [37.39332, 5.99181],
//   mariaLuisa: [37.37466,  5.98867],
//   alcazar: [37.38305, 5.99022],
//   museumFineArts: [37.3925, 6.00002],
//   plazaEspana: [37.37719, 5.98689]
// };

// let maxX = -Infinity;
// let minX = Infinity;
// let maxY = -Infinity;
// let minY = Infinity;


// Object.keys(latLongDataNormalized).forEach(key => {
//   const x = latLongDataNormalized[key][0]
//   const y = latLongDataNormalized[key][1]
  
//   if (x > maxX) {
//     maxX = x;
//   }

//   if (x < minX) {
//     minX = x;
//   }

//   if (y > maxY) {
//     maxY = y;
//   }

//   if (y < minY) {
//     minY = y; 
//   }
// })

// console.log("max X: " + maxX)
// console.log("max Y: " + maxY)
// console.log("min X: " + minX)
// console.log("min Y: " + minY)

// const rangeX = maxX - minX;
// const rangeY = maxY - minY;

// Object.keys(latLongDataNormalized).forEach(key => {
//   const x = latLongDataNormalized[key][0]
//   const y = latLongDataNormalized[key][1]

//   latLongDataNormalized[key][0] = +(((maxX - x) / rangeX) * 100).toFixed(2)
//   latLongDataNormalized[key][1] = +(((maxY - y) / rangeY) * 100).toFixed(2)
// })

// console.log(latLongDataNormalized)


const normalizedLatLongData = {
  centro: [ 51.58, 60.62 ],
  arenal: [ 43.11, 86.75 ],
  santaCruz: [ 34.29, 26.28 ],
  macarena: [ 100, 17.52 ],
  pilatos: [ 54.99, 2.36 ],
  catedralSevilla: [ 40.03, 47.3 ],
  setas: [ 66.93, 37.47 ],
  mariaLuisa: [ 0, 13.56 ],
  alcazar: [ 30.09, 25.36 ],
  museumFineArts: [ 63.99, 100 ],
  plazaEspana: [ 9.07, 0 ]
}

export default normalizedLatLongData;