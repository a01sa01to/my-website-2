import glob
import json
import os
import re

# チェックするディレクトリのリスト
CHECK_DIR = ["pages", "components", "layouts", "data"]

# チェックするjsonファイルのリスト
JSON_FILES = ["apps.json"]

# チェックするTypeScriptファイルのリスト
TS_FILES = []

# チェックするcsvファイルのリスト
CSV_FILES = []

# タグの正規表現パターン
tag_pattern_t = re.compile(r"\$t\([ ]*?['|`][^']*?['|`]")
tag_pattern_tc = re.compile(r"\$tc\([ ]*?['|`][^']*?['|`]")
tag_pattern_i18n = re.compile("<i18n[ ]*?path=['|`\"][^']*?[' |`\"]")

# tsファイル内のヘッダーの正規表現パターン
header_pattern = re.compile(r"\{ text: '[^']*?', value: '[^']*?'")

# tsファイル内のtranslatable unitの正規表現パターン
translatable_pattern = re.compile(
    r"\{[ ]*?text: '[^']*?',[ ]*?translatable: true")

# 文字エンコーディング
ENCODING = "UTF-8"

# 出力ファイル設定
OUTPUT_DIR = "auto-i18n"
CHECK_RESULT = "result.csv"

# 翻訳ファイルパス
JA_JSON_PATH = os.path.join("locales/ja.json")

# 全てのタグリスト
all_tags = []

# 警告の数
warn_count = 0

# チェックされたファイルの数
file_count = 0

# 作られたjson
made_json = {}

# 処理の中で抽出されるヘッダー内のtextとvalueと、translatable unitのtext、translatable、true/falseは
# 変数として読み込まれることになるので、あらかじめ設定しておく
text = "text"
value = "value"
translatable = "translatable"
true = True
false = False

