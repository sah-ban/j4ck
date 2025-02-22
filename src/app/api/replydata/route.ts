import { init, fetchQuery } from "@airstack/node";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const apiKey = process.env.AIRSTACK_API_KEY;
if (!apiKey) {
  throw new Error("AIRSTACK_API_KEY is not defined");
}
init(apiKey);
const GetMostRecentCastHashByFid = `
query GetMostRecentCastHashByFid {
  FarcasterCasts(input: {blockchain: ALL, filter: {castedBy: {_eq: "fc_fid:268438"}}, limit: 1}) {
    Cast {
      hash
    }
  }
}
`;

export async function GET() {



  try {
    const [userData] = await Promise.all([fetchQuery(GetMostRecentCastHashByFid)]);
    const allowancesApiUrl = `https://api.degen.tips/airdrop2/allowances?fid=431`;

    const allowancesResponse = await axios.get(allowancesApiUrl)
    const allowance =  allowancesResponse.data[0].remaining_tip_allowance;

    if (userData.error) {
      console.error("Airstack API error (user data):", userData.error);
      return NextResponse.json(
        { error: userData.error.message },
        { status: 500 }
      );
    }

    const hash = userData?.data?.FarcasterCasts?.Cast?.[0]?.hash || null;
console.log(hash)
console.log(allowance)

      // console.log("doesnt follow you");
      return NextResponse.json({
        hash,
        allowance
      });

  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
