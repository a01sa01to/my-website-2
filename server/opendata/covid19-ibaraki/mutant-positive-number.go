package covid19ibaraki

import (
	"a01sa01to/opendata-api/pagination"
	"encoding/json"
	"os"

	"github.com/graphql-go/graphql"
)

var mutposnum_dataset_byage = &graphql.Field{
	Name: "mutposnum_dataset_byage",
	Type: graphql.NewObject(graphql.ObjectConfig{
		Name: "mutposnum_dataset_byage",
		Fields: graphql.Fields{
			"under_twenties": &graphql.Field{
				Name:        "under_twenties",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those under 20s",
			},
			"thirties": &graphql.Field{
				Name:        "thirties",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those 30s",
			},
			"forties": &graphql.Field{
				Name:        "forties",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those 40s",
			},
			"fifties": &graphql.Field{
				Name:        "fifties",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those 50s",
			},
			"sixties": &graphql.Field{
				Name:        "sixties",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those 60s",
			},
			"seventies": &graphql.Field{
				Name:        "seventies",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those 70s",
			},
			"eighties": &graphql.Field{
				Name:        "eighties",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those 80s",
			},
			"nineties": &graphql.Field{
				Name:        "nineties",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those 90s",
			},
			"over_hundred": &graphql.Field{
				Name:        "over_hundred",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of those over 100s",
			},
			"unknown": &graphql.Field{
				Name:        "unknown",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of unknowns",
			},
		},
	}),
	Description: "Dataset of the number of mutant positives by age",
}

var mutposnum_dataset_bygender = &graphql.Field{
	Name: "mutposnum_dataset_bygender",
	Type: graphql.NewObject(graphql.ObjectConfig{
		Name: "mutposnum_dataset_bygender",
		Fields: graphql.Fields{
			"male": &graphql.Field{
				Name:        "male",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of male",
			},
			"female": &graphql.Field{
				Name:        "female",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of female",
			}, "unknown": &graphql.Field{
				Name:        "unknown",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Number of the unknown",
			},
		},
	}),
	Description: "Dataset of the number of mutant positives by gender",
}

var mutposnum_dataset = &graphql.Field{
	Name: "mutposnum_dataset",
	Type: graphql.NewList(graphql.NewObject(graphql.ObjectConfig{
		Name: "mutposnum_dataset",
		Fields: graphql.Fields{
			"date": &graphql.Field{
				Name:        "date",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Publication date",
			},
			"government_code": government_code_field,
			"prefecture":      prefecture_field,
			"city":            city_field,
			"total": &graphql.Field{
				Name:        "total",
				Type:        graphql.NewNonNull(graphql.Int),
				Description: "Total number of mutant positives",
			},
			"strain_name": &graphql.Field{
				Name:        "strain_name",
				Type:        graphql.NewNonNull(graphql.String),
				Description: "Strain name",
			},
			"by_age":    mutposnum_dataset_byage,
			"by_gender": mutposnum_dataset_bygender,
		},
		Description: "Dataset of the number of positive cases of mutant strain",
	})),
}

var mutposnum_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "mutant_positive_number",
	Fields: graphql.Fields{
		"dataset":     mutposnum_dataset,
		"pageinfo":    pagination.Field,
		"last_update": lastupdate_field,
	},
	Description: "Dataset of the number of positive cases of mutant strain",
})

type mutposnum_dataset_raw_t struct {
	Date           string `json:"公表_年月日"`
	GovernmentCode string `json:"全国地方公共団体コード"`
	Prefecture     string `json:"都道府県名"`
	City           string `json:"市区町村名"`
	Total          int    `json:"変異株陽性者数"`
	StrainName     string `json:"変異株名"`
	ByAge          struct {
		Under_twenties int `json:"20代以下"`
		Thirties       int `json:"30代"`
		Forties        int `json:"40代"`
		Fifties        int `json:"50代"`
		Sixties        int `json:"60代"`
		Seventies      int `json:"70代"`
		Eighties       int `json:"80代"`
		Nineties       int `json:"90代"`
		Over_hundred   int `json:"100歳以上"`
		Unknown        int `json:"不明"`
	} `json:"年代別"`
	ByGender struct {
		Male    int `json:"男性"`
		Female  int `json:"女性"`
		Unknown int `json:"不明"`
	} `json:"性別"`
}

type mutposnum_dataset_t struct {
	Date           string `json:"date"`
	GovernmentCode string `json:"government_code"`
	Prefecture     string `json:"prefecture"`
	City           string `json:"city"`
	Total          int    `json:"total"`
	StrainName     string `json:"strain_name"`
	ByAge          struct {
		Under_twenties int `json:"under_twenties"`
		Thirties       int `json:"thirties"`
		Forties        int `json:"forties"`
		Fifties        int `json:"fifties"`
		Sixties        int `json:"sixties"`
		Seventies      int `json:"seventies"`
		Eighties       int `json:"eighties"`
		Nineties       int `json:"nineties"`
		Over_hundred   int `json:"over_hundred"`
		Unknown        int `json:"unknown"`
	} `json:"by_age"`
	ByGender struct {
		Male    int `json:"male"`
		Female  int `json:"female"`
		Unknown int `json:"unknown"`
	} `json:"by_gender"`
}

var mutposnum_field = &graphql.Field{
	Name: "mutant_positive_number",
	Type: mutposnum_type,
	Args: pagination.Arguments,
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		file, err := os.Open(getRawDataPath("080004_ibaraki_covid19_mutant_positive_number.json"))
		if err != nil {
			return nil, err
		}
		defer file.Close()

		var ret []mutposnum_dataset_t
		var raw []mutposnum_dataset_raw_t
		err = json.NewDecoder(file).Decode(&raw)
		if err != nil {
			return nil, err
		}

		for _, v := range raw {
			var ap mutposnum_dataset_t

			ap.Date = v.Date + ".000+09:00"
			ap.GovernmentCode = v.GovernmentCode
			ap.Prefecture = v.Prefecture
			ap.City = v.City
			ap.Total = v.Total
			ap.StrainName = v.StrainName
			ap.ByAge.Under_twenties = v.ByAge.Under_twenties
			ap.ByAge.Thirties = v.ByAge.Thirties
			ap.ByAge.Forties = v.ByAge.Forties
			ap.ByAge.Fifties = v.ByAge.Fifties
			ap.ByAge.Sixties = v.ByAge.Sixties
			ap.ByAge.Seventies = v.ByAge.Seventies
			ap.ByAge.Eighties = v.ByAge.Eighties
			ap.ByAge.Nineties = v.ByAge.Nineties
			ap.ByAge.Over_hundred = v.ByAge.Over_hundred
			ap.ByAge.Unknown = v.ByAge.Unknown
			ap.ByGender.Male = v.ByGender.Male
			ap.ByGender.Female = v.ByGender.Female
			ap.ByGender.Unknown = v.ByGender.Unknown

			ret = append(ret, ap)
		}

		res, pag := pagination.Data2Return(ret, p.Args)
		return interface{}(pagination.ReturnData_t[mutposnum_dataset_t]{
			Dataset:    res,
			Pageinfo:   pag,
			LastUpdate: getLastUpdate("mutant_positive"),
		}), nil
	},
	Description: "Dataset of the number of positive cases of mutant strain",
}
