use chrono::{NaiveDate, NaiveDateTime};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
pub enum JsonType {
  String(Option<String>),
  Number(f64),
  Boolean(bool),
}

pub fn str2date(s: &str, fm: &str, include_time: bool) -> Option<String> {
  let date: NaiveDateTime;
  if include_time {
    let res = NaiveDateTime::parse_from_str(s, fm);
    if res.is_err() {
      return None;
    }
    date = res.unwrap();
  } else {
    let res = NaiveDate::parse_from_str(s, fm);
    if res.is_err() {
      return None;
    }
    date = res.unwrap().and_hms(0, 0, 0);
  }
  return Option::Some(date.format("%Y-%m-%dT%H:%M:%S+09:00").to_string());
}

pub fn csv2json(
  _content: String,
  override_map: HashMap<String, String>,
  date_format: String,
  include_time: bool,
) -> Vec<HashMap<String, JsonType>> {
  let content = _content.replace("\r\n", "\n");
  let mut lines: Vec<String> = content.split("\n").map(|s| s.to_string()).collect();
  let headers: Vec<String> = lines[0].split(",").map(|s| s.to_string()).collect();
  lines.remove(0);

  let json_data = lines.iter().map(|line| {
    let dt: Vec<String> = line.split(",").map(|s| s.to_string()).collect();
    assert_eq!(dt.len(), headers.len());

    let mut data: HashMap<String, JsonType> = HashMap::new();
    for (i, header) in headers.iter().enumerate() {
      let value = dt[i].to_string();
      let override_value = &override_map[header];
      assert_ne!(override_value, "");

      if override_value == "number" {
        data.insert(
          header.to_string(),
          JsonType::Number(value.parse::<f64>().unwrap()),
        );
      } else if override_value == "date" {
        data.insert(
          header.to_string(),
          JsonType::String(str2date(&value, &date_format, include_time)),
        );
      } else if override_value == "boolean" {
        let falsy = ["false", "0", "null", "undefined", "", "NaN", "-0"];
        if falsy.contains(&value.as_str()) {
          data.insert(header.to_string(), JsonType::Boolean(false));
        } else {
          data.insert(header.to_string(), JsonType::Boolean(true));
        }
      } else {
        data.insert(
          header.to_string(),
          JsonType::String(Option::Some(value.to_string())),
        );
      }
    }
    return data;
  });
  return json_data.collect();
}
