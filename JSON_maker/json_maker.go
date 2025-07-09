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

type Team struct {
	Id        int    `json:"id"`
	Name      string `json:"name"`
	PlayerIds []int  `json:"players_ids"`
}

type Tournament struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Type  string `json:"type"`
	Date  string `json:"date"`
	Teams []int  `json:"teams_ids"`
}

type Placement struct {
	Team_id       int
	Tournament_id int
	MedalType_id  int
}

type DB struct {
	Players      []*PlayerJSON
	Extra_Awards []*Extra_Award
	Teams        []*Team
	Tournaments  []*Tournament
	Placements   []*Placement
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

func new_playerJSON(name string, id int, participation int, gold int, silver int, bronze int, nickname string, extras []*Extra_Award) *PlayerJSON {
	pj := new(PlayerJSON)
	pj.Name = name
	pj.Player_Id = id
	pj.Participation = participation
	pj.Gold = gold
	pj.Silver = silver
	pj.Bronze = bronze
	pj.Extras = extras
	pj.Nickname = nickname
	return pj
}

func new_team(name string, id int) *Team {
	t := new(Team)
	t.Name = name
	t.Id = id
	return t
}

func new_teamJSON(name string, id int, players []int) *Team {
	tj := new(Team)
	tj.Name = name
	tj.Id = id
	tj.PlayerIds = players
	return tj
}

func new_tournament(name string, id int, tournament_type string, date string) *Tournament {
	tr := new(Tournament)
	tr.Name = name
	tr.Id = id
	tr.Type = tournament_type
	tr.Date = date
	return tr
}

func new_tournamentJSON(name string, id int, tournament_type string, date string, teams []int) *Tournament {
	tr := new(Tournament)
	tr.Name = name
	tr.Id = id
	tr.Type = tournament_type
	tr.Date = date
	tr.Teams = teams
	return tr
}

func new_placement(team_id int, tournament_id int, medaltype_id int) *Placement {
	pl := new(Placement)
	pl.Team_id = team_id
	pl.Tournament_id = tournament_id
	pl.MedalType_id = medaltype_id
	return pl
}

func new_DB(extras []*Extra_Award, players []*PlayerJSON, teams []*Team, tournaments []*Tournament, placements []*Placement) *DB {
	db := new(DB)
	db.Extra_Awards = extras
	db.Players = players
	db.Teams = teams
	db.Tournaments = tournaments
	return db
}

// ------- Getting things from db --------------------------------------------

func get_extras(db *sql.DB) []*Extra_Award {

	extras := []*Extra_Award{}

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
	return extras
}

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

func get_tournaments(db *sql.DB) []*Tournament {

	tournaments := []*Tournament{}

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

		tournaments = append(tournaments, new_tournament(name, id, tournament_type, date))
	}

	return tournaments
}

func get_tournament_teams(db *sql.DB, tournament *Tournament) []int {

	tournament_ids := []int{}

	tournament_id_data, err := db.Query("SELECT team_id FROM TournamentTeam WHERE tournament_id=?", tournament.Id)

	if err != nil {
		log.Fatal(err)
	}

	for tournament_id_data.Next() {
		var id int
		tournament_id_data.Scan(&id)
		tournament_ids = append(tournament_ids, id)
	}

	return tournament_ids
}

func get_teams(db *sql.DB) []*Team {

	teams := []*Team{}

	team_data, err := db.Query("SELECT * FROM Team ORDER BY team_id")
	if err != nil {
		log.Fatal(err)
	}

	for team_data.Next() {
		var id int
		var name string

		team_data.Scan(&id, &name)

		teams = append(teams, new_team(name, id))
	}
	return teams
}

func get_teams_players(db *sql.DB, team *Team) []int {

	player_ids := []int{}

	team_data, err := db.Query("SELECT player_id FROM PlayerTeam where team_id=?", team.Id)

	if err != nil {
		log.Fatal(err)
	}

	for team_data.Next() {
		var id int
		team_data.Scan(&id)
		player_ids = append(player_ids, id)
	}

	return player_ids
}

func get_placements(db *sql.DB) []*Placement {

	placements := []*Placement{}

	placement_data, err := db.Query("SELECT * FROM Placement")
	if err != nil {
		log.Fatal(err)
	}

	for placement_data.Next() {
		var tournament_id int
		var team_id int
		var medaltype_id int

		placement_data.Scan(&team_id, &tournament_id, &medaltype_id)

		placements = append(placements, new_placement(tournament_id, team_id, medaltype_id))
	}

	return placements
}

//---------- Gets stuff for players -----------------------------------------------------------------------

