import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {

  const today = req.nextUrl.searchParams.get("today");
  const count = req.nextUrl.searchParams.get("count");
  const signerPrivateKey = process.env.PRIVATE_KEY;


  try {
    await axios.post('https://publish.justcast.me/', {
      data: {         text:
`${today}
Type: Video
                
1 of 1
0.00321e`,
          embeds: [
            { url: `https://highlight.xyz/mint/base:0x3595491A2ecD658Ab249AcBd15F649b1D2B7cb3a:9c9d6dd7e82d0217d6aee15dbabc223b/t/${count}` }
          ], mentions: [], mentionsPositions: []},
          parent_url: "https://warpcast.com/~/channel/test",
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
