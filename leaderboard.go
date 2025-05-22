package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

const db_file string = "SundaysDatabase.db"

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

func find_players() []*Player {
	players := []*Player{}

	db, err := sql.Open("sqlite3", db_file)
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

func main() {
	players := find_players()
	print(players)
}
