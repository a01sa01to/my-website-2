package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/json"
	"os"
	"strings"

	"github.com/graphql-go/graphql"
)

var inspections_dataset = &graphql.Field{
	Name: "inspections_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "inspections_dataset",
		Fields: graphql.Fields{
			"label": &graphql.Field{
				Name:        "label",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Name of Conducting Inspection Organization",
			},
			"data": &graphql.Field{
				Name:        "data",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of Inspections",
			},
		},
		Description: "Dataset of the number of inspections",
	})),
}

var inspections_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "inspections_summary",
	Fields: graphql.Fields{
		"data_date": &graphql.Field{
			Name:        "data_date",
			Type:        graphql.NewNonNull(graphql.String),
			Description: "The date of the data",
		},
		"datasets":    inspections_dataset,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the number of inspections whole of the prefecture",
})

type inspections_raw_t struct {
	UpdDate  string `json:"updDate"`
	Datasets []struct {
		Label string `json:"label"`
		Data  int    `json:"data"`
	} `json:"datasets"`
}

type inspections_t struct {
	DataDate string `json:"data_date"`
	Datasets []struct {
		Label string `json:"label"`
		Data  int    `json:"data"`
	} `json:"datasets"`
	LastUpdate string `json:"last_update"`
}

var inspections_field = &graphql.Field{
	Name: "inspections_summary",
	Type: inspections_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_inspections_summary.json"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret inspections_t
		var raw inspections_raw_t
		err = json.NewDecoder(file).Decode(&raw)
		if err != nil {
			return nil, err
		}

		ret.LastUpdate = getLastUpdate("inspections_summary")
		ret.DataDate = strings.ReplaceAll(raw.UpdDate, "/", "-") + "T00:00:00.000+09:00"
		ret.Datasets = raw.Datasets

		return interface{}(ret), nil
	},
	Description: "Dataset of the number of inspections whole of the prefecture",
}
