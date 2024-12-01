import openai from "@/services/openai";
import db from "@/services/db";

export async function GET() {
    const imageList = []

    // 取得image-ai集合所有資料
    // 透過時間戳記由大到小排 新=>舊
    const querySnapshot = await db.collection('image-ai').orderBy("createdAt", "desc").get();


    // 將快照內的文件取出
    querySnapshot.forEach((doc) => {
        // 陣列.push(資料) 把資料加到陣列中
        // doc.data()才是當初存入的資料
        imageList.push(doc.data())
    })

    // 將vocabuList傳給前端
    return Response.json(imageList)
}

export async function POST(req) {
    const body = await req.json();
    console.log("body:", body);
    // 透過dall-e-3模型讓AI產生圖片
    // 文件連結: https://platform.openai.com/docs/guides/images/usage
    const { userInput } = body;

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: userInput,
        n: 1,
        size: "1024x1024",
    });
    // 取得AI模型畫的圖片網址
    const imageURL = response.data[0].url;
    console.log("imageURL:", imageURL)

    const image = {
        imageURL: imageURL,
        prompt: userInput,
        createdAt: new Date().getTime(),
    }
    await db.collection("image-ai").add(image)
    return Response.json(image);
}