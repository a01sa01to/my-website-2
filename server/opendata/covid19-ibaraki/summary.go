package covid19ibaraki

import (
	"encoding/json"
	"os"

	"github.com/graphql-go/graphql"
)

var summary_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "summary",
	Fields: graphql.Fields{
		"last_update": lastupdate_field,
		"total": &graphql.Field{
			Name:        "total",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of confirmed cases",
		},
		"care": &graphql.Field{
			Name:        "care",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of cases now caring",
		},
		"hospitalized": &graphql.Field{
			Name:        "hospitalized",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of cases being hospitalized",
		},
		"severe": &graphql.Field{
			Name:        "severe",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of cases with severe symptoms",
		},
		"moderate": &graphql.Field{
			Name:        "moderate",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of cases with moderate symptoms",
		},
		"light": &graphql.Field{
			Name:        "light",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of cases with light symptoms",
		},
		"home": &graphql.Field{
			Name:        "home",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of cases caring at home",
		},
		"hotel": &graphql.Field{
			Name:        "hotel",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of cases caring at hotel",
		},
		"recovered": &graphql.Field{
			Name:        "recovered",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of recovered patients",
		},
		"death": &graphql.Field{
			Name:        "death",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Total number of deaths",
		},
		"other": &graphql.Field{
			Name:        "other",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Other numbers (e.g., those recovering or recuperating outside the prefecture)",
		},
	},
	Description: "Summary of the number of confirmed cases",
})

type summary_raw_t struct {
	Children []summary_raw_t `json:"children"`
	Attr     string          `json:"attr"`
	Value    int             `json:"value"`
}

type summary_t struct {
	LastUpdate   string `json:"last_update"`
	Total        int    `json:"total"`
	Care         int    `json:"care"`
	Hospitalized int    `json:"hospitalized"`
	Severe       int    `json:"severe"`
	Moderate     int    `json:"moderate"`
	Light        int    `json:"light"`
	Home         int    `json:"home"`
	Hotel        int    `json:"hotel"`
	Recovered    int    `json:"recovered"`
	Death        int    `json:"death"`
	Other        int    `json:"other"`
}

var summary_field = &graphql.Field{
	Name: "summary",
	Type: summary_type,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_summary.json"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret summary_t
		var raw summary_raw_t
		err = json.NewDecoder(file).Decode(&raw)
		if err != nil {
			return nil, err
		}

		ret.LastUpdate = getLastUpdate("main_summary")
		ret.Total = raw.Children[0].Value
		ret.Care = raw.Children[0].Children[0].Value
		ret.Severe = raw.Children[0].Children[0].Children[0].Value
		ret.Moderate = raw.Children[0].Children[0].Children[1].Value
		ret.Light = raw.Children[0].Children[0].Children[2].Value
		ret.Home = raw.Children[0].Children[0].Children[3].Value
		ret.Hotel = raw.Children[0].Children[0].Children[4].Value
		ret.Hospitalized = ret.Severe + ret.Moderate + ret.Light
		ret.Recovered = raw.Children[0].Children[1].Value
		ret.Death = raw.Children[0].Children[2].Value
		ret.Other = raw.Children[0].Children[3].Value

		return ret, nil
	},
	Description: "Summary of the status of patients",
}
