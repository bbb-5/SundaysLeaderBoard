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

//----------- Getting players from DB ------------------------------------------------------

func get_players(path string) []*Player {
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

func get_participation(player *Player, path string) int {

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

//----------- Getting the medals a player has won ---------------------------------------------------

func get_medal_count(player *Player, path string) int {

	medal_amount := []int{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	medals, err := db.Query("SELECT COUNT(tournament_id) FROM Wins WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?)", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for medals.Next() {
		var amount int
		medals.Scan(&amount)
		medal_amount = append(medal_amount, amount)
	}

	db.Close()
	return medal_amount[0]
}

func get_gold_count(player *Player, path string) int {

	gold_amount := []int{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	gold_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Wins WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND medal='Gold'", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for gold_medals.Next() {
		var amount int
		gold_medals.Scan(&amount)
		gold_amount = append(gold_amount, amount)
	}

	db.Close()
	return gold_amount[0]
}

func get_silver_count(player *Player, path string) int {

	silver_amount := []int{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	silver_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Wins WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND medal='Silver'", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for silver_medals.Next() {
		var amount int
		silver_medals.Scan(&amount)
		silver_amount = append(silver_amount, amount)
	}

	db.Close()
	return silver_amount[0]
}

func get_bronze_count(player *Player, path string) int {

	bronze_amount := []int{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	silver_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Wins WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND medal='Bronze'", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for silver_medals.Next() {
		var amount int
		silver_medals.Scan(&amount)
		bronze_amount = append(bronze_amount, amount)
	}

	db.Close()
	return bronze_amount[0]
}

//---------- Main, testing functions -----------------------------------------------------------------

func main() {

	db_argument := os.Args[1]
	fmt.Print(db_argument)

	players := get_players(db_argument)
	print(players)

	participation := get_participation(players[2], db_argument)
	print("\n", players[2].Name, " has participatied ", participation, " times")

	medals := get_medal_count(players[2], db_argument)
	print("\n", players[2].Name, " has gotten ", medals, " medals")

	golds := get_gold_count(players[2], db_argument)
	print("\n", players[2].Name, " has gotten ", golds, " gold medals")

	silvers := get_silver_count(players[2], db_argument)
	print("\n", players[2].Name, " has gotten ", silvers, " silver medals")

	bronzes := get_bronze_count(players[2], db_argument)
	print("\n", players[2].Name, " has gotten ", bronzes, " bronze medals")

}
