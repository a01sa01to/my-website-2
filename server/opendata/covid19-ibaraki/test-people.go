package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/csv"
	"io"
	"os"
	"strconv"

	"github.com/graphql-go/graphql"
)

var testpeople_dataset = &graphql.Field{
	Name: "testpeople_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "testpeople_dataset",
		Fields: graphql.Fields{
			"date": &graphql.Field{
				Name:        "date",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Date of test",
			},
			"government_code": government_code_field,
			"prefecture":      prefecture_field,
			"city":            city_field,
			"value": &graphql.Field{
				Name:        "value",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of tested people",
			},
		},
		Description: "Dataset of the number of tested people",
	})),
}

var testpeople_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "test_people",
	Fields: graphql.Fields{
		"dataset":     testpeople_dataset,
		"pageinfo":    pagination.Field,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the number of tested people",
})

type testpeople_dataset_t struct {
	Date           string `json:"date"`
	GovernmentCode string `json:"government_code"`
	Prefecture     string `json:"prefecture"`
	City           string `json:"city"`
	Value          int    `json:"value"`
}

var testpeople_field = &graphql.Field{
	Name: "test_people",
	Type: testpeople_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_test_people.csv"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret []testpeople_dataset_t
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

			val, err := strconv.Atoi(record[4])
			if err != nil {
				return nil, err
			}
			ret = append(ret, testpeople_dataset_t{
				Date:           record[0] + ".000+09:00",
				GovernmentCode: record[1],
				Prefecture:     record[2],
				City:           record[3],
				Value:          val,
			})
		}

		res, pag := pagination.Data2Return(ret, p.Args)
		return interface{}(pagination.ReturnData_t[testpeople_dataset_t]{
			Dataset:    res,
			Pageinfo:   pag,
			LastUpdate: getLastUpdate("test_people"),
		}), nil
	},
	Description: "Dataset of the number of tested people",
}
