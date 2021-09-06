const fieldsProps = [
  [265, 25, "safehouse", [0, 30, 20, 10], "#F5332B66"],
  [265, 85, "field", [1, 31, 21, 11]],
  [265, 145, "field", [2, 32, 22, 12]],
  [265, 205, "field", [3, 33, 23, 13]],
  [265, 265, "field", [4, 34, 24, 14]],
  [205, 265, "field", [5, 35, 25, 15]],
  [145, 265, "field", [6, 36, 26, 16]],
  [85, 265, "field", [7, 37, 27, 17]],
  [25, 265, "field", [8, 38, 28, 18]],
  [25, 325, "field", [9, 39, 29, 19]],
  [25, 385, "safehouse", [10, 0, 30, 20], "#F5D54766"],
  [85, 385, "field", [11, 1, 31, 21]],
  [145, 385, "field", [12, 2, 32, 22]],
  [205, 385, "field", [13, 3, 33, 23]],
  [265, 385, "field", [14, 4, 34, 24]],
  [265, 445, "field", [15, 5, 35, 25]],
  [265, 505, "field", [16, 6, 36, 26]],
  [265, 565, "field", [17, 7, 37, 27]],
  [265, 625, "field", [18, 8, 38, 28]],
  [325, 625, "field", [19, 9, 39, 29]],
  [385, 625, "safehouse", [20, 10, 0, 30], "#37DE5366"],
  [385, 565, "field", [21, 11, 1, 31]],
  [385, 505, "field", [22, 12, 2, 32]],
  [385, 445, "field", [23, 13, 3, 33]],
  [385, 385, "field", [24, 14, 4, 34]],
  [445, 385, "field", [25, 15, 5, 35]],
  [505, 385, "field", [26, 16, 6, 36]],
  [565, 385, "field", [27, 17, 7, 37]],
  [625, 385, "field", [28, 18, 8, 38]],
  [625, 325, "field", [29, 19, 9, 39]],
  [625, 265, "safehouse", [30, 20, 10, 0], "#54B4F566"],
  [565, 265, "field", [31, 21, 11, 1]],
  [505, 265, "field", [32, 22, 12, 2]],
  [445, 265, "field", [33, 23, 13, 3]],
  [385, 265, "field", [34, 24, 14, 4]],
  [385, 205, "field", [35, 25, 15, 5]],
  [385, 145, "field", [36, 26, 16, 6]],
  [385, 85, "field", [37, 27, 17, 7]],
  [385, 25, "field", [38, 28, 18, 8]],
  [325, 25, "field", [39, 29, 19, 9]],
  [325, 85, "finish", 40, "#F5332B66"],
  [325, 145, "finish", 41, "#F5332B66"],
  [325, 205, "finish", 42, "#F5332B66"],
  [325, 265, "finish", 43, "#F5332B66"],
  [85, 325, "finish", 40, "#F5D54766"],
  [145, 325, "finish", 41, "#F5D54766"],
  [205, 325, "finish", 42, "#F5D54766"],
  [265, 325, "finish", 43, "#F5D54766"],
  [325, 385, "finish", 40, "#37DE5366"],
  [325, 445, "finish", 41, "#37DE5366"],
  [325, 505, "finish", 42, "#37DE5366"],
  [325, 565, "finish", 43, "#37DE5366"],
  [385, 325, "finish", 40, "#54B4F566"],
  [445, 325, "finish", 41, "#54B4F566"],
  [505, 325, "finish", 42, "#54B4F566"],
  [565, 325, "finish", 43, "#54B4F566"],
  [25, 25, "dock", -1, "#F5332B"],
  [25, 85, "dock", -2, "#F5332B"],
  [85, 25, "dock", -3, "#F5332B"],
  [85, 85, "dock", -4, "#F5332B"],
  [25, 565, "dock", -1, "#F5D547"],
  [25, 625, "dock", -2, "#F5D547"],
  [85, 565, "dock", -3, "#F5D547"],
  [85, 625, "dock", -4, "#F5D547"],
  [565, 565, "dock", -1, "#37DE53"],
  [565, 625, "dock", -2, "#37DE53"],
  [625, 565, "dock", -3, "#37DE53"],
  [625, 625, "dock", -4, "#37DE53"],
  [565, 25, "dock", -1, "#54B4F5"],
  [565, 85, "dock", -2, "#54B4F5"],
  [625, 25, "dock", -3, "#54B4F5"],
  [625, 85, "dock", -4, "#54B4F5"],
]

