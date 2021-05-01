const fieldsProps = [
  [265, 25, "safehouse", 0, "#F5332BAA"],
  [265, 85, "field", 1],
  [265, 145, "field", 2],
  [265, 205, "field", 3],
  [265, 265, "field", 4],
  [205, 265, "field", 5],
  [145, 265, "field", 6],
  [85, 265, "field", 7],
  [25, 265, "field", 8],
  [25, 325, "field", 9],
  [25, 385, "safehouse", 10, "#F5D547AA"],
  [85, 385, "field", 11],
  [145, 385, "field", 12],
  [205, 385, "field", 13],
  [265, 385, "field", 14],
  [265, 445, "field", 15],
  [265, 505, "field", 16],
  [265, 565, "field", 17],
  [265, 625, "field", 18],
  [325, 625, "field", 19],
  [385, 625, "safehouse", 20, "#37DE53AA"],
  [385, 565, "field", 21],
  [385, 505, "field", 22],
  [385, 445, "field", 23],
  [385, 385, "field", 24],
  [445, 385, "field", 25],
  [505, 385, "field", 26],
  [565, 385, "field", 27],
  [625, 385, "field", 28],
  [625, 325, "field", 29],
  [625, 265, "safehouse", 30, "#54B4F5AA"],
  [565, 265, "field", 31],
  [505, 265, "field", 32],
  [445, 265, "field", 33],
  [385, 265, "field", 34],
  [385, 205, "field", 35],
  [385, 145, "field", 36],
  [385, 85, "field", 37],
  [385, 25, "field", 38],
  [325, 25, "field", 39],
  [325, 85, "finish", 40, "#F5332BAA"],
  [325, 145, "finish", 41, "#F5332BAA"],
  [325, 205, "finish", 42, "#F5332BAA"],
  [325, 265, "finish", 43, "#F5332BAA"],
  [85, 325, "finish", 40, "#F5D547AA"],
  [145, 325, "finish", 41, "#F5D547AA"],
  [205, 325, "finish", 42, "#F5D547AA"],
  [265, 325, "finish", 43, "#F5D547AA"],
  [325, 385, "finish", 40, "#37DE53AA"],
  [325, 445, "finish", 41, "#37DE53AA"],
  [325, 505, "finish", 42, "#37DE53AA"],
  [325, 565, "finish", 43, "#37DE53AA"],
  [385, 325, "finish", 40, "#54B4F5AA"],
  [445, 325, "finish", 41, "#54B4F5AA"],
  [505, 325, "finish", 42, "#54B4F5AA"],
  [565, 325, "finish", 43, "#54B4F5AA"],
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
    this.bg
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
    if (type != "dock" && type != "finish") {
      this.redId = id;
      this.yellowId = (id + 30) % 40
      this.greenId = (id + 20) % 40
      this.blueId = (id + 10) % 40
    }
    if (type == "dock" || type == "finish") {
      switch (color) {
        case "#F5332B":
          this.redId = id
          break
        case "#F5D547":
          this.yellowId = id
          break
        case "#37DE53":
          this.greenId = id
          break
        case "#54B4F5":
          this.blueId = id
          break
      }
    }
    document.getElementById("mainboard").appendChild(this.mainField)
    this.appendToArr()
  }

  appendToArr = function () {
    fieldsArr.push(this)
    this.mainField.setAttribute("idx", fieldsArr.indexOf(this))
  }

  changeColor = function (color, i) {
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
    this.mainField.setAttribute("pawnID", i)
  }

  restoreBg = function () {
    this.mainField.style.backgroundColor = this.bg
  }

  addClic = function () {
    this.mainField.addEventListener("click", startFromDock)
    this.clickable = true
  }

  removeClic = function () {
    this.mainField.removeAttribute("onclick")
  }
}

