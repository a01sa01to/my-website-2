package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/csv"
	"io"
	"os"
	"strconv"

	"github.com/graphql-go/graphql"
)

var mutanttest_dataset = &graphql.Field{
	Name: "mutanttest_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "mutanttest_dataset",
		Fields: graphql.Fields{
			"date_from": &graphql.Field{
				Name:        "date_from",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "The start date of the dataset",
			},
			"date_to": &graphql.Field{
				Name:        "date_to",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "The end date of the dataset",
			},
			"government_code": government_code_field,
			"prefecture":      prefecture_field,
			"city":            city_field,
			"tested": &graphql.Field{
				Name:        "tested",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of tests",
			},
			"positive": &graphql.Field{
				Name:        "positive",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of positive tests",
			},
			"strain_name": &graphql.Field{
				Name:        "strain_name",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Name of the strain",
			},
		},
		Description: "Dataset of the number of tests for mutant strains",
	})),
}

var mutanttest_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "mutant_test_people",
	Fields: graphql.Fields{
		"dataset":     mutanttest_dataset,
		"pageinfo":    pagination.Field,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the number of tests for mutant strains",
})

type mutanttest_dataset_t struct {
	DateFrom       string `json:"date_from"`
	DateTo         string `json:"date_to"`
	GovernmentCode string `json:"government_code"`
	Prefecture     string `json:"prefecture"`
	City           string `json:"city"`
	Tested         int    `json:"tested"`
	Positive       int    `json:"positive"`
	StrainName     string `json:"strain_name"`
}

var mutanttest_field = &graphql.Field{
	Name: "mutant_test_people",
	Type: mutanttest_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath(("080004_ibaraki_covid19_mutant_test_people.csv")))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret []mutanttest_dataset_t
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

			tested, err := strconv.Atoi(record[5])
			if err != nil {
				return nil, err
			}
			positive, err := strconv.Atoi(record[6])
			if err != nil {
				return nil, err
			}
			ret = append(ret, mutanttest_dataset_t{
				DateFrom:       record[0] + ".000+09:00",
				DateTo:         record[1] + ".000+09:00",
				GovernmentCode: record[2],
				Prefecture:     record[3],
				City:           record[4],
				Tested:         tested,
				Positive:       positive,
				StrainName:     record[7],
			})
		}

		res, pag := pagination.Data2Return(ret, p.Args)
		return interface{}(pagination.ReturnData_t[mutanttest_dataset_t]{
			Dataset:    res,
			Pageinfo:   pag,
			LastUpdate: getLastUpdate("mutant_test_people"),
		}), nil
	},
	Description: "Dataset of the number of tests for mutant strains",
}
