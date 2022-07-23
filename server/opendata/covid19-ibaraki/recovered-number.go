package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/csv"
	"io"
	"os"
	"strconv"

	"github.com/graphql-go/graphql"
)

var recovnum_dataset = &graphql.Field{
	Name: "recovnum_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "recovnum_dataset",
		Fields: graphql.Fields{
			"date": &graphql.Field{
				Name:        "date",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Date of Reception",
			},
			"government_code": government_code_field,
			"prefecture":      prefecture_field,
			"city":            city_field,
			"value": &graphql.Field{
				Name:        "value",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of recovered patients",
			},
		},
		Description: "Dataset of the number of recovered patients",
	})),
}

var recovnum_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "recovered_number",
	Fields: graphql.Fields{
		"dataset":     recovnum_dataset,
		"pageinfo":    pagination.Field,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the number of recovered patients",
})

type recovnum_dataset_t struct {
	Date           string `json:"date"`
	GovernmentCode string `json:"government_code"`
	Prefecture     string `json:"prefecture"`
	City           string `json:"city"`
	Value          int    `json:"value"`
}

var recovnum_field = &graphql.Field{
	Name: "recovered_number",
	Type: recovnum_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_recovered_number.csv"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret []recovnum_dataset_t
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
			ret = append(ret, recovnum_dataset_t{
				Date:           record[0] + ".000+09:00",
				GovernmentCode: record[1],
				Prefecture:     record[2],
				City:           record[3],
				Value:          val,
			})
		}

		res, pag := pagination.Data2Return(ret, p.Args)
		return interface{}(pagination.ReturnData_t[recovnum_dataset_t]{
			Dataset:    res,
			Pageinfo:   pag,
			LastUpdate: getLastUpdate("recovered_number"),
		}), nil
	},
	Description: "Dataset of the number of recovered patients",
}
