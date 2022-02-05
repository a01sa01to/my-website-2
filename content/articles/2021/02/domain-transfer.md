---
title: ドメインを移管しました
tags: ['Domain', 'Website']
createDate: 2021-02-01
updateDate: 2021-05-30
---

この記事、今更感がすごい

## 移管した理由

最初にドメインを登録したのが 2019 年 4 月 1 日。<br>
だから 1 年と 7 ヶ月くらい？ お名前.com を使っていたんですよね。

サイトを再構築するときに考えていたのは

<div class="card shadow-lg round my-4" style="max-width: 300px">
  <div class="card-body">
    Git と 連携 させたい ... ！！
  </div>
</div>

Google App Engine なら GitHub にソース上げればデプロイしてくれるからベストだと思い、
いっそのこと Google サービスにまとめちゃえ！！っていうだけ。
（GitHub Actions 使えば FTP で上げられたりするんですけどね）

## タイムライン

- <nobr>2020.11.29 19:50<wbr>　ドメイン移管手続き開始</nobr>
- <nobr>2020.11.29 19:57<wbr>　支払い</nobr>
- <nobr>2020.11.29 20:27<wbr>　拒否られた</nobr>
- <nobr>2020.11.30 18:43<wbr>　リベンジ</nobr>
- <nobr>2020.11.30 19:38<wbr>　確認メールが来た</nobr>
- <nobr>2020.11.30 22:15<wbr>　メールに気づき、承認</nobr>
- <nobr>2020.11.30 22:27<wbr>　移管完了</nobr>

## Step by Step

今回は「お名前.com（以下「移管元」）」から「Google Domains（以下「移管先」）」に移管しました。

### Step1 - 入力

移管先のサイトを開き、「移管する」ページを開きます。
移管したいドメインを入力します。
<webp-image src="/images/blog/2021/02/domain-transfer/01" ext="png" alt="移管するドメインをテキストボックスに入力"></webp-image>

### Step2 - AuthCode

移管元から、AuthCode を取得します。移管先に入力します。
<webp-image src="/images/blog/2021/02/domain-transfer/02" ext="png" alt="移管元から取得して..."></webp-image>
<webp-image src="/images/blog/2021/02/domain-transfer/03" ext="png" alt="移管先に貼り付け"></webp-image>

### Step3 - Whois 代行公開を一時無効化

（お名前.com の場合は）Whois 公開代行を一時的に無効化しないと、移管できないようです。<br>
私は無効化していなかったので、拒否されました。
<webp-image src="/images/blog/2021/02/domain-transfer/10" ext="png" alt="拒否された！？"></webp-image>
<webp-image src="/images/blog/2021/02/domain-transfer/11" ext="png" alt="Whois公開代行されているとダメらしい"></webp-image>

なので、忘れずに無効化しておきましょう。

### Step4 - 設定確認

設定を確認します。<br>
~~DNS 設定は引き継がれるらしい。まあ引き継がれなかったら困る。~~<br>
一部引き継がれてなかった。一応移管後に確認しておいたほうがよさそうです。

<webp-image src="/images/blog/2021/02/domain-transfer/04" ext="png" alt="設定確認"></webp-image>

なお、この時支払うのは、1 年間分の料金である￥ 1,400 です。
<webp-image src="/images/blog/2021/02/domain-transfer/05" ext="png" alt="支払い"></webp-image>

### Step5 - 支払い

<webp-image src="/images/blog/2021/02/domain-transfer/06" ext="png" alt="JCBで払おうとすると...？"></webp-image>
いつも使っている JCB（LINE Pay）でやろうとしたところ、何度やってもダメでした。

<webp-image src="/images/blog/2021/02/domain-transfer/07" ext="png" alt="なんでや！"></webp-image>

そこで Visa を使ってみると、支払い完了しました。
<webp-image src="/images/blog/2021/02/domain-transfer/08" ext="png" alt="支払い完了！"></webp-image>

支払いが完了し、ステータスが表示されるようになりました。
<webp-image src="/images/blog/2021/02/domain-transfer/09" ext="png" alt="ステータス"></webp-image>

### Step6 - 移管承認

支払い後、移管元からメールが届きます。<br>
このメールから承認しないと、移管できないので、承認します。
<webp-image src="/images/blog/2021/02/domain-transfer/12" ext="png" alt="移管承認"></webp-image>
<webp-image src="/images/blog/2021/02/domain-transfer/13" ext="png" alt="移管承認完了"></webp-image>

### Step7 - 移管完了

しばらくすると、移管が完了し、移管先からメールが届きました。

ついに移管完了です！
<webp-image src="/images/blog/2021/02/domain-transfer/14" ext="png" alt="移管完了"></webp-image>

ちなみに、DNS はいくつか引き継がれていませんでした。
<webp-image src="/images/blog/2021/02/domain-transfer/15" ext="png" alt="DNS一覧"></webp-image>
