import { ragChat } from "../lib/rag-chat";
import { redis } from "../lib/redis";
import ChatWrapper from "../components/ChatWrapper";
import { cookies } from "next/headers";

interface PageProps {
    params:{
        url:string | string[] | undefined
    }
}

function ReconstructedURL({url}:{url:string[]}){
  const decodedComponents = url.map((component)=>decodeURIComponent(component));

  return decodedComponents.join("/");

}

const page = async ({params}:PageProps) => {
  const sessionCookie = cookies().get("sessionId")?.value
  const reconstructedURL = ReconstructedURL({url: params.url as string[]});
  
  const sessionId = (reconstructedURL + "--" + sessionCookie).replace(/\//g,"")
  const isAlreadyIndexed = await redis.sismember("Indexed-urls",reconstructedURL);

  const initialMessages = await ragChat.history.getMessages({amount:10,sessionId})

  if(!isAlreadyIndexed){
    await ragChat.context.add({
      type:"html",
      source:reconstructedURL,
      config:{chunkOverlap:50,chunkSize:200}
    })
  }
  
  await redis.sadd("Indexed-urls",reconstructedURL);
 
  return (
    <>
    <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
    </>
  )
}

export default page
