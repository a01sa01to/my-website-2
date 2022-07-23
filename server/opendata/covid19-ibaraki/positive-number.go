package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/csv"
	"io"
	"os"
	"strconv"

	"github.com/graphql-go/graphql"
)

var posnum_dataset = &graphql.Field{
	Name: "posnum_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "posnum_dataset",
		Fields: graphql.Fields{
			"date": &graphql.Field{
				Name:        "date",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Date of the publication",
			},
			"government_code": government_code_field,
			"prefecture":      prefecture_field,
			"city":            city_field,
			"positive": &graphql.Field{
				Name:        "positive",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of positive cases",
			},
			"close_contact": &graphql.Field{
				Name:        "close_contact",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of close contact cases",
			},
		},
		Description: "Dataset of the number of positive cases",
	})),
}

var posnum_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "positive_number",
	Fields: graphql.Fields{
		"dataset":     posnum_dataset,
		"pageinfo":    pagination.Field,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the number of positive cases",
})

type posnum_dataset_t struct {
	Date           string `json:"date"`
	GovernmentCode string `json:"government_code"`
	Prefecture     string `json:"prefecture"`
	City           string `json:"city"`
	Positive       int    `json:"positive"`
	CloseContact   int    `json:"close_contact"`
}

var posnum_field = &graphql.Field{
	Name: "positive_number",
	Type: posnum_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_positive_number.csv"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret []posnum_dataset_t
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

			pos, err := strconv.Atoi(record[4])
			if err != nil {
				return nil, err
			}
			closecont, err := strconv.Atoi(record[5])
			if err != nil {
				return nil, err
			}
			ret = append(ret, posnum_dataset_t{
				Date:           record[0] + ".000+09:00",
				GovernmentCode: record[1],
				Prefecture:     record[2],
				City:           record[3],
				Positive:       pos,
				CloseContact:   closecont,
			})
		}

		res, pag := pagination.Data2Return(ret, p.Args)
		return interface{}(pagination.ReturnData_t[posnum_dataset_t]{
			Dataset:    res,
			Pageinfo:   pag,
			LastUpdate: getLastUpdate("positive_number"),
		}), nil
	},
	Description: "Dataset of the number of positive cases",
}
