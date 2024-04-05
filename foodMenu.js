function main() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const main_menu = scriptProperties.getProperty('MAIN_MENU_URL');
  fetchFoods(main_menu);
}

// Cheerio
function getContent_(url) {
  return UrlFetchApp.fetch(url).getContentText()
}

// フードメニューの情報を取得
function fetchFoods(url) {
  const content = getContent_(url);
  const $ = Cheerio.load(content);
  const foodList = $('.menulist_list');
  const values = [];
  foodList.each(function () {
    const title = $(this).find('h4').text();
    const price = $(this).find('span.price_num').text();
    const food = {
      'title': title,
      'price': price
    }
    values.push(food);
  });

  Logger.log(values);

  // スプレッドシート処理
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("メニュー");

  // 見出しを除く既存データを一旦クリア
  const rows = sheet.getLastRow() - 1; //カラム行はクリア対象外にしたいので-1
  const columns = sheet.getLastColumn();
  if (rows >= 1) {
    const clearRange = sheet.getRange(2, 1, rows, columns);
    clearRange.clear();
  }

  // データを書き込み
  const lastRow = sheet.getLastRow();
  for (let i = 0; i < values.length; i++) {
    const menu = [
      values[i].title,
      values[i].price
    ];
    ss.appendRow(menu);
  }

}