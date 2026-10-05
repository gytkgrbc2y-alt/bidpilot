import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(express.json({limit:"5mb"}));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,"public")));

function extractJson(text){
  const m=text.match(/\{[\s\S]*\}/);
  if(!m) throw new Error("Model returned invalid JSON");
  return JSON.parse(m[0]);
}

app.post("/api/analyze", async (req,res)=>{
  try{
    const {company,profile,rfp}=req.body;
    if(!process.env.GEMINI_API_KEY) return res.status(503).json({error:"GEMINI_API_KEY is not configured"});
    const prompt=`You are BidPilot, an expert proposal/RFP analyst.
Return ONLY valid JSON with keys: requirements (array of strings), risks (array of strings), score (integer 0-100), brief (string).
Company: ${company}
Company profile: ${profile}
RFP:
${rfp}
Identify concrete requirements, deadlines/evidence gaps, disqualifiers, and a practical bid recommendation. Do not invent company capabilities.`;
    const url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key="+encodeURIComponent(process.env.GEMINI_API_KEY);
    const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
    const j=await r.json();
    if(!r.ok) throw new Error(j.error?.message||"Gemini request failed");
    const text=j.candidates?.[0]?.content?.parts?.[0]?.text||"";
    res.json(extractJson(text));
  }catch(e){res.status(500).json({error:e.message})}
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`BidPilot running on http://localhost:${port}`));