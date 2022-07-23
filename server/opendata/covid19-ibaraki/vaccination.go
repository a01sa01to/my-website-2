package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/json"
	"os"

	"github.com/graphql-go/graphql"
)

var vaccination_dataset = &graphql.Field{
	Name: "vaccination_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "vaccination_dataset",
		Fields: graphql.Fields{
			"date": &graphql.Field{
				Name:        "date",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Date of vaccination",
			},
			"government_code": government_code_field,
			"prefecture":      prefecture_field,
			"city":            city_field,
			"total": &graphql.Field{
				Name:        "total",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Total number of vaccination",
			},
			"first": &graphql.Field{
				Name:        "first",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of first vaccination",
			},
			"second": &graphql.Field{
				Name:        "second",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of second vaccination",
			},
			"third": &graphql.Field{
				Name:        "third",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of third vaccination",
			},
			"fourth": &graphql.Field{
				Name:        "fourth",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of fourth vaccination",
			},
		},
		Description: "Dataset of the number of vaccination",
	})),
}

var vaccination_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "vaccination",
	Fields: graphql.Fields{
		"dataset":     vaccination_dataset,
		"pageinfo":    pagination.Field,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the number of vaccination",
})

type vaccination_dataset_raw_t struct {
	Date     string `json:"date"`
	Count    int    `json:"count"`
	Status_1 int    `json:"status_1"`
	Status_2 int    `json:"status_2"`
	Status_3 int    `json:"status_3"`
	Status_4 int    `json:"status_4"`
}

type vaccination_dataset_t struct {
	Date           string `json:"date"`
	GovernmentCode string `json:"government_code"`
	Prefecture     string `json:"prefecture"`
	City           string `json:"city"`
	Total          int    `json:"total"`
	First          int    `json:"first"`
	Second         int    `json:"second"`
	Third          int    `json:"third"`
	Fourth         int    `json:"fourth"`
}

var vaccination_field = &graphql.Field{
	Name: "vaccination",
	Type: vaccination_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_vaccination.json"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret []vaccination_dataset_t
		var raw []vaccination_dataset_raw_t
		err = json.NewDecoder(file).Decode(&raw)
		if err != nil {
			return nil, err
		}

		for _, v := range raw {
			ret = append(ret, vaccination_dataset_t{
				Date:           v.Date + "T00:00:00.000+09:00",
				GovernmentCode: "080004",
				Prefecture:     "茨城県",
				City:           "",
				Total:          v.Count,
				First:          v.Status_1,
				Second:         v.Status_2,
				Third:          v.Status_3,
				Fourth:         v.Status_4,
			})
		}

		res, pag := pagination.Data2Return(ret, p.Args)
		return interface{}(pagination.ReturnData_t[vaccination_dataset_t]{
			Dataset:    res,
			Pageinfo:   pag,
			LastUpdate: getLastUpdate("lastUpdate"),
		}), nil
	},
	Description: "Dataset of the number of vaccination",
}
