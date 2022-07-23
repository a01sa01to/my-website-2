package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/graphql-go/graphql"

	"a01sa01to/opendata-api/schema"
)

func main() {
	input, err := ioutil.ReadAll(os.Stdin)
	if err != nil {
		panic(err)
	}

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: schema.RootQuery,
	})
	if err != nil {
		log.Fatalf("failed to create new schema, error: %v", err)
	}

	params := graphql.Params{Schema: schema, RequestString: string(input)}
	r := graphql.Do(params)
	// if len(r.Errors) > 0 {
	// 	log.Fatalf("failed to execute graphql operation, errors: %+v", r.Errors)
	// }
	rJSON, _ := json.Marshal(r)
	fmt.Printf("%s\n", rJSON)
}
