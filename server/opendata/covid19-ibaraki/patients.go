package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/csv"
	"io"
	"os"
	"strconv"

	"github.com/graphql-go/graphql"
)

var patients_dataset = &graphql.Field{
	Name: "patients_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "patients_dataset",
		Fields: graphql.Fields{
			"no": &graphql.Field{
				Name:        "no",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number",
			},
			"government_code": government_code_field,
			"prefecture":      prefecture_field,
			"city":            city_field,
			"publish_date": &graphql.Field{
				Name:        "publish_date",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Publish date",
			},
			"onset_date": &graphql.Field{
				Name:        "onset_date",
				Type:        graphql.String,
				Description: "Onset date",
			},
			"address": &graphql.Field{
				Name:        "address",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Address",
			},
			"age": &graphql.Field{
				Name:        "age",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Age group",
			},
			"gender": &graphql.Field{
				Name:        "gender",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Gender",
			},
			"occupation": &graphql.Field{
				Name:        "occupation",
				Type:        graphql.String,
				Description: "Occupation",
			},
			"status": &graphql.Field{
				Name:        "status",
				Type:        graphql.String,
				Description: "Severity of illness at time of publication",
			},
			"symptoms": &graphql.Field{
				Name:        "symptoms",
				Type:        graphql.String,
				Description: "Symptoms of illness at time of publication",
			},
			"travel_abroad_history": &graphql.Field{
				Name:        "travel_abroad_history",
				Type:        graphql.NewNonNull(graphql.Boolean),
				Description: "Whether the patient has traveled abroad recently",
			},
			"close_contact": &graphql.Field{
				Name:        "close_contact",
				Type:        graphql.NewNonNull(graphql.Boolean),
				Description: "Whether the patient has been in close contact with someone with COVID-19",
			},
			"test_method": &graphql.Field{
				Name:        "test_method",
				Type:        graphql.String,
				Description: "Test method",
			},
			"note": &graphql.Field{
				Name:        "note",
				Type:        graphql.String,
				Description: "Note",
			},
		},
		Description: "Dataset of the attribute of patients",
	})),
}

var patients_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "patients",
	Fields: graphql.Fields{
		"dataset":     patients_dataset,
		"pageinfo":    pagination.Field,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the attribute of patients",
})

type patients_dataset_t struct {
	No                  int    `json:"no"`
	GovernmentCode      string `json:"government_code"`
	Prefecture          string `json:"prefecture"`
	City                string `json:"city"`
	PublishDate         string `json:"publish_date"`
	OnsetDate           string `json:"onset_date"`
	Address             string `json:"address"`
	Age                 string `json:"age"`
	Gender              string `json:"gender"`
	Occupation          string `json:"occupation"`
	Status              string `json:"string"`
	Symptoms            string `json:"symptoms"`
	TravelAbroadHistory bool   `json:"travel_abroad_history"`
	CloseContact        bool   `json:"close_contact"`
	TestMethod          string `json:"test_method"`
	Note                string `json:"note"`
}

var patients_field = &graphql.Field{
	Name: "patients",
	Type: patients_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_patients.csv"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret []patients_dataset_t
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

			onset := record[5]
			if onset != "" {
				onset += ".000+09:00"
			}

			ret = append(ret, patients_dataset_t{
				No:                  no,
				GovernmentCode:      record[1],
				Prefecture:          record[2],
				City:                record[3],
				PublishDate:         record[4] + ".000+09:00",
				OnsetDate:           onset,
				Address:             record[6],
				Age:                 record[7],
				Gender:              record[8],
				Occupation:          record[9],
				Status:              record[10],
				Symptoms:            record[11],
				TravelAbroadHistory: record[12] == "1",
				CloseContact:        record[13] == "1",
				TestMethod:          record[14],
				Note:                record[15],
			})
		}

		res, pag := pagination.Data2Return(ret, p.Args)
		return interface{}(pagination.ReturnData_t[patients_dataset_t]{
			Dataset:    res,
			Pageinfo:   pag,
			LastUpdate: getLastUpdate("patients"),
		}), nil
	},
	Description: "Dataset of the attribute of patients",
}
