package covid19ibaraki

import (
	"encoding/json"
	"os"
	"strings"

	"github.com/graphql-go/graphql"
)

var coronanext_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "corona_next",
	Fields: graphql.Fields{
		"last_update": &graphql.Field{
			Name:        "last_update",
			Type:        graphql.NewNonNull(graphql.String),
			Description: "Last update date and time",
		},
		"stage": &graphql.Field{
			Name:        "stage",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Current measures Stage (1-4)",
		},
		"move_date": &graphql.Field{
			Name:        "move_date",
			Type:        graphql.NewNonNull(graphql.String),
			Description: "Date of transition to the current measure Stage",
		},
		"severe": &graphql.Field{
			Name:        "severe",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Number of severe care beds in operation",
		},
		"sickbed": &graphql.Field{
			Name:        "sickbed",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Number of sickbeds in operation",
		},
		"care_rate": &graphql.Field{
			Name:              "care_rate",
			Type:              graphql.NewNonNull(graphql.Float),
			Description:       "Percentage of all persons in care who are able to be hospitalized",
			DeprecationReason: "This indicator is not currently used and is not updated. Unexpected data may be returned.",
		},
		"new_patients": &graphql.Field{
			Name:        "new_patients",
			Type:        graphql.NewNonNull(graphql.Float),
			Description: "Average Number of new positives in the last week per day",
		},
		"non_closecontact": &graphql.Field{
			Name:        "non_closecontact",
			Type:        graphql.NewNonNull(graphql.Float),
			Description: "Average Number of new positives who are not close contacts in the last week per day",
		},
		"care": &graphql.Field{
			Name:              "care",
			Type:              graphql.NewNonNull(graphql.Int),
			Description:       "Number of patients in care",
			DeprecationReason: "This indicator is not currently used and is not updated. Unexpected data may be returned.",
		},
		"positive_rate": &graphql.Field{
			Name:              "positive_rate",
			Type:              graphql.NewNonNull(graphql.Float),
			Description:       "Positive rate",
			DeprecationReason: "This indicator is not currently used and is not updated. Unexpected data may be returned.",
		},
		"severe_lastweek": &graphql.Field{
			Name:        "severe_lastweek",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Number of severe care beds in operation as of last week",
		},
		"sickbed_lastweek": &graphql.Field{
			Name:        "sickbed_lastweek",
			Type:        graphql.NewNonNull(graphql.Int),
			Description: "Number of sickbeds in operation as of last week",
		},
		"care_rate_lastweek": &graphql.Field{
			Name:              "care_rate_lastweek",
			Type:              graphql.NewNonNull(graphql.Float),
			Description:       "Percentage of all persons in care who are able to be hospitalized as of last week",
			DeprecationReason: "This indicator is not currently used and is not updated. Unexpected data may be returned.",
		},
		"new_patients_lastweek": &graphql.Field{
			Name:        "new_patients_lastweek",
			Type:        graphql.NewNonNull(graphql.Float),
			Description: "Average Number of new positives in the last week per day as of last week",
		},
		"non_closecontact_lastweek": &graphql.Field{
			Name:        "non_closecontact_lastweek",
			Type:        graphql.NewNonNull(graphql.Float),
			Description: "Average Number of new positives who are not close contacts in the last week per day as of last week",
		},
		"care_lastweek": &graphql.Field{
			Name:              "care_lastweek",
			Type:              graphql.NewNonNull(graphql.Int),
			Description:       "Number of patients in care as of last week",
			DeprecationReason: "This indicator is not currently used and is not updated. Unexpected data may be returned.",
		},
		"positive_rate_lastweek": &graphql.Field{
			Name:              "positive_rate_lastweek",
			Type:              graphql.NewNonNull(graphql.Float),
			Description:       "Positive rate as of last week",
			DeprecationReason: "This indicator is not currently used and is not updated. Unexpected data may be returned.",
		},
	},
	Description: "Indicators for Ibaraki Corona Next (including indicators not currently used)",
})

type coronanext_raw_t struct {
	Stage                   int     `json:"stage"`
	MoveDate                string  `json:"moveDate"`
	Severe                  int     `json:"severe"`
	Sickbed                 int     `json:"sickbed"`
	CareRate                float64 `json:"care_rate"`
	NewPatients             float64 `json:"new_patients"`
	NonClosecontact         float64 `json:"non_closecontact"`
	Care                    int     `json:"care"`
	PositiveRate            float64 `json:"positive_rate"`
	SevereLastweek          int     `json:"severe_lastweek"`
	SickbedLastweek         int     `json:"sickbed_lastweek"`
	CareRateLastweek        float64 `json:"care_rate_lastweek"`
	NewPatientsLastweek     float64 `json:"new_patients_lastweek"`
	NonClosecontactLastweek float64 `json:"non_closecontact_lastweek"`
	CareLastweek            int     `json:"care_lastweek"`
	PositiveRateLastweek    float64 `json:"positive_rate_lastweek"`
}
type coronanext_t struct {
	LastUpdate              string  `json:"last_update"`
	Stage                   int     `json:"stage"`
	MoveDate                string  `json:"move_date"`
	Severe                  int     `json:"severe"`
	Sickbed                 int     `json:"sickbed"`
	CareRate                float64 `json:"care_rate"`
	NewPatients             float64 `json:"new_patients"`
	NonClosecontact         float64 `json:"non_closecontact"`
	Care                    int     `json:"care"`
	PositiveRate            float64 `json:"positive_rate"`
	SevereLastweek          int     `json:"severe_lastweek"`
	SickbedLastweek         int     `json:"sickbed_lastweek"`
	CareRateLastweek        float64 `json:"care_rate_lastweek"`
	NewPatientsLastweek     float64 `json:"new_patients_lastweek"`
	NonClosecontactLastweek float64 `json:"non_closecontact_lastweek"`
	CareLastweek            int     `json:"care_lastweek"`
	PositiveRateLastweek    float64 `json:"positive_rate_lastweek"`
}

var coronanext_field = &graphql.Field{
	Name: "corona_next",
	Type: coronanext_type,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_corona_next.json"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret coronanext_t
		var raw coronanext_raw_t
		err = json.NewDecoder(file).Decode(&raw)
		if err != nil {
			return nil, err
		}

		ret.LastUpdate = getLastUpdate("corona_next")
		ret.Stage = raw.Stage
		ret.MoveDate = strings.ReplaceAll(raw.MoveDate, "/", "-") + "T00:00:00.000+09:00"
		ret.Severe = raw.Severe
		ret.Sickbed = raw.Sickbed
		ret.CareRate = raw.CareRate
		ret.NewPatients = raw.NewPatients
		ret.NonClosecontact = raw.NonClosecontact
		ret.Care = raw.Care
		ret.PositiveRate = raw.PositiveRate
		ret.SevereLastweek = raw.SevereLastweek
		ret.SickbedLastweek = raw.SickbedLastweek
		ret.CareRateLastweek = raw.CareRateLastweek
		ret.NewPatientsLastweek = raw.NewPatientsLastweek
		ret.NonClosecontactLastweek = raw.NonClosecontactLastweek
		ret.CareLastweek = raw.CareLastweek
		ret.PositiveRateLastweek = raw.PositiveRateLastweek

		return interface{}(ret), nil
	},
	Description: "Indicators for Ibaraki Corona Next (including indicators not currently used)",
}