func get_gold_count(player *Player, db *sql.DB) int {

	gold := 0

	gold_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Placement WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND (medaltype_id='1' OR medaltype_id='4')", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for gold_medals.Next() {
		gold_medals.Scan(&gold)
	}

	return gold
}

func get_silver_count(player *Player, db *sql.DB) int {

	silver := 0

	silver_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Placement WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND (medaltype_id='2' OR medaltype_id='5')", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	if silver_medals.Next() {
		silver_medals.Scan(&silver)
	}

	return silver
}

func get_bronze_count(player *Player, db *sql.DB) int {

	bronze := 0

	bronze_medals, err := db.Query("SELECT COUNT(tournament_id) FROM Placement WHERE team_id IN (SELECT team_id FROM PlayerTeam WHERE player_id = ?) AND (medaltype_id='3' OR medaltype_id='6')", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	if bronze_medals.Next() {
		bronze_medals.Scan(&bronze)
	}

	return bronze
}

func get_participation(player *Player, db *sql.DB) int {

	participated := 0

	participations, err := db.Query("SELECT COUNT(player_id) FROM PlayerTeam WHERE player_id = ?", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for participations.Next() {
		participations.Scan(&participated)
	}

	return participated
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

func get_player_extras(player *Player, db *sql.DB) []*Extra_Award {

	extras := []*Extra_Award{}

	extra_data, err := db.Query("SELECT name, extra_award_id FROM ExtraAward WHERE extra_award_id IN (SELECT extra_award_id FROM PlayerExtraAward WHERE player_id=?)", player.Player_Id)
	if err != nil {
		log.Fatal(err)
	}

	for extra_data.Next() {
		var name string
		var id int
		extra_data.Scan(&name, &id)
		extras = append(extras, new_extra(id, name))
	}

	return extras
}

//---------- Encodes JSON file -----------------------------------------------------------------------

func encode_json(extra_awards []*Extra_Award) {

	json_data, err := json.MarshalIndent(extra_awards, "", "\t")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", json_data)
}

// --------- Forming player data for JSON file ------------------------------------------

func get_player_stats(players []*Player, db *sql.DB) []*PlayerJSON {

	playersJSON := []*PlayerJSON{}
	participation := 0
	gold := 0
	silver := 0
	bronze := 0
	nickname := ""
	var extras = []*Extra_Award{}

	for _, player := range players {
		participation = get_participation(player, db)
		gold = get_gold_count(player, db)
		silver = get_silver_count(player, db)
		bronze = get_bronze_count(player, db)
		nickname = get_nickname(player, db)
		extras = get_player_extras(player, db)

		playersJSON = append(playersJSON, new_playerJSON(player.Name, player.Player_Id, participation, gold, silver, bronze, nickname, extras))
	}

	return playersJSON
}

// --------- Forming team data for JSON file ------------------------------------------

func get_team_stats(teams []*Team, db *sql.DB) []*Team {

	teamsJSON := []*Team{}

	for _, team := range teams {
		player_ids := get_teams_players(db, team)
		teamsJSON = append(teamsJSON, new_teamJSON(team.Name, team.Id, player_ids))
	}

	return teamsJSON
}

// --------- Forming Database ------------------------------------------

func form_db(db *sql.DB) *DB {

	extras := get_extras(db)

	players := get_players(db)
	playersJSON := get_player_stats(players, db)

	teams := get_teams(db)
	teamsJSON := get_team_stats(teams, db)

	tournaments := get_tournaments(db)
	tournamentsJSON := get_tournament_stats(tournaments, db)

	placements := get_placements(db)

	DB := new_DB(extras, playersJSON, teamsJSON, tournamentsJSON, placements)

	return DB
}

// --------- Forming tournament data for JSON file ------------------------------------------

func get_tournament_stats(tournaments []*Tournament, db *sql.DB) []*Tournament {

	tournamentsJSON := []*Tournament{}

	for _, tournament := range tournaments {
		team_ids := get_tournament_teams(db, tournament)
		tournamentsJSON = append(tournamentsJSON, new_tournamentJSON(tournament.Name, tournament.Id, tournament.Type, tournament.Date, team_ids))
	}

	return tournamentsJSON
}

//---------- Encodes DB to JSON file -----------------------------------------------------------------------

func encode_json_DB(db *DB) {

	json_data, err := json.MarshalIndent(db, "", "\t")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s\n", json_data)
}

//---------- Main, testing functions -----------------------------------------------------------------

func main() {

	db_argument := os.Args[1]

	db, err := sql.Open("sqlite3", db_argument)
	if err != nil {
		fmt.Println(err)
	}

	db_json := form_db(db)
	encode_json_DB(db_json)

	db.Close()
}

//go run JSON_maker/json_maker.go ../Sundays_Clean_DB/SundaysDatabase.db > SundaysData.json