const fieldsArr = []
const players = [];
let state = false
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
      console.log(res.room.players)
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
      fieldsArr.forEach(field => {
        field.restoreBg()
      })
      if (res.room.gameStatus) {
        mycolor = res.myColor
        console.log(mycolor)
        if (document.getElementById("changeReadyButton")) {
          document.getElementById("changeReadyButton").remove()
        }
        res.room.pawns.red.forEach((pawn, i) => {
          let target = fieldsArr.find(field => field.redId == pawn)
          target.changeColor("red", i)
          if (res.myColor == "red" && target.clickable == false) {
            target.addClic(res.room.pawns.red)
            if (pawn >= 0) {
              allInDock = false
            }
          }
        })
        res.room.pawns.yellow.forEach((pawn, i) => {
          let target = fieldsArr.find(field => field.yellowId == pawn)
          target.changeColor("yellow", i)
          if (res.myColor == "yellow" && target.clickable == false) {
            target.addClic(res.room.pawns.yellow)
            if (pawn >= 0) {
              allInDock = false
            }
          }
        })
        res.room.pawns.green.forEach((pawn, i) => {
          let target = fieldsArr.find(field => field.greenId == pawn)
          target.changeColor("green", i)
          if (res.myColor == "green" && target.clickable == false) {
            target.addClic(res.room.pawns.green)
            if (pawn >= 0) {
              allInDock = false
            }
          }
        })
        res.room.pawns.blue.forEach((pawn, i) => {
          let target = fieldsArr.find(field => field.blueId == pawn)
          target.changeColor("blue", i)
          if (res.myColor == "blue" && target.clickable == false) {
            target.addClic(res.room.pawns.blue)
            if (pawn >= 0) {
              allInDock = false
            }
          }
        })
        if (document.getElementById("currentPlayer").innerText != res.room.whosMove.name) {
          document.getElementById("dice").setAttribute("onclick", "rollTheDice()")
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

fieldsProps.forEach(field => {
  new boardField(field[0], field[1], field[2], field[3], field[4])
})

function rollTheDice() {
  if (canimove) {
    fetch("/rollTheDice", {
      method: "GET"
    }).then(res => res.json()).then(res => {
      document.getElementById("dice").removeAttribute("onclick")
      if (res.num) {
        moveDist = res.num
        document.getElementById("diceValue").src = "./img/dice/dice" + res.num + ".png"
        let voices = [new SpeechSynthesisUtterance("jeden"), new SpeechSynthesisUtterance("dwa"), new SpeechSynthesisUtterance("trzy"), new SpeechSynthesisUtterance("cztery"), new SpeechSynthesisUtterance("pięć"), new SpeechSynthesisUtterance("sześć")]
        speechSynthesis.speak(voices[res.num - 1])
        if (allInDock) {
          if (res.num != 1 && res.num != 6) {
            fetch("/skipround", {
              method: "GET"
            })
          }
        }
      }
    })
  }
}

function startFromDock() {
  if (moveDist == 1 || moveDist == 6) {
    this.removeEventListener("click", startFromDock)
    let target
    switch (mycolor) {
      case "red":
        target = fieldsArr.find(field => field.redId == 0)
        target.changeColor("red")
        break
      case "yellow":
        target = fieldsArr.find(field => field.yellowId == 0)
        target.changeColor("yellow")
        break
      case "green":
        target = fieldsArr.find(field => field.greenId == 0)
        target.changeColor("green")
        break
      case "blue":
        target = fieldsArr.find(field => field.blueId == 0)
        target.changeColor("blue")
        break
    }
    fieldsArr[parseInt(this.getAttribute("idx"))].restoreBg()
    target.mainField.addEventListener("click", movePawn)

    fetch("/updatePawns", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color: mycolor, id: parseInt(this.getAttribute("pawnID")), value: 0 })
    }).then(console.log("Poszło"))
  }
}

function movePawn() {
  this.removeEventListener("click", movePawn)
  let obj = fieldsArr[parseInt(this.getAttribute("idx"))]
  let target
  let v
  switch (mycolor) {
    case "red":
      target = fieldsArr.find(field => field.redId == obj.redId + moveDist)
      v = obj.redId + moveDist
      target.changeColor("red")
      break
    case "yellow":
      target = fieldsArr.find(field => field.yellowId == obj.yellowId + moveDist)
      v = obj.yellowId + moveDist
      target.changeColor("yellow")
      break
    case "green":
      target = fieldsArr.find(field => field.greenId == obj.greenId + moveDist)
      v = obj.greenId + moveDist
      target.changeColor("green")
      break
    case "blue":
      target = fieldsArr.find(field => field.blueId == obj.blueId + moveDist)
      v = obj.blueId + moveDist
      target.changeColor("blue")
      break
  }
  fieldsArr[parseInt(this.getAttribute("idx"))].restoreBg()
  target.mainField.addEventListener("click", movePawn)

  fetch("/updatePawns", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color: mycolor, id: parseInt(this.getAttribute("pawnID")), value: v })
  }).then(console.log("Poszło"))
}