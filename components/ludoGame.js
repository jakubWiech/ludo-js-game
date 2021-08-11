module.exports.mainGame = class mainGame{
    constructor(){
        this.pawnsPosition = {
            red: [-1, -2, -3, -4],
            yellow: [-1, -2, -3, -4],
            green: [-1, -2, -3, -4],
            blue: [-1, -2, -3, -4]
        }

        this.colorIndexes = ['red', 'yellow', 'green', 'blue']

        console.log(this.getPawnsArray())
    }

    getPawnsArray(){
        let pawnsArr = []
        for(const prop in this.pawnsPosition){
            pawnsArr.push(this.pawnsPosition[prop])
        }
        return pawnsArr
    }

    checkWin(){
        let pawnsArr = this.getPawnsArray()
        let winner = null
        function compare(a, b){
            return a-b
        }
        pawnsArr.forEach((color, n) => {
            color.sort(compare)
            if(JSON.stringify(color) == JSON.stringify([40, 41, 42, 43])){
                winner = n
            }
        })
        return winner
    }

    returnPawnToDock(color, pawn){
        let id = this.getPawnIndex(color, pawn)
        switch(color){
            case "red":
                this.pawnsPosition.red[id] = id-4
                break;
            case "yellow":
                this.pawnsPosition.yellow[id] = id-4
                break
            case "green":
                this.pawnsPosition.green[id] = id-4
                break;
            case "blue":
                this.pawnsPosition.blue[id] = id-4
                break;
        }
    }

    updatePawns(color, pawn, number){
        let id = this.getPawnIndex(color, pawn)
        console.log(this.pawnsPosition)
        if(pawn < 0){
            switch(color){
                case "red":
                    this.pawnsPosition.red[id] = 0
                    break;
                case "yellow":
                    this.pawnsPosition.yellow[id] = 0
                    break
                case "green":
                    this.pawnsPosition.green[id] = 0
                    break;
                case "blue":
                    this.pawnsPosition.blue[id] = 0
                    break;
            }
        }else{
            switch(color){
                case "red":
                    this.pawnsPosition.red[id] += number
                    this.pawnsPosition.yellow.forEach(p => {
                        if((p<30 && p%10 != 0 && p+10 == this.pawnsPosition.red[id]) || (p>30 && p%10 != 0 && p-30 == this.pawnsPosition.red[id])){
                            this.returnPawnToDock("yellow", p)
                        }
                    })
                    this.pawnsPosition.green.forEach(p => {
                        if((p<20 && p%10 != 0 && p+20 == this.pawnsPosition.red[id]) || (p>20 && p%10 != 0 && p-20 == this.pawnsPosition.red[id])){
                            this.returnPawnToDock("green", p)
                        }
                    })
                    this.pawnsPosition.blue.forEach(p => {
                        if((p<10 && p%10 != 0 && p+30 == this.pawnsPosition.red[id]) || (p>10 && p%10 != 0 && p-10 == this.pawnsPosition.red[id])){
                            this.returnPawnToDock("blue", p)
                        }
                    })
                    break;
                case "yellow":
                    this.pawnsPosition.yellow[id] += number
                    this.pawnsPosition.red.forEach(p => {
                        if((p>10 && p%10 != 0 && p-10 == this.pawnsPosition.yellow[id]) || (p<10 && p%10 != 0 && p+30 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("red", p)
                        }
                    })
                    this.pawnsPosition.green.forEach(p => {
                        if((p<30 && p%10 != 0 && p+10 == this.pawnsPosition.yellow[id]) || (p>30 && p%10 != 0 && p-30 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("green", p)
                        }
                    })
                    this.pawnsPosition.blue.forEach(p => {
                        if((p<20 && p%10 != 0 && p+20 == this.pawnsPosition.yellow[id]) || (p>20 && p%10 != 0 && p-20 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("blue", p)
                        }
                    })
                    break
                case "green":
                    this.pawnsPosition.green[id] += number
                    this.pawnsPosition.yellow.forEach(p => {
                        if((p>10 && p%10 != 0 && p-10 == this.pawnsPosition.green[id]) || (p<10 && p%10 != 0 && p+30 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("yellow", p)
                        }
                    })
                    this.pawnsPosition.red.forEach(p => {
                        if((p<20 && p%10 != 0 && p+20 == this.pawnsPosition.green[id]) || (p>20 && p%10 != 0 && p-20 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("red", p)
                        }
                    })
                    this.pawnsPosition.blue.forEach(p => {
                        if((p<30 && p%10 != 0 && p+10 == this.pawnsPosition.green[id]) || (p>30 && p%10 != 0 && p-30 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("blue", p)
                        }
                    })
                    break;
                case "blue":
                    this.pawnsPosition.blue[id] += number
                    this.pawnsPosition.yellow.forEach(p => {
                        if((p<20 && p%10 != 0 && p+20 == this.pawnsPosition.blue[id]) || (p>20 && p%10 != 0 && p-20 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("yellow", p)
                        }
                    })
                    this.pawnsPosition.green.forEach(p => {
                        if((p>10 && p%10 != 0 && p-10 == this.pawnsPosition.blue[id]) || (p<10 && p%10 != 0 && p+30 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("green", p)
                        }
                    })
                    this.pawnsPosition.red.forEach(p => {
                        if((p<30 && p%10 != 0 && p+10 == this.pawnsPosition.blue[id]) || (p>30 && p%10 != 0 && p-30 == this.pawnsPosition.yellow[id])){
                            this.returnPawnToDock("red", p)
                        }
                    })
                    break;
            }
            console.log(this.pawnsPosition)
        }
    }

    outputMovablePawns(id, number){
        let pawnsToCheck = []
        let outputPawns = []
        switch(this.colorIndexes[id]){
            case "red":
                pawnsToCheck = this.pawnsPosition.red
                break;
            case "yellow":
                pawnsToCheck = this.pawnsPosition.yellow
                break
            case "green":
                pawnsToCheck = this.pawnsPosition.green
                break;
            case "blue":
                pawnsToCheck = this.pawnsPosition.blue
                break;
        }

        console.log(pawnsToCheck)
        console.log(number)

        pawnsToCheck.forEach(pawn => {
            if(pawn < 0){
                if(number == 1 || number == 6){
                    outputPawns.push(pawn)
                }else{
                    outputPawns.push(null)
                }
            }else{
                if(pawn + number < 44){
                    outputPawns.push(pawn)
                }else{
                    outputPawns.push(null)
                }
            }
        })

        return outputPawns
    }

    getPawnIndex(color, pawn){
        let id
        switch(color){
            case "red":
                this.pawnsPosition.red.forEach((p, n) => {
                    if(p == pawn){
                        id = n
                    }
                })
                break;
            case "yellow":
                this.pawnsPosition.yellow.forEach((p, n) => {
                    if(p == pawn){
                        id = n
                    }
                })
                break
            case "green":
                this.pawnsPosition.green.forEach((p, n) => {
                    if(p == pawn){
                        id = n
                    }
                })
                break;
            case "blue":
                this.pawnsPosition.blue.forEach((p, n) => {
                    if(p == pawn){
                        id = n
                    }
                })
                break;
        }
        return id
    }
}