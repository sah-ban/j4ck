"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  // FrameNotificationDetails,
 type Context,
} from "@farcaster/frame-sdk";
import Link from 'next/link';
import Image from 'next/image';

export default function DemoN(
  { title }: { title?: string } = { title: "See Who Joined Around You" }

) {
  const [context, setContext] = useState<Context.FrameContext>();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const [isCasted, setIsCasted] = useState(false);
  const [isTipped, setIsTipped] = useState(false);


  const handleCast = () => {
    cast(today, count);
    setIsCasted(true);
  };
  const handleTip = () => {
    tip(typedAllo, typedHash);
    setIsTipped(true);
  };
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

  interface Metadata {
    title: string;
    description?: string;
    image?: string; // ✅ Updated: image as string
    url: string;
  }
  let count: number = new Date().getDate()+ 503

  const TodaysMint = `https://highlight.xyz/mint/base:0x3595491A2ecD658Ab249AcBd15F649b1D2B7cb3a:9c9d6dd7e82d0217d6aee15dbabc223b/t/${count}`; // 🔗 Replace with your desired URL
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


    const fetchMetadata = async () => {
      setLoading(true);
      setError(null);
      setMetadata(null);

      try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(TodaysMint)}`);
        const data = await res.json();
        if (data.status === 'success') {
          setMetadata({
            title: data.data.title,
            description: data.data.description,
            image: data.data.image?.url || data.data.image, // ✅ Handle both object and string cases
            url: data.data.url,
          });
        } else {
          setError('Failed to fetch metadata. Please check the URL.');
        }
      } catch (err) {
        setError('An error occurred while fetching metadata.');
      } finally {
        setLoading(false);
      }
    };

    
 

  function getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
  }
  
  
  // Declare a variable outside so it can be updated
  let today = getFormattedDate();

  const cast = useCallback((today: string, count: number) => {
    try {
       fetch(`/api/cast?today=${today}&count=${count}`);
  
    } catch (err) {
      console.error("Error sendinding DC from warpcast", err);
    }
  }, []);
  interface ReplyResponse {
    allowance: string;
    hash: string;
  }
  const [replyData, setReplyData] = useState<ReplyResponse | null>(null);

  const fetchReply = useCallback(async () => {
    try {
      const replyResponse = await fetch(`/api/replydata`);
      if (!replyResponse.ok) {
        throw new Error(`Fid HTTP error! Status: ${replyResponse.status}`);
      }
      const replyResponseData = await replyResponse.json();

      if (
        replyResponseData &&
        typeof replyResponseData.allowance === "string" &&
        typeof replyResponseData.hash === "string"
      ) {
        setReplyData({
          allowance: replyResponseData.allowance,
          hash: replyResponseData.hash,
        });
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (err) {
      console.error("Error fetching points data", err);
    }

}, []);

const tip = useCallback((allo: string, hash: string) => {
  try {
     fetch(`/api/tip?allo=${allo}&hash=${hash}`);

  } catch (err) {
    console.error("Error sendinding DC from warpcast", err);
  }
}, []);

useEffect(() => {
  fetchMetadata();
    fetchReply()

}, []);

const sendDC = `https://warpcast.com/~/inbox/create/268438?text=Hey! `;

const typedAllo=replyData?.allowance || "1";
const typedHash=replyData?.hash || "0xe5dd593ceddcad16f031c7f7cf29ebc1599dfa35";


  
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
    return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 ">
<h1 className="text-2xl font-bold mb-4 text-center text-white">Todays Mint</h1>

<div className="p-3  mx-3 max-w-xl mx-auto shadow-lg rounded-2xl bg-[#20142c] text-white">

<p className="text-sm font-bold">{today}</p>
<p className="text-sm font-bold mb-4">Type: Video</p>
<p className="text-sm font-bold">1 of 1</p>
<p className="text-sm font-bold mb-4">0.00321e</p>



      {loading && <p className="text-center text-gray-500">Fetching metadata...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {metadata && (
        <div className="p-4 shadow rounded-lg border bg-gray-50">
          
          {metadata.image && (
            <img
              src={metadata.image}
              alt="Website preview"
              className="rounded-xl mx-auto mb-4 shadow"
            />
          )}
          <h2 className="text-xm font-semibold mb-2 text-black">{metadata.title}</h2>
          <a
            href={metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-center block"
          >
            Verify
          </a>
        </div>
      )}
    </div>
    <div className="flex flex-row w-full p-3">
    <div
      className={`bg-[#8B5CF6] p-3 text-center mt-2 text-base font-semibold flex-1 items-center justify-center gap-2 ${
        isCasted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={!isCasted ? handleCast : undefined}
    >
      {isCasted ? "Casted" : "Cast"}
    </div>
   { replyData?.allowance &&  <div
      className={`bg-[#8B5CF6] p-3 text-center mt-2 ml-3 text-base font-semibold flex-1 items-center justify-center gap-2 ${
        isTipped ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={!isTipped ? handleTip : undefined}
    >
      {isTipped ? "Tipped" : "Tip"}
    </div>}
</div>
<div
  className="bg-[#8B5CF6] p-3 text-base font-semibold cursor-pointer text-white flex items-center justify-center gap-2"
  onClick={() => sdk.actions.openUrl(sendDC)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
  Send DC
</div>
</div>
    );
  }

}
