extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

mod functions;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  log(&format!("Hello, {}!", name));
}

// Debug only
#[wasm_bindgen]
pub fn str2date(s: &str, fm: &str, include_time: bool) -> Option<String> {
  return functions::str2date(s, fm, include_time);
}

// Debug only
#[wasm_bindgen]
pub fn csv2json(
  _content: String,
  override_map: JsValue,
  date_format: String,
  include_time: bool,
) -> JsValue {
  return JsValue::from_serde(&functions::csv2json(
    _content,
    override_map.into_serde().unwrap(),
    date_format,
    include_time,
  ))
  .unwrap();
}

// wasm-pack build --scope a01sa01to
// https://developer.mozilla.org/ja/docs/WebAssembly/Rust_to_wasm
