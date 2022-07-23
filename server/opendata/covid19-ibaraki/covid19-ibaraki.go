package covid19ibaraki

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"

	"github.com/graphql-go/graphql"
)

func getRawDataPath(path string) string {
	return filepath.Join(filepath.ToSlash(os.Args[1]), "opendata", "api", "raw", "covid19_ibaraki", path)
}

func getLastUpdate(key string) string {
	file, err := os.Open(getRawDataPath("last_update.json"))
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var data map[string]string
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&data)
	if err != nil {
		panic(err)
	}
	if data[key] == "" {
		panic("key not found: " + key)
	}
	val := data[key]

	val = strings.ReplaceAll(val, "/", "-")
	val = strings.ReplaceAll(val, " ", "T")
	val += ":00.000+09:00"

	return val
}

var Cov19Type = graphql.NewObject(graphql.ObjectConfig{
	Name: "Covid19_Ibaraki",
	Fields: graphql.Fields{
		"call_center":            callcenter_field,
		"corona_next":            coronanext_field,
		"death_attributes":       deathattr_field,
		"death_number":           deathnum_field,
		"inspections_summary":    inspections_field,
		"mutant_positive_number": mutposnum_field,
		"mutant_test_people":     mutanttest_field,
		"patients":               patients_field,
		"positive_number":        posnum_field,
		"recovered_number":       recovnum_field,
		"summary":                summary_field,
		"test_people":            testpeople_field,
		"vaccination":            vaccination_field,
	},
	Description: "Dataset of COVID-19 in Ibaraki",
})
