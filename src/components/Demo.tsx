"use client";

import { useEffect, useState } from "react";
import sdk, {
  // FrameNotificationDetails,
 type Context,
} from "@farcaster/frame-sdk";
import { Input } from "../components/ui/input"
import { Label } from "~/components/ui/label";


export default function DemoN(
  { title }: { title?: string } = { title: "See Who Joined Around You" }

) {
  const [context, setContext] = useState<Context.FrameContext>();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready({});
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  function getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
  
  // Declare a variable outside so it can be updated
  const today = getFormattedDate();

  // const cast = useCallback((text: string, url: string) => {
  //   try {
  //      fetch(`/api/cast?today=${text}&count=${url}`);
  
  //   } catch (err) {
  //     console.error("Error sendinding DC from warpcast", err);
  //   }
  // }, []);
//   interface ReplyResponse {
//     allowance: string;
//     hash: string;
//   }
//   const [replyData, setReplyData] = useState<ReplyResponse | null>(null);

//   const fetchReply = useCallback(async () => {
//     try {
//       const replyResponse = await fetch(`/api/replydata`);
//       if (!replyResponse.ok) {
//         throw new Error(`Fid HTTP error! Status: ${replyResponse.status}`);
//       }
//       const replyResponseData = await replyResponse.json();

//       if (
//         replyResponseData &&
//         typeof replyResponseData.allowance === "string" &&
//         typeof replyResponseData.hash === "string"
//       ) {
//         setReplyData({
//           allowance: replyResponseData.allowance,
//           hash: replyResponseData.hash,
//         });
//       } else {
//         throw new Error("Invalid response structure");
//       }
//     } catch (err) {
//       console.error("Error fetching points data", err);
//     }

// }, []);

// const tip = useCallback((allo: string, hash: string) => {
//   try {
//      fetch(`/api/tip?allo=${allo}&hash=${hash}`);

//   } catch (err) {
//     console.error("Error sendinding DC from warpcast", err);
//   }
// }, []);

// useEffect(() => {

//     fetchReply()

// }, []);


// const typedAllo=replyData?.allowance || "1";
// const typedHash=replyData?.hash || "0xe5dd593ceddcad16f031c7f7cf29ebc1599dfa35";


  
if (context?.user.fid === 268438 || context?.user.fid === 431)
    return (
      <div style={{ 
        paddingTop: context?.client.safeAreaInsets?.top ?? 0, 
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0 ,
      }}>
      <Allowed/>
    </div>
    );

    if (!context?.user.fid)
      return (
   
        <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-4">You do not have permission to view this page.</p>
        <button 
          onClick={() => window.close()} 
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Close Tab
        </button>
      </div>
    </div>
      );

  return (
    <div style={{ 
      paddingTop: context?.client.safeAreaInsets?.top ?? 0, 
      paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
      paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
      paddingRight: context?.client.safeAreaInsets?.right ?? 0 ,
    }}>
<h1 className="hidden">{title}</h1>
<NotAllowed/>
  </div>


  );


  function NotAllowed( ) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 m-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="text-gray-600 mt-4">You do not have permission to use this frame.</p>
        <button 
          onClick={() => sdk.actions.close()} 
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Close Frame
        </button>
      </div>
    </div>

    
    );
  }

  function Allowed( ) {
    const count: number = new Date().getDate()+ 530
    // const [isCasted, setIsCasted] = useState(false);
    // const [isTipped, setIsTipped] = useState(false);
  
    const [tokenId, setTokenId] = useState(count);
    const text: string= `${today}\nLocation: \nType: Video\nTime: Late\n\n.\n\n1 of 1\n0.00321e`

    const [castText, setCastText] = useState(text);
    const highlight = `https://highlight.xyz/mint/base:0x3595491A2ecD658Ab249AcBd15F649b1D2B7cb3a:9c9d6dd7e82d0217d6aee15dbabc223b/t/${tokenId}`; // 🔗 Replace with your desired URL
   const openSea=`https://opensea.io/assets/base/0x3595491a2ecd658ab249acbd15f649b1d2b7cb3a/${tokenId}`

    // const handleCast = () => {
    //   cast(encodedText, url);
    //   setIsCasted(true);
    // };
    const encodedText = encodeURIComponent(castText);
    const [url, setUrl] = useState(highlight);
    // const handleTip = () => {
    //   tip(typedAllo, typedHash);
    //   setIsTipped(true);
    // };
    const shareUrlData = `https://warpcast.com/~/compose?text=${encodedText}&embeds[]=${url}&channelKey=j4ck`;

    return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
<h1 className="text-3xl font-bold text-white mb-6">Today&apos;s Mint</h1>

<div className="p-6 max-w-lg w-full bg-[#2a1e3f] shadow-xl rounded-2xl">
  <div className="mb-4">
    <Label className="text-sm font-medium text-gray-400" htmlFor="id">Mint ID</Label>
    <Input
      id="id"
      type="number"
      value={tokenId}
      className="mt-1 w-full p-2 text-black rounded-lg"
      onChange={(e) => setTokenId(Number(e.target.value))}
      min="1"
      step="1"
    />
  </div>

  <div className="mb-4">
    <Label className="text-sm font-medium text-gray-400" htmlFor="castText">Cast Text</Label>
    <textarea
      id="castText"
      value={castText}
      onChange={(e) => setCastText(e.target.value)}
      className="mt-1 w-full p-3 h-72 text-black rounded-lg border border-gray-300 focus:ring focus:ring-purple-500"
      style={{ whiteSpace: "pre-wrap" }}
    />
  </div>

  <div className="p-4 rounded-xl bg-white text-black shadow-md">
    <div className="space-y-2">
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          value={highlight}
          checked={url === highlight}
          onChange={(e) => setUrl(e.target.value)}
          className="accent-purple-600"
        />
        <span>Highlight</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="radio"
          value={openSea}
          checked={url === openSea}
          onChange={(e) => setUrl(e.target.value)}
          className="accent-purple-600"
        />
        <span>OpenSea</span>
      </label>
    </div>
  </div>
</div>

<div className="w-full max-w-lg flex flex-col items-center mt-6 space-y-3">
  <button
    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 rounded-lg shadow-lg transition-all"
    onClick={() => sdk.actions.openUrl(shareUrlData)}
  >
    Cast Manually
  </button>
</div>
</div>
    );
  }

}
