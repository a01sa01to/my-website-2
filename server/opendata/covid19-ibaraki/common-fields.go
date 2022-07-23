package covid19ibaraki

import (
	"github.com/graphql-go/graphql"
)

var government_code_field = &graphql.Field{
	Name:        "government_code",
	Type:        graphql.NewNonNull(graphql.String),
	Description: "Local government code",
}

var prefecture_field = &graphql.Field{
	Name:        "prefecture",
	Type:        graphql.NewNonNull(graphql.String),
	Description: "Prefecture",
}

var city_field = &graphql.Field{
	Name:        "city",
	Type:        graphql.String,
	Description: "City",
}

var lastupdate_field = &graphql.Field{
	Name:        "last_update",
	Type:        graphql.NewNonNull(graphql.String),
	Description: "Last update date and time",
}
