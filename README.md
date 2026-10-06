# Taisei Sone - Portfolio Website

ゲームプログラマー（C++ / DirectX / 自作エンジン / HLSL）志望向けのポートフォリオサイトです。  
GitHub Pages を用いて全世界に公開できます。

## 🌟 主な特徴
- **ゲームプログラマー特化のスタイリッシュなデザイン**:
  - ディープネイビー＆サイバーシアンのハイテック・ダークテーマ
  - 軽量なインタラクティブ・キャンバス演出（ノード＆パーティクル）
  - レスポンシブ対応（スマートフォン・タブレット・PC全対応）
- **実績 12作品のショーケース**:
  - 自作ゲームエンジン `SoneEngine`
  - 3年次 チーム制作作品
  - 2年次 チーム制作・個人制作作品
  - 1年次 チーム制作・個人制作作品
- **詳細モーダル**:
  - 各作品の「工夫した点」「担当箇所」「コードスニペット」をポップアップ表示
- **カテゴリフィルター**:
  - All / Engine & Graphics / C++ Game / Unity & Tools でサクサク絞り込み

---

## 🚀 ローカルでの動作確認

本サイトは純粋な HTML5 / CSS3 / JavaScript (Vanilla) で構成されており、特別なビルドツール（Node.js等）なしで動作します。

### ブラウザで直接開く場合
`index.html` をダブルクリックするか、Google Chrome等のブラウザにドラッグ＆ドロップしてください。

### ローカルサーバーを起動して確認する場合 (Python)
PowerShellで以下のコマンドを実行し、ブラウザで `http://localhost:8000` にアクセスします。
```bash
python -m http.server 8000
```

---

## 🌐 GitHub Pages への公開手順

### STEP 1: Gitリポジトリの初期化とコミット
```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### STEP 2: GitHubでリポジトリを作成
1. ブラウザで [GitHub](https://github.com/new) にアクセスします。
2. リポジトリ名を入力します（例: `portfolio` または `SoneTaisei.github.io`）。
   - ※ `SoneTaisei.github.io` にすると、URLが `https://SoneTaisei.github.io/` となり一番綺麗です。
3. **Public（公開）** を選択してリポジトリを作成します。

### STEP 3: GitHubへプッシュ
```bash
git branch -M main
git remote add origin https://github.com/SoneTaisei/リポジトリ名.git
git push -u origin main
```

### STEP 4: GitHub Pages の有効化
1. 作成したGitHubリポジトリのページを開きます。
2. 上部メニューの **Settings** をクリック。
3. 左サイドバーの **Pages** をクリック。
4. **Build and deployment** の Source で **Deploy from a branch** を選択。
5. Branch で **`main`** / **`/(root)`** を選択し、**Save** をクリック。
6. 数十秒〜1分ほど待つと、上部に公開URL（例: `https://SoneTaisei.github.io/portfolio/`）が表示されます。

---

## 🖼️ 画像の差し替え方法
ゲームの実際のスクリーンショットやデモGIFを追加したい場合：
1. `assets/images/` フォルダに画像ファイルを配置します（例: `sone-engine.png`）。
2. `index.html` の各カード内のプレビュー領域（`<div class="mock-canvas ...">`）を `<img>` タグに置き換えるか、CSSで背景画像として指定できます。
