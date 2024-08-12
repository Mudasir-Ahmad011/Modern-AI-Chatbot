import { TextEffect } from "./components/TextEffect";
import { Bot } from "lucide-react";
export default function Home() {
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100vw",position:"relative",left:"50%",top:"50%",transform: "translate(-50%, -50%)",textAlign:"center",alignItems:"center", justifyContent:"center"}}>
    <Bot className="size-20 text-white"/>
   <div style={{width:"50vw",fontSize:"24px"}}>
    <TextEffect per='char' preset='fade'>
      Paste the URL of a webpage after the slash in this homepage URL,
       and then you can ask any question related to that page.
    </TextEffect>
   </div>
   </div>
  );
}
