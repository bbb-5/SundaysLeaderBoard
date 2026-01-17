package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

// CORRECT ONE

type Player struct {
	Name       string             `json:"name"`
	Player_Id  int                `json:"id"`
	Extras     []*Extra_AwardJSON `json:"extra_awards"`
	Cards      []*Card            `json:"cards"`
	Nickname   string             `json:"nickname"`
	Placements []*Placement       `json:"placements"`
}

type Extra_AwardJSON struct {
	Id         int    `json:"id"`
	Name       string `json:"name"`
	Tournament string `json:"tournament_name"`
	Filter     string `json:"location"`
	Date       string `json:"tournament_date"`
}

type Tournament struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
	Date string `json:"date"`
	Team string `json:"team_name"`
}

type TournamentJSON_ONLY struct {
	Id           int    `json:"id"`
	Name         string `json:"name"`
	Type         string `json:"type"`
	Date         string `json:"date"`
	Participants []int  `json:"participants"`
}

type Placement struct {
	MedalType       *MedalType `json:"medaltype"`
	Player_teamname string     `json:"team_name"`
	Tournament      int        `json:"tournament_id"`
}

type MedalType struct {
	Location string `json:"location"`
	Medal    string `json:"medal"`
}

type Card struct {
	Id     int    `json:"id"`
	Reason string `json:"reason"`
}

type JSON_DB struct {
	Players     []*Player
	Tournaments []*TournamentJSON_ONLY
}

//----------- Constructors-----------------------------------------------------------------------------

func new_player(id int, name string) *Player {
	p := new(Player)
	p.Name = name
	p.Player_Id = id
	return p
}

func new_playerJSON(name string, id int, nickname string, extras []*Extra_AwardJSON, placements []*Placement, cards []*Card) *Player {
	p := new(Player)
	p.Name = name
	p.Player_Id = id
	p.Extras = extras
	p.Cards = cards
	p.Nickname = nickname
	p.Placements = placements
	return p
}

func new_extraJSON(id int, name string, tournament string, filter string, date string) *Extra_AwardJSON {
	ej := new(Extra_AwardJSON)
	ej.Id = id
	ej.Name = name
	ej.Tournament = tournament
	ej.Filter = filter
	ej.Date = date
	return ej
}

func new_tournamentJSON_ONLY(name string, id int, tournament_type string, date string, participants []int) *TournamentJSON_ONLY {
	tr := new(TournamentJSON_ONLY)
	tr.Name = name
	tr.Id = id
	tr.Type = tournament_type
	tr.Date = date
	tr.Participants = participants
	return tr
}

func new_placement(medal *MedalType, tournament_id int, team_name string) *Placement {
	pl := new(Placement)
	pl.MedalType = medal
	pl.Tournament = tournament_id
	pl.Player_teamname = team_name
	return pl
}

func new_medaltype(medal string, location string) *MedalType {
	m := new(MedalType)
	m.Medal = medal
	m.Location = location
	return m
}

func new_card(id int, reason string) *Card {
	m := new(Card)
	m.Id = id
	m.Reason = reason
	return m
}

func new_JSON_DB(players []*Player, tournaments []*TournamentJSON_ONLY) *JSON_DB {
	db := new(JSON_DB)
	db.Players = players
	db.Tournaments = tournaments
	return db
}

//-----------Getting data from db -----------------------------------------------------------------------

func get_players(db *sql.DB) []*Player {

	players := []*Player{}

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
	return players
}