with open(JA_JSON_PATH, mode="r", encoding=ENCODING) as ja_file:
    # ディレクトリ毎にチェック
    for cdir in CHECK_DIR:
        # すべてのVueファイルを検索
        vue_files = glob.glob(cdir + os.sep + "**" +
                              os.sep + "*.vue", recursive=True)
        json_files = glob.glob(cdir + os.sep + "**" +
                               os.sep + "*.json", recursive=True)

        file_count += len(vue_files)
        file_count += len(json_files)

        # 各Vueファイルについて処理
        for path in vue_files:
            with open(path, encoding=ENCODING) as file:
                # ファイルの内容を文字列として取得
                # ここで改行を空白として扱うのは、vue内のi18nタグが正しく認識できない場合があるため
                content = ' '.join([l.strip() for l in file])
                # 全タグを正規表現で取得
                t_tags = [tag[4:(len(tag) - 1)] for tag in tag_pattern_t.findall(content) if
                          tag[4:(len(tag) - 1)] != '']
                tc_tags = [
                    tag[5:(len(tag) - 1)] for tag in tag_pattern_tc.findall(content) if tag[5:(len(tag) - 1)] != ''
                ]
                i18n_tags = [tag[12:(len(tag) - 1)] for tag in tag_pattern_i18n.findall(content) if
                             tag[12:(len(tag) - 1)] != '']
                # 「'」で始まっているタグがあるので修正
                fixed_tags = []
                for tag in t_tags:
                    start = 0
                    if tag[0] == "'":
                        start = 1
                    fixed_tags.append(tag[start:])
                for tag in tc_tags:
                    start = 0
                    if tag[0] == "'":
                        start = 1
                    fixed_tags.append(tag[start:])
                for tag in i18n_tags:
                    start = 0
                    if tag[0] == "'":
                        start = 1
                    fixed_tags.append(tag[start:])

                # タグを統合し、重複分を取り除く
                all_tags = list(set(all_tags + fixed_tags))

        for path in json_files:
            with open(path, encoding=ENCODING) as file:
                content = json.load(file)
                if path == "data{}apps.json".format(os.sep):
                    for item in content:
                        if item["translate"]:
                            all_tags.append(item["title"])
                        all_tags.append(item["text"])

    # Noneが混じっている場合、取り除く
    try:
        all_tags.pop(all_tags.index(None))
    except ValueError:
        print('None is not in List')

    # 全角のハイフン、半角のハイフン、全角のダッシュ、全角ハイフンマイナスが混じっているので、取り除く
    # 理由は components/index/CardsReference/ConfirmedCasesAttributes/Card.vue の translateWord メソッドを参照。
    for x in ["-", "‐", "―", "－"]:
        try:
            all_tags.pop(all_tags.index(x))
        except ValueError:
            pass

    # 翻訳が複数あるもの("."で区切られている特殊なもの)を保管するリスト
    has_many_tags = []

    # 仮のja.jsonを作る
    tentative_ja_json = {}
    for tag in all_tags:
        # "."で区切られている特殊なもの("件.tested"や"件.reports"のような翻訳が複数あるもの)を判別する
        # 普通のものに関しては、なにもせず代入する
        tag_splitted = tag.split(".")
        if len(tag_splitted) == 2:
            found = False
            for many_tag in has_many_tags:
                if tag_splitted[0] == many_tag[0] and tag_splitted[1] != many_tag[1]:
                    found = True
                    many_tag[2] = found
            # ogp.og:imageに関しては一つしかない例外なので、特例として処理する
            if tag_splitted[0] == "ogp":
                found = True
            has_many_tags.append(tag_splitted + [found])
        else:
            # N代は除外する(既に"{age}代"として存在するため)
            if tag[-1:] == "代":
                try:
                    int(tag[:-1])
                    continue
                except ValueError:
                    pass
            tentative_ja_json[tag] = tag

    # "."でわけられていたものに関して、複数あれば(many_tag[2]がtrueであれば)
    # 辞書型として展開して代入し、そうでなければ普通のキーとして代入する
    for many_tag in has_many_tags:
        if many_tag[2]:
            if tentative_ja_json.get(many_tag[0]):
                tentative_ja_json[many_tag[0]][many_tag[1]] = many_tag[0]
            else:
                tentative_ja_json[many_tag[0]] = {
                    many_tag[1]: many_tag[0]
                }
        else:
            full_tag = ".".join(many_tag[:2])
            tentative_ja_json[full_tag] = full_tag

    # ja.jsonを読み込む
    ja_json = json.load(ja_file)

    # 念のためassert
    assert isinstance(ja_json, dict)

    tentative_json_keys = list(tentative_ja_json.keys())
    ja_json_keys = list(ja_json.keys())

    # 以前はなかったが今はある翻訳を追加する
    for key in tentative_json_keys:
        ja_tag = ja_json.get(key)
        tentative_tag = tentative_ja_json.get(key)
        if not ja_tag and str(tentative_tag):
            ja_json[key] = tentative_tag
            print("Add TAG: " + str(tentative_tag) + " to " + JA_JSON_PATH)

        # 変更してはならない部分を変更する可能性があるため、変更に関しては自動化しない。
        # elif ja_tag != tentative_tag:
        #     ja_json[key] = tentative_tag
        #     print("Change TAG: " + str(ja_tag) + " to " + str(tentative_tag))
        #     if not warn_count:
        #         result.write(",".join(["RUN", datetime.today().strftime("%Y/%m/%d %H:%M")]) + '\n')
        #     result.write(",".join(["TAG_CHANGE", str(ja_tag) + " to " + str(tentative_tag)]) + '\n')
        #     warn_count += 1
        elif not ja_tag:
            print("Nothing to add.")
        if ja_tag:
            ja_json_keys.pop(ja_json_keys.index(key))

    # 以前はあったが今はない翻訳を削除する
#     for key in ja_json_keys:
#         ja_tag = ja_json.get(key)
#         ja_json.pop(key)
#         print("Remove TAG: " + str(ja_tag) + " from " + JA_JSON_PATH)
#         if not warn_count:
#             result.write(",".join(["RUN", datetime.today().strftime("%Y/%m/%d %H:%M")]) + '\n')
#         result.write(",".join(["TAG_REMOVE", str(ja_tag)]) + '\n')
#         warn_count += 1

    made_json = ja_json

with open(JA_JSON_PATH, mode="w", encoding=ENCODING) as file:
    json.dump(made_json, file, ensure_ascii=False, indent=2)

# 以下、リザルト
# タグ総数
print("total : " + str(len(all_tags)))
# 警告数(未登録タグ数 + 削除済タグ数)
print("warn : " + str(warn_count))
# ファイル総数
print("checked file: " + str(file_count))
