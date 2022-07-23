package pagination

import (
	"encoding/base64"
	"encoding/json"

	"github.com/graphql-go/graphql"
)

var PaginationType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Pagination",
	Fields: graphql.Fields{
		"hasNextPage": &graphql.Field{
			Name:        "hasNextPage",
			Type:        graphql.NewNonNull(graphql.Boolean),
			Description: "Whether there is a next page",
		},
		"hasPreviousPage": &graphql.Field{
			Name:        "hasPreviousPage",
			Type:        graphql.NewNonNull(graphql.Boolean),
			Description: "Whether there is a previous page",
		},
		"startCursor": &graphql.Field{
			Name:        "startCursor",
			Type:        graphql.NewNonNull(graphql.String),
			Description: "The cursor to use in the next page",
		},
		"endCursor": &graphql.Field{
			Name:        "endCursor",
			Type:        graphql.NewNonNull(graphql.String),
			Description: "The cursor to use in the previous page",
		},
	},
})

var Arguments = graphql.FieldConfigArgument{
	"first": &graphql.ArgumentConfig{
		Type:        graphql.Int,
		Description: "The number of items to return from the start of the list",
	},
	"last": &graphql.ArgumentConfig{
		Type:        graphql.Int,
		Description: "The number of items to return from the end of the list",
	},
	"before": &graphql.ArgumentConfig{
		Type:        graphql.String,
		Description: "The cursor to use in the previous page",
	},
	"after": &graphql.ArgumentConfig{
		Type:        graphql.String,
		Description: "The cursor to use in the next page",
	},
}

var Field = &graphql.Field{
	Name:        "pageinfo",
	Type:        PaginationType,
	Description: "Pagination information",
}

type Pageinfo_t struct {
	HasNextPage     bool   `json:"hasNextPage"`
	HasPreviousPage bool   `json:"hasPreviousPage"`
	StartCursor     string `json:"startCursor"`
	EndCursor       string `json:"endCursor"`
}

type ReturnData_t[T interface{}] struct {
	Dataset    []T        `json:"dataset"`
	Pageinfo   Pageinfo_t `json:"pageinfo"`
	LastUpdate string     `json:"last_update"`
}

func GenerateCursor[T comparable](obj T) string {
	d, e := json.Marshal(obj)
	if e != nil {
		panic(e)
	}
	return base64.StdEncoding.EncodeToString(d)
}

func RestoreCursor[T comparable](cursor string) T {
	d, e := base64.StdEncoding.DecodeString(cursor)
	if e != nil {
		panic(e)
	}
	var obj T
	e = json.Unmarshal(d, &obj)
	if e != nil {
		panic(e)
	}
	return obj
}

func ApplyCursor[T comparable](obj []T, before string, after string) ([]T, bool, bool) {
	newobj := obj
	hasnext, hasprev := false, false
	if after != "" {
		aftData := RestoreCursor[T](after)
		aftIdx := -1
		for i, v := range newobj {
			if v == aftData {
				aftIdx = i
				break
			}
		}
		if aftIdx != -1 {
			hasprev = true
			newobj = newobj[aftIdx+1:]
		}
	}
	if before != "" {
		befData := RestoreCursor[T](before)
		befIdx := -1
		for i, v := range newobj {
			if v == befData {
				befIdx = i
				break
			}
		}
		if befIdx != -1 {
			hasnext = true
			newobj = newobj[:befIdx]
		}
	}
	return newobj, hasnext, hasprev
}

func Data2Return[T comparable](obj []T, args map[string]any) ([]T, Pageinfo_t) {
	first := 0
	last := 0
	before := ""
	after := ""
	if args["first"] != nil {
		first = args["first"].(int)
	}
	if args["last"] != nil {
		last = args["last"].(int)
	}
	if args["before"] != nil {
		before = args["before"].(string)
	}
	if args["after"] != nil {
		after = args["after"].(string)
	}

	var ret []T
	var pageinfo Pageinfo_t
	ret, pageinfo.HasNextPage, pageinfo.HasPreviousPage = ApplyCursor(obj, before, after)
	if first != 0 {
		if first < 0 {
			panic("first must be greater than 0")
		}
		if len(ret) < first {
			// do nothing
		} else {
			ret = ret[:first]
			pageinfo.HasNextPage = true
		}
	}
	if last != 0 {
		if last < 0 {
			panic("last must be greater than 0")
		}
		if len(ret) < last {
			// do nothing
		} else {
			ret = ret[len(ret)-last:]
			pageinfo.HasPreviousPage = true
		}
	}
	if len(ret) == 0 {
		return nil, pageinfo
	}
	pageinfo.StartCursor = GenerateCursor(ret[0])
	pageinfo.EndCursor = GenerateCursor(ret[len(ret)-1])
	return ret, pageinfo
}