func get_nickname(player *Player, db *sql.DB) string {

	nickname := "Hidden"

	nickname_data, err := db.Query("SELECT name FROM Nickname WHERE player_id=?", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	if nickname_data.Next() {
		nickname_data.Scan(&nickname)
	}

	return nickname
}

func get_player_cards(player *Player, db *sql.DB) []*Card {

	cards := []*Card{}

	card_data, err := db.Query("SELECT cardtype_id, reason FROM PlayerCard WHERE player_id=?;", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	if card_data.Next() {
		var id int
		var reason string

		card_data.Scan(&id, &reason)
		cards = append(cards, new_card(id, reason))
	}

	return cards
}

func get_player_extras(player *Player, db *sql.DB) []*Extra_AwardJSON {

	extras := []*Extra_AwardJSON{}

	extra_data, err := db.Query("SELECT * FROM ExtraAward WHERE extra_award_id IN (SELECT extra_award_id FROM PlayerExtraAward WHERE player_id=?)", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for extra_data.Next() {
		var id int
		var tournament_id int
		var name string
		var tournament_info []string

		extra_data.Scan(&id, &tournament_id, &name)
		tournament_info = get_tournament_info(db, tournament_id)

		extras = append(extras, new_extraJSON(id, name, tournament_info[0], tournament_info[1], tournament_info[2]))
	}

	return extras
}

func get_tournament_info(db *sql.DB, tournament_id int) []string {

	info := []string{}

	tournament_data, err := db.Query("SELECT name,type,date FROM Tournament WHERE tournament_id=?", tournament_id)
	if err != nil {
		log.Fatal(err)
	}

	for tournament_data.Next() {
		var name string
		var tournament_type string
		var date string

		tournament_data.Scan(&name, &tournament_type, &date)

		info = append(info, name)
		info = append(info, tournament_type)
		info = append(info, date)
	}

	return info
}

func get_medaltype(db *sql.DB, medal_id int) *MedalType {

	medaltype := []*MedalType{}

	medal_data, err := db.Query("SELECT name, location FROM MedalType WHERE medaltype_id=?", medal_id)

	if err != nil {
		log.Fatal(err)
	}

	for medal_data.Next() {
		var color string
		var location string
		medal_data.Scan(&color, &location)
		medaltype = append(medaltype, new_medaltype(color, location))
	}

	return medaltype[0]
}

func get_team_name(db *sql.DB, player_id int, tournament_id int) string {

	names := []string{}

	name_data, err := db.Query(`SELECT name FROM Team t
INNER JOIN PlayerTeam pt ON pt.team_id = t.team_id
INNER JOIN TournamentTeam tt ON tt.team_id = pt.team_id
AND pt.player_id=? AND tt.tournament_id=?`, player_id, tournament_id)
	if err != nil {
		log.Fatal(err)
	}

	for name_data.Next() {
		var name string
		name_data.Scan(&name)
		names = append(names, name)
	}

	return names[0]
}

func get_player_placements(db *sql.DB, player_id int) []*Placement {

	player_placements := []*Placement{}

	placement_data, err := db.Query("select tournament_id, medaltype_id from placement where team_id in (select team_id from PlayerTeam where player_id=?)", player_id)
	if err != nil {
		log.Fatal(err)
	}

	for placement_data.Next() {
		var tournament_id int
		var medaltype_id int

		placement_data.Scan(&tournament_id, &medaltype_id)
		team_name := get_team_name(db, player_id, tournament_id)
		medal_name := get_medaltype(db, medaltype_id)
		player_placements = append(player_placements, new_placement(medal_name, tournament_id, team_name))
	}
	return player_placements
}

func get_tournament_participants(db *sql.DB, tournament_id int) []int {

	participants := []int{}

	participant_data, err := db.Query("SELECT player_id FROM PlayerTeam INNER JOIN TournamentTeam ON PlayerTeam.team_id = TournamentTeam.team_id WHERE tournament_id=?", tournament_id)

	if err != nil {
		log.Fatal(err)
	}

	for participant_data.Next() {
		var player_id int
		participant_data.Scan(&player_id)
		participants = append(participants, player_id)
	}
	print(participants)
	return participants
}

//---------- Getting and encoding tournaments --------------------------------------------------------------

func get_tournaments(db *sql.DB) []*TournamentJSON_ONLY {

	tournaments := []*TournamentJSON_ONLY{}

	tournament_data, err := db.Query("SELECT * FROM Tournament")
	if err != nil {
		log.Fatal(err)
	}

	for tournament_data.Next() {
		var id int
		var name string
		var tournament_type string
		var date string

		tournament_data.Scan(&id, &tournament_type, &name, &date)
		participants := get_tournament_participants(db, id)
		tournaments = append(tournaments, new_tournamentJSON_ONLY(name, id, tournament_type, date, participants))
	}

	return tournaments
}

//----------- Format player stats --------------------------------------------------------------------

func get_player_stats(players []*Player, db *sql.DB) []*Player {

	playersJSON := []*Player{}
	nickname := ""
	var extras = []*Extra_AwardJSON{}
	var cards = []*Card{}
	var placements = []*Placement{}

	for _, player := range players {
		nickname = get_nickname(player, db)
		extras = get_player_extras(player, db)
		cards = get_player_cards(player, db)
		placements = get_player_placements(db, player.Player_Id)

		playersJSON = append(playersJSON, new_playerJSON(player.Name, player.Player_Id, nickname, extras, placements, cards))
	}

	return playersJSON

}

func form_json(db *sql.DB) *JSON_DB {
	players := get_players(db)
	playersJSON := get_player_stats(players, db)
	tournaments := get_tournaments(db)

	json_db := new_JSON_DB(playersJSON, tournaments)
	return json_db
}

//---------- Encodes DB to JSON file -----------------------------------------------------------------------

func encode_json(db *JSON_DB) {

	json_data, err := json.MarshalIndent(db, "", "    ")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", json_data)
}

//----------- Main, testing functions -----------------------------------------------------------------

func main() {

	db_argument := os.Args[1]

	db, err := sql.Open("sqlite3", db_argument)
	if err != nil {
		fmt.Println(err)
	}

	db_json := form_json(db)
	encode_json(db_json)

	db.Close()
}

//go run leaderboard.go ../Sundays_Clean_DB/SundaysDatabase.db > PlayerData.json
//go run leaderboard.go ../../Sundays_Clean_DB/SundaysDatabase.db > test2.json
