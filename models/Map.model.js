const { Schema, model } = require("mongoose")
const rankingSchema = require("./Ranking.model")
const historicBulletsSchema = require("./HistoricBullets.model")

const startValue = 10
const endValue = 11
const wallValue = 0
const floorValue = 1

const mapSchema = new Schema({
  //grid defininig the grid
  cells: {
    type: [[Number]],
  },
  //date the game started
  debut: {
    type: Date,
    default: new Date(),
    require: true,
  },
  // if this Map is the One in current Play
  current: { 
    type: Boolean,
    require: true,
    default: true,
  },
  //in milliseconds
  gameDuration:{
    type:Number,
    default:1000*60*60,
  }, 
  // lapse between two record in milliseconds in historic
  recordRate :{
    type:Number,
    default:100,
  }, 
  ranking:[rankingSchema], // ordered list of the winning players (first index is player one)
  historicBullets:[historicBulletsSchema],// record of all the bullets shot
})

// mapSchema.statics.createMap = function (dimensions = 100, maxTunnels = 200, maxLength = 20) {
  mapSchema.statics.createMap = function (dimensions = 20, maxTunnels = 50, maxLength = 8) {
  const map = createArray(wallValue, dimensions) // create a 2d array full of 0's
  let { x: currentRow, y: currentColumn } = randomPosition(dimensions) // our current row - start at a random spot
  let directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ] // array to get a random direction from (left,right,up,down)
  let lastDirection = [] // save the last direction we went
  let randomDirection // next turn/direction - holds a value from directions

  // lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
  while (maxTunnels && dimensions && maxLength) {
    // lets get a random direction - until it is a perpendicular to our lastDirection
    // if the last direction = left or right,
    // then our new direction has to be up or down,
    // and vice versa
    do {
      randomDirection = directions[Math.floor(Math.random() * directions.length)]
    } while (
      (randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) ||
      (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1])
    )

    var randomLength = Math.ceil(Math.random() * maxLength), //length the next tunnel will be (max of maxLength)
      tunnelLength = 0 //current length of tunnel being created

    // lets loop until our tunnel is long enough or until we hit an edge
    while (tunnelLength < randomLength) {
      //break the loop if it is going out of the map
      if (
        (currentRow === 0 && randomDirection[0] === -1) ||
        (currentColumn === 0 && randomDirection[1] === -1) ||
        (currentRow === dimensions - 1 && randomDirection[0] === 1) ||
        (currentColumn === dimensions - 1 && randomDirection[1] === 1)
      ) {
        break
      } else {
        map[currentRow][currentColumn] = floorValue //set the value of the index in map to 0 (a tunnel, making it one longer)
        currentRow += randomDirection[0] //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
        currentColumn += randomDirection[1]
        tunnelLength++ //the tunnel is now one longer, so lets increment that variable
      }
    }

    if (tunnelLength) {
      // update our variables unless our last loop broke before we made any part of a tunnel
      lastDirection = randomDirection //set lastDirection, so we can remember what way we went
      maxTunnels-- // we created a whole tunnel so lets decrement how many we have left to create
    }
  }
  placeStart(map)
  placeEnd(map)
  return map // all our tunnels have been created and our map is complete, so lets return it to our render()
}

function createArray(num, dimensions) {
  var array = []
  for (var i = 0; i < dimensions; i++) {
    array.push([])
    for (var j = 0; j < dimensions; j++) {
      array[i].push(num)
    }
  }
  return array
}

function randomPosition(dimensions) {
  const x = Math.floor(Math.random() * dimensions)
  const y = Math.floor(Math.random() * dimensions)
  return { x, y }
}

function randomFloorPosition(array) {
  let position
  do {
    position = randomPosition(array.length)
  } while (array[position.y][position.x]===wallValue)
  return position
}

function placeStart(array) {
  const position = randomFloorPosition(array)
  array[position.y][position.x] = startValue
}

function placeEnd(array) {
  const position = randomFloorPosition(array)
  array[position.y][position.x] = endValue
}

const Map = model("Map", mapSchema)

module.exports = Map
