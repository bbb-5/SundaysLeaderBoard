package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

type Player struct {
	Name      string
	Player_Id int
}

func new_player(name string, id int) *Player {
	p := new(Player)
	p.Name = name
	p.Player_Id = id
	return p
}

//----------- Getting players from DB -----------------------------

func find_players(path string) []*Player {
	players := []*Player{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	player_data, err := db.Query("SELECT player_id, name FROM Player ORDER BY name")
	if err != nil {
		log.Fatal(err)
	}

	for player_data.Next() {
		var id int
		var name string

		player_data.Scan(&id, &name)

		players = append(players, new_player(name, id))
	}

	db.Close()
	return players
}

//------- Finding how many tournaments certain player has attended -------------------------

func find_participation(player *Player, path string) int {

	participated := []int{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	participations, err := db.Query("SELECT COUNT(player_id) FROM PlayerTeam WHERE player_id = ?", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for participations.Next() {
		var amount int
		participations.Scan(&amount)
		participated = append(participated, amount)
	}

	db.Close()
	return participated[0]
}

//-------Getting a player's wins-------------------------

func main() {

	db_argument := os.Args[1]
	fmt.Print(db_argument)

	players := find_players(db_argument)
	print(players)

	participation := find_participation(players[2], db_argument)
	print("\n", players[2].Name, " has participatied ", participation, " times")

}
