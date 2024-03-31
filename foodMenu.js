function getContent_(url) {
    return UrlFetchApp.fetch(url).getContentText()
}

function main() {
    const content = getContent_('https://en.wikipedia.org');
    const $ = Cheerio.load(content);
    Logger.log($('#mp-right').text());
}