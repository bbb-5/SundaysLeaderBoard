package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

type Player struct {
	Name      string
	Player_Id int
}

type PlayerJSON struct {
	Name          string         `json:"name"`
	Player_Id     int            `json:"id"`
	Participation int            `json:"participation"`
	Gold          int            `json:"gold"`
	Silver        int            `json:"silver"`
	Bronze        int            `json:"bronze"`
	Extras        []*Extra_Award `json:"extra_awards"`
	Nickname      string         `json:"nickname"`
}

type Extra_Award struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

// ------- Constructors -------------------------------------------------------

func new_extra(id int, name string) *Extra_Award {
	e := new(Extra_Award)
	e.Id = id
	e.Name = name
	return e
}

func new_player(id int, name string) *Player {
	p := new(Player)
	p.Name = name
	p.Player_Id = id
	return p
}

func new_playerJSON(name string, id int, participation int, gold int, silver int, bronze int) *PlayerJSON {
	pj := new(PlayerJSON)
	pj.Name = name
	pj.Player_Id = id
	pj.Participation = participation
	pj.Gold = gold
	pj.Silver = silver
	pj.Bronze = bronze
	//pj.Extras = extras
	//pj.Nickname = nickname
	return pj
}

//extras []*Extra_Award, nickname string

// ------- Getting things from db --------------------------------------------

func get_extras(path string) []*Extra_Award {

	extras := []*Extra_Award{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	extra_data, err := db.Query("SELECT * FROM ExtraAward ORDER BY extra_award_id")
	if err != nil {
		log.Fatal(err)
	}

	for extra_data.Next() {
		var id int
		var name string

		extra_data.Scan(&id, &name)

		extras = append(extras, new_extra(id, name))
	}

	db.Close()
	return extras
}

func get_players(path string) []*Player {
	players := []*Player{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	player_data, err := db.Query("SELECT player_id, name FROM Player ORDER BY player_id")
	if err != nil {
		log.Fatal(err)
	}

	for player_data.Next() {
		var id int
		var name string

		player_data.Scan(&id, &name)

		players = append(players, new_player(id, name))
	}

	db.Close()
	return players
}

//---------- Gets stuff for players -----------------------------------------------------------------------

func get_gold_count(player *Player, path string) int {

	gold_amount := []int{}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	gold_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Placement WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND (medaltype_id='1' OR medaltype_id='4')", player.Player_Id)
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

	silver_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Placement WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND (medaltype_id='2' OR medaltype_id='5')", player.Player_Id)
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

	silver_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Placement WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND (medaltype_id='3' OR medaltype_id='6')", player.Player_Id)
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

/*
func get_nickname(path string) string {

	nickname := ""

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

}*/

//---------- Encodes JSON file -----------------------------------------------------------------------

func encode_json(extra_awards []*Extra_Award) {

	json_data, err := json.MarshalIndent(extra_awards, "", "\t")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", json_data)
}

// --------- Forming player data for JSON file ------------------------------------------

func get_player_stats(players []*Player, path string) []*PlayerJSON {

	playersJSON := []*PlayerJSON{}
	participation := 0
	gold := 0
	silver := 0
	bronze := 0

	for _, player := range players {
		participation = get_participation(player, path)
		gold = get_gold_count(player, path)
		silver = get_silver_count(player, path)
		bronze = get_bronze_count(player, path)

		playersJSON = append(playersJSON, new_playerJSON(player.Name, player.Player_Id, participation, gold, silver, bronze))
	}

	return playersJSON
}

//---------- Encodes JSON Player file -----------------------------------------------------------------------

func encode_json_player(players []*PlayerJSON) {

	json_data, err := json.MarshalIndent(players, "", "\t")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", json_data)
}

//---------- Main, testing functions -----------------------------------------------------------------

func main() {

	db_argument := os.Args[1]
	fmt.Print(db_argument)

	extras := get_extras(db_argument)

	players := get_players(db_argument)

	encode_json(extras)

	playersJSON := get_player_stats(players, db_argument)
	encode_json_player(playersJSON)

}
