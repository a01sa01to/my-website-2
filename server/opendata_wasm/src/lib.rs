extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
  log(&format!("Hello, {}!", name));
}

// wasm-pack build --scope a01sa01to
// https://developer.mozilla.org/ja/docs/WebAssembly/Rust_to_wasm
