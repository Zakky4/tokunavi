function chatGPT(prompt) {
  // prompt = "こんにちは";
  const constraints = SHEET.getRange(1, 1).getValue(); // 制約
  // totalMessages.unshift({"role": "system", "content": constraints});
  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_APIKEY,
    },
    payload: JSON.stringify({
      model: CHAT_GPT_VER,
      // "messages": totalMessages,
      messages: [
        { role: "system", content: constraints }, // Who you are?
        { role: "user", content: prompt }, // prompt
      ],
    }),
  };
  const response = UrlFetchApp.fetch(CHAT_GPT_URL, requestOptions);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  // Logger.log(json);
  return_text = json["choices"][0]["message"]["content"].trim();
  // Logger.log(`出力メッセージ：${return_text}`);
  return return_text;
}