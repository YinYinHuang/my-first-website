import OpenAI from "openai";
// 額外拉出來的原因是因為: openAI要用到的畫面很多，若金鑰更改則只需要更改這邊即可
// 取得儲存在環境變數(.env.local)的 OPENAI_API_KEY
export default new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});