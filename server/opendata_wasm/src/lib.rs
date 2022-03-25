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

// wasm-pack build --scope a01sa01to
// https://developer.mozilla.org/ja/docs/WebAssembly/Rust_to_wasm
