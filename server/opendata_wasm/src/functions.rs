use chrono::{NaiveDate, NaiveDateTime};

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
