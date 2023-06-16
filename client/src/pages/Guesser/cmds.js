// #1
let playersArray = [...document.getElementsByClassName("champ_team_table")[0].children[0].children[1].children]

// #2
let playersMap = playersArray.map(player => {
    const playerInfo = [...player.children]
    return {
        name: playerInfo.find(info => info.className === "nome").innerText,
        nationality: playerInfo.find(info => info.className === "naz").innerText,
        age: new Date().getFullYear() - Number(playerInfo.find(info => info.className === "classe").innerText)
    }
})