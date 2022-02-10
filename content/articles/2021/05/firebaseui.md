---
title: FirebaseUIで日本語にしてAuthDomainを設定したい
description: FirebaseUIを日本語にしたうえで、AuthDomainを設定するのに手こずったので、備忘録です
tags: ['Google', 'Firebase']
createDate: 2021-05-19
updateDate: 2021-06-28
---

とある用で Firebase Authentication を使っていて、FirebaseUI をログイン画面に実装していました。

[FirebaseUI でウェブアプリに簡単にログイン機能を追加する](https://firebase.google.com/docs/auth/web/firebaseui?hl=ja)

上のリンクを見てもらえればわかるように、FirebaseUI では以下の画像のように、ただコンテナを作れば、勝手にログイン画面を作ってくれます。
<webp-image src="/images/blog/2021/05/firebaseui/01" ext="png" alt="FirebaseUIのログイン画面"></webp-image>

最終的にここまでたどり着くまでに、いろいろ躓いたので、備忘録的な？

## Point1

まず、Google のガイドにはいくつかの方法が載っていました。<br>
自分は ESM（ES Modules）で、Webpack を使って 1 ファイルにまとめていたので、ガイド通り `npm install firebaseui --save` を実行して、プロジェクトに組み込みました。

この際用いたコードは、途中省きますが以下の通りです。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <script src="./bundle.js"></script>
    <link
      type="text/css"
      rel="stylesheet"
      href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css"
    />
  </head>
  <body>
    <div id="firebaseui-auth-container"></div>
  </body>
</html>
```

```ts
//----- ログイン処理 -----//
import * as firebaseui from 'firebaseui'
import { firebaseConfig } from './firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/auth'

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
auth.languageCode = 'ja'
if (location.pathname === '/login') {
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        return true
      },
    },
    signInSuccessUrl: '/',
    privacyPolicyUrl: '/policy',
  })
}
```

これを開いてみると、以下のような表示になりました。
日本語じゃない......
<webp-image src="/images/blog/2021/05/firebaseui/02" ext="png" alt="英語なFirebaseUIのログイン画面"></webp-image>

## Point2

「でも、やっぱりユーザーのことを考えたら日本語がいいな...」ということで、もう一つの方法「CDN を使う」を試すべく、先ほどの TypeScript ファイルを消して、HTML ファイルを変更。`<head>`タグが終わる前に、これを追記しました。

```html
<script src="/__/firebase/7.23.0/firebase-app.js"></script>
<script src="/__/firebase/7.23.0/firebase-analytics.js"></script>
<script src="/__/firebase/7.23.0/firebase-auth.js"></script>
<script src="/__/firebase/init.js"></script>
<script src="https://www.gstatic.com/firebasejs/ui/4.7.1/firebase-ui-auth__ja.js"></script>
<script>
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        return true
      },
    },
    signInSuccessUrl: '/',
    privacyPolicyUrl: '/policy',
  })
</script>
```

日本語になった！！
<webp-image src="/images/blog/2021/05/firebaseui/01" ext="png" alt="日本語なFirebaseUIのログイン画面"></webp-image>

しかし、ここでも問題が。
例えば今 `hogehoge.com` にいても、ログインボタンを押したら `<project-id>.firebaseapp.com` に飛ばされてから、OAuth 画面へ飛びます。<br
つまり、OAuth の流れとしては「`hogehoge.com`→`<project-id>.firebaseapp.com`→（OAuth 認証）→`<project-id>.firebaseapp.com`→`hogehoge.com`」と、謎(?) の `firebaseapp.com` を経由してしまうというわけです。

これについては、Firebase の設定の `authDomain` という Key で設定できますが、そもそも CDN では設定ファイルを埋め込めない...。

## 解決策

ドキュメントを見てみると、FirebaseUI のソースコードから自分でビルドすれば解決するのでは？と考え、試してみました。結果成功しました。

[GitHub: firebase/firebaseui-web](https://github.com/firebase/firebaseui-web)

参考： [firebaseui-web/README.md at master · firebase/firebaseui-web](https://github.com/firebase/firebaseui-web/blob/master/README.md#building-firebaseui)

### Step1

まず、ビルドのために必要となる開発環境をインストールします。

- Node.js
- npm
- Java SE Runtime Environment 8

### Step2

ソースコードを Clone します。

```bash
git clone https://github.com/firebase/firebaseui-web.git
cd firebaseui-web
npm install
```

### Step3

ESM 用の日本語版ファイルをビルドします。

```bash
npm run build build-esm-ja
```

`dist` フォルダ 内にある `esm__ja.js` が出力されたファイルになります。

### Step4

読み込みます。TypeScript を用いているので、 `index.d.ts` もコピーしました。

```ts
import './firebaseui/@types/index'
import { auth } from './firebaseui/esm__ja'

// ～ Firebaseの設定は略 ～ //

window.addEventListener('DOMContentLoaded', () => {
  if (location.pathname === '/login') {
    const ui = new auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          return true
        },
        signInFailure: (err) => {
          console.error(err)
        },
        uiShown: () => {},
      },
      signInSuccessUrl: '/',
      privacyPolicyUrl: '/policy',
    })
  }
})
```

### Step5

Step4 のままだと、まだ `<projectid>.firebaseapp.com` に飛ばされます。<br>
そこで、Firebase の設定ファイルを変更します。

```ts
{
  apiKey: '...',
  // authDomain: '<projectid>.firebaseapp.com',
  authDomain: 'hogehoge.com',
  databaseURL: '...',
  // 以下略
}
```

これで、Webpack でビルドすると、きちんと日本語になり、 `hogehoge.com` に飛ばされました！

※この記事は、[Qiita](https://qiita.com/a01sa01to/items/5c8324e0f37bdf0eacd7) でも公開しています。
