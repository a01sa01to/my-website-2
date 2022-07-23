package schema

import (
	covid19_ibaraki "a01sa01to/opendata-api/covid19-ibaraki"
	"encoding/json"

	"github.com/graphql-go/graphql"
)

var RootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"covid19_ibaraki": &graphql.Field{
			Name:        "covid19_ibaraki",
			Type:        covid19_ibaraki.Cov19Type,
			Description: "COVID-19 in Ibaraki pref",
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				j, e := json.Marshal(p.Info.FieldASTs)
				if e != nil {
					return nil, e
				}
				return j, nil
			},
		},
	},
})
