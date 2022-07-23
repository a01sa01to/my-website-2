package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/csv"
	"io"
	"os"
	"strconv"

	"github.com/graphql-go/graphql"
)

var deathattr_dataset = &graphql.Field{
	Name: "deathattr_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "deathattr_dataset",
		Fields: graphql.Fields{
			"no": &graphql.Field{
				Name:        "no",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number",
			},
			"government_code": government_code_field,
			"prefecture":      prefecture_field,
			"city":            city_field,
			"date": &graphql.Field{
				Name:        "date",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Publication date",
			},
			"age": &graphql.Field{
				Name:        "age",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Age",
			},
			"gender": &graphql.Field{
				Name:        "gender",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Gender",
			},
		},
		Description: "Dataset of the dead attributes",
	})),
}

var deathattr_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "death_attributes",
	Fields: graphql.Fields{
		"dataset":     deathattr_dataset,
		"pageinfo":    pagination.Field,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the dead attributes",
})

type deathattr_dataset_t struct {
	No             int    `json:"no"`
	GovernmentCode string `json:"government_code"`
	Prefecture     string `json:"prefecture"`
	City           string `json:"city"`
	Date           string `json:"date"`
	Age            string `json:"age"`
	Gender         string `json:"gender"`
}

var deathattr_field = &graphql.Field{
	Name: "death_attributes",
	Type: deathattr_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_death_attributes.csv"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret []deathattr_dataset_t
		reader := csv.NewReader(file)
		reader.Read()
		for {
			record, err := reader.Read()
			if err == io.EOF {
				break
			}
			if err != nil {
				return nil, err
			}

			no, err := strconv.Atoi(record[0])
			if err != nil {
				return nil, err
			}
			ret = append(ret, deathattr_dataset_t{
				No:             no,
				GovernmentCode: record[1],
				Prefecture:     record[2],
				City:           record[3],
				Date:           record[4] + ".000+09:00",
				Age:            record[5],
				Gender:         record[6],
			})
		}

		res, pag := pagination.Data2Return(ret, p.Args)
		return interface{}(pagination.ReturnData_t[deathattr_dataset_t]{
			Dataset:    res,
			Pageinfo:   pag,
			LastUpdate: getLastUpdate("death_attr"),
		}), nil
	},
	Description: "Dataset of the dead attributes",
}
