const dark = `

.leaderboard {
    background-color:rgb(32, 31, 31);
}`

const light = `

body {
    background-color:rgb(252, 252, 252);
    color: black;
}

li {
    border: solid thin  rgb(24, 23, 23);
}

.leaderboard {
    background-color:rgb(253, 240, 240);
}

    
.rankbox {
    border: solid thin rgb(24, 23, 23);
    background-color:rgb(253, 249, 249);
}

[type=radio]:checked + img {
    outline: 2px solid rgb(36, 34, 34);
}`

const Style = ({mode}) => {


    return (
        <style>{mode == 1 ? light : dark}</style>
    )
}

export default Style