var canimove = false
var moveDist = 0
var mycolor = ""
var pawnsLayed = false
var allInDock = true

//FIXME: Podziel klasy do osobnych plików

class player {
  constructor(e) {
    this.identity = e;
    this.container = document.createElement("div");
    this.color = "white";
    this.playerName = "Brak gracza";
    this.container.style.border = "2px solid " + this.color;
    this.container.style.color = this.color;
    this.container.innerText = this.playerName;
    this.container.id = "player" + e;
    this.container.setAttribute("class", "player");
    this.generateEl();
  }

  changeColor(c) {
    this.color = c;
    this.container.style.border = "2px solid " + this.color;
    this.container.style.backgroundColor = this.color + "11"
    this.container.style.color = this.color;
  }

  changePlayerName(p) {
    this.playerName = p;
    this.container.innerText = this.playerName;
  }

  updateData() {
    this.container.style.border = "1px solid " + this.color;
    this.container.innerText = this.playerName;
  }

  generateEl() {
    document.getElementById("lobby").appendChild(this.container);
  }
}

class boardField {
  constructor(top, left, type, id, color = "") {
    this.mainField = document.createElement("div")
    this.mainField.style.position = "absolute"
    this.mainField.style.width = "50px"
    this.mainField.style.height = "50px"
    this.mainField.style.top = top + "px"
    this.mainField.style.left = left + "px"
    this.mainField.style.borderRadius = "50%"
    this.mainField.setAttribute("class", "shadow")
    this.clickable = false
    //this.fieldAfterMove = this
    if(typeof(id) == "object"){
      this.redId = id[0]
      this.yellowId = id[1]
      this.greenId = id[2]
      this.blueId = id[3]
    }
    if (color) {
      if (type == "dock") {
        this.mainField.style.border = "2px solid " + color
        this.bg = "transparent"
      } else {
        this.mainField.style.backgroundColor = color
        this.bg = color
      }
    } else {
      this.mainField.style.backgroundColor = "#aaaaaa"
      this.bg = "#aaaaaa"
    }
    this.fieldType = type
    if (type == "dock" || type == "finish") {
      switch (color) {
        case "#F5332B": case "#F5332B66":
          this.redId = id
          break
        case "#F5D547": case "#F5D54766":
          this.yellowId = id
          break
        case "#37DE53": case "#37DE5366":
          this.greenId = id
          break
        case "#54B4F5": case "#54B4F566":
          this.blueId = id
          break
      }
    }
    document.getElementById("mainboard").appendChild(this.mainField)
    this.appendToArr()
  }

  appendToArr = function () {
    fieldsArr.push(this)
    console.log(this)
    this.mainField.setAttribute("idx", fieldsArr.indexOf(this))
  }

  changeColor = function (color) {
    switch (color) {
      case "red":
        this.mainField.style.backgroundColor = "#F5332B"
        break
      case "yellow":
        this.mainField.style.backgroundColor = "#F5D547"
        break
      case "green":
        this.mainField.style.backgroundColor = "#37DE53"
        break
      case "blue":
        this.mainField.style.backgroundColor = "#54B4F5"
        break
    }
    //this.mainField.setAttribute("pawnID", i)
  }

  restoreBg = function () {
    this.mainField.style.backgroundColor = this.bg
  }

  addClic = () => {
    this.mainField.addEventListener("click", movePawn)
    this.mainField.addEventListener("mouseover", this.highlightOtherField)
    this.mainField.addEventListener("mouseout", this.normalizeOtherField)
    this.clickable = true
  }

  removeClic = () => {
    this.mainField.removeEventListener("click", movePawn)
    this.mainField.removeEventListener("mouseover", this.highlightOtherField)
    this.mainField.removeEventListener("mouseout", this.normalizeOtherField)
    this.clickable = false
  }

  highlightField = function (){
    this.normalizeField()
    this.hoverDiv = document.createElement("div")
    this.hoverDiv.style.width = "100%"
    this.hoverDiv.style.height = "100%"
    this.hoverDiv.style.borderRadius = "50%"
    this.hoverDiv.style.backgroundColor = "white"
    this.hoverDiv.style.opacity = 0.3
    this.hoverDiv.style.zIndex = 2
    console.log("append", this.hoverDiv)
    this.mainField.appendChild(this.hoverDiv)
  }

