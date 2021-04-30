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
    this.bg
    if (color) {
      if (type == "dock") {
        this.mainField.style.border = "2px solid " + color
      } else {
        this.mainField.style.backgroundColor = color
        this.bg = color
      }
    } else {
      this.mainField.style.backgroundColor = "#aaaaaa"
      this.bg = "#aaaaaa"
    }
    this.fieldType = type
    if (type == "field") {
      this.redId = id;
      this.yellowId = (id + 10) % 40
      this.greenId = (id + 20) % 40
      this.blueId = (id + 30) % 40
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
  }

  addClic = function (f) {
    this.mainField.setAttribute("onclick", "movePawn()")
  }

  removeClic = function () {
    this.mainField.removeAttribute("onclick")
  }

  // movePawn = function (f) {
  //   // this.mainField.style.backgroundColor = this.bg
  //   // let target
  //   // switch (color) {
  //   //   case "red":
  //   //     target = fieldsArr.find(field => field.redId == field.redId + move)
  //   //     target.changeColor("red")
  //   //     break
  //   //   case "yellow":
  //   //     target = fieldsArr.find(field => field.yellowId == field.yellowId + move)
  //   //     target.changeColor("yellow")
  //   //     break
  //   //   case "green":
  //   //     target = fieldsArr.find(field => field.greenId == field.greenId + move)
  //   //     target.changeColor("green")
  //   //     break
  //   //   case "blue":
  //   //     target = fieldsArr.find(field => field.blueId == field.blueId + move)
  //   //     target.changeColor("blue")
  //   //     break
  //   // }
  //   console.log("klikłeś se")
  //   this.removeClic()
  // }
}

const fieldsArr = []
const players = [];
let state = false

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
          if (res.room.players[i].ready) {
            players[i].changeColor("#37DE53");
          } else {
            players[i].changeColor("#F5332B");
          }
        } else {
          players[i].changePlayerName("Brak gracza");
          players[i].changeColor("#FFFFFF");
        }
      }
      if (res.room.gameStatus) {
        res.room.pawns.red.forEach(pawn => {
          let target = fieldsArr.find(field => field.redId == pawn)
          target.changeColor("red")
          if (res.myColor == "red") {
            target.addClic(res.room.pawns.red)
          }
        })
        res.room.pawns.yellow.forEach(pawn => {
          let target = fieldsArr.find(field => field.yellowId == pawn)
          target.changeColor("yellow")
          if (res.myColor == "yellow") {
            target.addClic(res.room.pawns.yellow)
          }
        })
        res.room.pawns.green.forEach(pawn => {
          let target = fieldsArr.find(field => field.greenId == pawn)
          target.changeColor("green")
          if (res.myColor == "green") {
            target.addClic(res.room.pawns.green)
          }
        })
        res.room.pawns.blue.forEach(pawn => {
          let target = fieldsArr.find(field => field.blueId == pawn)
          target.changeColor("blue")
          if (res.myColor == "blue") {
            target.addClic(res.room.pawns.blue)
          }
        })
        document.getElementById("currentPlayer").innerText = res.room.whosMove.name
        document.getElementById("runningTime").innerText = res.room.moveTime
      }

      // if(res.myColor){
      //   switch(res.myColor){
      //     case "red":
      //       res.room.pawns.red.forEach(pawn => {
      //         let target = fieldsArr.find(field => field.redId == pawn)
      //         target.addClic("red")
      //       })
      //     case "yellow":

      //     case "green":

      //     case "blue":
      //   }
      // }

      canimove = res.isItMyMove
      changeReadyButton(res.ready)
    });
}, 1000);

function changeReadyButton(scheme) {
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
      if (res.num) {
        console.log(res.num)
        moveDist = res.num
      }
    })
  }
}

function movePawn() {
  console.log("click")
}