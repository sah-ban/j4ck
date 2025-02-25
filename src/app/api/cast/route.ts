import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {

  const  text= req.nextUrl.searchParams.get("today") || "";
  const today= decodeURIComponent(text)
  const count = req.nextUrl.searchParams.get("count");
  const signerPrivateKey = process.env.PRIVATE_KEY;


  try {
    await axios.post('https://publish.justcast.me/', {
      data: {
      text:`${today}`,
      "parentUrl": "https://warpcast.com/~/channel/iykyk",
      embeds: [
            { url: `${count}` }
              ],
      mentions: [],
      mentionsPositions: []},
     fid: 545039,
      signerPrivateKey,
    }).then(response => console.log(response.data))
      .catch(error => console.error(error));

    return NextResponse.json({
      today,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