  highlightOtherField = () => {
    if(this.nextField != null){
      console.log("dziala")
      this.nextField.highlightField()
    }
  }

  normalizeField = function(){
    this.mainField.innerHTML = ""
  }

  normalizeOtherField = () => {
    if(this.nextField != null){
      this.nextField.normalizeField()
    }
  }

  set nextField(targetToHighlight){
    this.fieldAfterMove = targetToHighlight
  }

  get nextField(){
    return this.fieldAfterMove
  }
}

const fieldsArr = []
const players = [];
let state = false
const colorIndexes = ['red', 'yellow', 'green', 'blue']
const colors = [
  "#F5332B",
  "#F5D547",
  "#37DE53",
  "#54B4F5"
]

for (let i = 0; i < 4; i++) {
  players[i] = new player(i);
}

setInterval(function () {
  console.log("Leci fetch");
  fetch("/findRoom", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("loadingPlaceholder").setAttribute("style", "display: none;")
      if(res.winner != null){
        console.log(res.winner)
      }
      for (let i = 0; i < 4; i++) {
        if (res.room.players[i] != undefined) {
          players[i].changePlayerName(res.room.players[i].name);
          if (!res.room.gameStatus) {
            if (res.room.players[i].ready) {
              players[i].changeColor("#37DE53");
            } else {
              players[i].changeColor("#F5332B");
            }
          } else {
            players[i].changeColor(colors[i])
          }
        } else {
          players[i].changePlayerName("Brak gracza");
          players[i].changeColor("#FFFFFF");
        }
      }
      
      if (res.room.gameStatus) {
        mycolor = res.myColor
        if (document.getElementById("changeReadyButton")) {
          document.getElementById("changeReadyButton").remove()
        }
        
        updateBoard(res.room)

        if (res.isItMyMove) {
          document.getElementById("dice").setAttribute("onclick", "rollTheDice()")
        } else {
          document.getElementById("dice").removeAttribute("onclick")
        }
        document.getElementById("currentPlayer").innerText = res.room.whosMove.name
        document.getElementById("runningTime").innerText = res.room.moveTime
      }

      canimove = res.isItMyMove
      changeReadyButton(res.ready)
    });
}, 1000);

function changeReadyButton(scheme) {
  if (document.getElementById("changeReadyButton")) {
    let tgbt = document.getElementById("changeReadyButton")
    if (scheme) {
      tgbt.style.border =
        "2px solid #F5332B";
      tgbt.style.color = "#F5332B";
      tgbt.style.backgroundColor = "#F5332B11"
      tgbt.innerText =
        "Nie jestem gotowy";
    } else {
      tgbt.style.border =
        "2px solid #37DE53";
      tgbt.style.color = "#37DE53";
      tgbt.style.backgroundColor = "#37DE5311"
      tgbt.innerText =
        "Jestem gotowy";
    }
  }
}

function changeReadyState() {
  state = !state
  fetch("/changeReadyState", {
    method: "GET",
  }).then(changeReadyButton(state))
}

function quitGame() {
  fetch("/destroySession", {
    method: "GET",
  }).then(console.log("opuściłeś grę")).then(res => location.href = "/game")
}

function skipRound(){
  fetch("/skipround", {
    method: "GET"
  })
}

fieldsProps.forEach(field => {
  new boardField(field[0], field[1], field[2], field[3], field[4])
})

