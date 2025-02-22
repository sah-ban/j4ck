import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {

  const allowance = req.nextUrl.searchParams.get("allo");
  // const castHash = req.nextUrl.searchParams.get("hash");
  const castHash = req.nextUrl.searchParams.get("hash") || "";
  const signerPrivateKey = process.env.PRIVATE_KEY;


  function hexToByteArray(hex: string): number[] {
    if (hex.startsWith("0x")) {
        hex = hex.slice(2); // Remove '0x' prefix if present
    }

    if (hex.length !== 40) {
        throw new Error("Hex string must be exactly 40 characters (20 bytes)");
    }

    return Array.from({ length: 20 }, (_, i) => parseInt(hex.substr(i * 2, 2), 16));
}
// Example usage:
const byteArray = hexToByteArray(castHash);
// console.log(byteArray);




  try {
    await axios.post('https://publish.justcast.me/', {
      data: { text:
`${allowance}`,
parentCastId: {
  fid: 268438,
  hash:byteArray,
}, 
 mentions: [], mentionsPositions: [] ,channel_id: "test"},
      body:{ channel_id: "test"},
      fid: 545039,
      signerPrivateKey,
    }).then(response => console.log(response.data))
      .catch(error => console.error(error));

    return NextResponse.json({
      castHash,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
