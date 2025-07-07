package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

/*
type Player struct {
	Name          string `json:"name"`
	Player_Id     int    `json:"id"`
	Participation int    `json:"participation"`
	Gold          int    `json:"gold"`
	Silver        int    `json:"silver"`
	Bronze        int    `json:"bronze"`
	Extras        int    `json:"extra_awards"`
	Nickname      string `json:"nickname"`
}*/

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

//---------- Encodes JSON file -----------------------------------------------------------------------

func encode_json(extra_awards []*Extra_Award) {

	json_data, err := json.MarshalIndent(extra_awards, "", "\t")
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
	fmt.Println(extras)

	encode_json(extras)

}