function rollTheDice() {
    fetch("/rollTheDice", {
      method: "GET"
    }).then(res => res.json()).then(res => {
      console.log("back")
      document.getElementById("dice").removeAttribute("onclick")
      console.log(res.movablePawns)
      //if (res.movablePawns && res.num && res.playerID) {
        document.getElementById("diceValue").src = "./img/dice/dice" + res.num + ".png"
        let voices = [new SpeechSynthesisUtterance("jeden"), new SpeechSynthesisUtterance("dwa"), new SpeechSynthesisUtterance("trzy"), new SpeechSynthesisUtterance("cztery"), new SpeechSynthesisUtterance("pięć"), new SpeechSynthesisUtterance("sześć")]
        speechSynthesis.speak(voices[res.num - 1])
        if(res.movablePawns.filter(pawn => pawn == null).length == 4){
          console.log("skip")
          skipRound()
        }else{
          console.log("dodawanie listenerow")
          res.movablePawns.forEach(pawn => {
            let target, targetToHighlight, indexx
            console.log(res.num)
            if(pawn != null){
              switch(colorIndexes[res.playerID]){
                case "red":
                  target = fieldsArr.find(field => field.redId == pawn)
                  if(pawn < 0){
                    targetToHighlight = fieldsArr.find(field => field.redId == 0)
                  } else {
                    targetToHighlight = fieldsArr.find(field => field.redId == pawn + res.num)
                  }
                  break;
                case "yellow":
                  target = fieldsArr.find(field => field.yellowId == pawn)
                  if(pawn < 0){
                    targetToHighlight = fieldsArr.find(field => field.yellowId == 0)
                  }else{
                    targetToHighlight = fieldsArr.find(field => field.yellowId == pawn + res.num)
                  }
                  break;
                case "green":
                  target = fieldsArr.find(field => field.greenId == pawn)
                  if(pawn < 0){
                    targetToHighlight = fieldsArr.find(field => field.greenId == 0)
                  }else{
                    targetToHighlight = fieldsArr.find(field => field.greenId == pawn + res.num)
                  }
                  break;
                case "blue":
                  target = fieldsArr.find(field => field.blueId == pawn)
                  if(pawn < 0){
                    targetToHighlight = fieldsArr.find(field => field.blueId == 0)
                  }else{
                    targetToHighlight = fieldsArr.find(field => field.blueId == pawn + res.num)
                  }
                  break;
              }
              target.nextField = targetToHighlight
              target.addClic()
            }
          })
        }
      //}
    })
}

// function startFromDock() {
//   if (moveDist == 1 || moveDist == 6) {
//     this.removeEventListener("click", startFromDock)
//     let target
//     switch (mycolor) {
//       case "red":
//         target = fieldsArr.find(field => field.redId == 0)
//         target.changeColor("red")
//         break
//       case "yellow":
//         target = fieldsArr.find(field => field.yellowId == 0)
//         target.changeColor("yellow")
//         break
//       case "green":
//         target = fieldsArr.find(field => field.greenId == 0)
//         target.changeColor("green")
//         break
//       case "blue":
//         target = fieldsArr.find(field => field.blueId == 0)
//         target.changeColor("blue")
//         break
//     }
//     fieldsArr[parseInt(this.getAttribute("idx"))].restoreBg()
//     target.mainField.addEventListener("click", movePawn)

//     fetch("/updatePawns", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ color: mycolor, id: parseInt(this.getAttribute("pawnID")), value: 0 })
//     }).then(console.log("Poszło"))
//   }
// }

function movePawn(){
  let tempPawnPos
  fieldsArr.forEach(field => {
    if(field.clickable){
      field.removeClic()
      field.nextField.normalizeField()
    }
    if(field.mainField == this){
      fetch("/getColor", {method: "GET"}).then(res => res.json()).then(res => {
        switch(colorIndexes[res.color]){
          case "red":
            tempPawnPos = field.redId
            break;
          case "yellow":
            tempPawnPos = field.yellowId
            break;
          case "green":
            tempPawnPos = field.greenId
            break;
          case "blue":
            tempPawnPos = field.blueId
            break;
        }
        fetch("/movePawn", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({pawnToMove: tempPawnPos})
        }).then(res => res.json()).then(res => {
          updateBoard(res.room)
          skipRound()
        })
      })
    }
  })
}

function updateBoard(instructions){
  fieldsArr.forEach(field => {
    field.restoreBg()
  })

  instructions.pawns.forEach((group, color) => {
    group.forEach(pawn => {
      let target
      switch(colorIndexes[color]){
        case "red":
          target = fieldsArr.find(field => field.redId == pawn)
          break;
        case "yellow":
          target = fieldsArr.find(field => field.yellowId == pawn)
          break;
        case "green":
          target = fieldsArr.find(field => field.greenId == pawn)
          break;
        case "blue":
          target = fieldsArr.find(field => field.blueId == pawn)
          break;
      }
      target.changeColor(colorIndexes[color])
    })
  })
}