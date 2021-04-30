function connectToGame() {
    let nick = document.getElementById("nickname").value
    if (nick != "") {
        fetch("/connectToGame", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname: nick })
        }).then(console.log("wyslano")).then(res => location.href = "/game")
    }
}