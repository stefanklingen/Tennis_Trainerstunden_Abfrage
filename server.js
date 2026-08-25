const express=require("express");
const path=require("path");
const {createClient}=require("@supabase/supabase-js");

const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

const supabase=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);
const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD;

function admin(req,res,next){
  if(!ADMIN_PASSWORD || req.headers["x-admin-password"]!==ADMIN_PASSWORD)
    return res.status(401).json({error:"Nicht autorisiert."});
  next();
}

app.get("/api/appointments",async(req,res)=>{
  const {data,error}=await supabase.from("appointments").select("*").order("date").order("time");
  if(error)return res.status(500).json({error:error.message});
  res.json(data);
});

app.post("/api/responses",async(req,res)=>{
  const name=String(req.body?.name||"").trim();
  const noNeed=!!req.body?.noNeed;
  const appointmentIds=Array.isArray(req.body?.appointmentIds)
    ? [...new Set(req.body.appointmentIds.map(Number).filter(Number.isInteger))]:[];

  if(!name)return res.status(400).json({error:"Bitte einen Namen eingeben."});
  if(!noNeed&&!appointmentIds.length)
    return res.status(400).json({error:"Bitte mindestens einen Termin auswählen oder 'Kein Bedarf' wählen."});

  const {data:response,error}=await supabase.from("responses")
    .insert({name,no_need:noNeed}).select().single();
  if(error)return res.status(500).json({error:error.message});

  if(appointmentIds.length){
    const rows=appointmentIds.map(appointment_id=>({response_id:response.id,appointment_id}));
    const r=await supabase.from("response_slots").insert(rows);
    if(r.error)return res.status(500).json({error:r.error.message});
  }
  res.json({ok:true});
});

app.get("/api/admin/results",admin,async(req,res)=>{
  const a=await supabase.from("appointments").select("*").order("date").order("time");
  const r=await supabase.from("responses").select("id,name,no_need,created_at,response_slots(appointment_id)").order("name");
  if(a.error||r.error)return res.status(500).json({error:(a.error||r.error).message});
  const responses=(r.data||[]).map(x=>({...x,appointment_ids:(x.response_slots||[]).map(s=>s.appointment_id)}));
  res.json({appointments:a.data||[],responses});
});

app.post("/api/admin/appointments",admin,async(req,res)=>{
  const {date,time,label}=req.body||{};
  if(!date||!time)return res.status(400).json({error:"Datum und Uhrzeit fehlen."});
  const {data,error}=await supabase.from("appointments").insert({date,time,label:String(label||"").trim()}).select().single();
  if(error)return res.status(500).json({error:error.message});
  res.json(data);
});

app.delete("/api/admin/appointments/:id",admin,async(req,res)=>{
  const id=Number(req.params.id);
  await supabase.from("response_slots").delete().eq("appointment_id",id);
  const {error}=await supabase.from("appointments").delete().eq("id",id);
  if(error)return res.status(500).json({error:error.message});
  res.json({ok:true});
});

app.delete("/api/admin/responses/:id",admin,async(req,res)=>{
  const id=Number(req.params.id);
  await supabase.from("response_slots").delete().eq("response_id",id);
  const {error}=await supabase.from("responses").delete().eq("id",id);
  if(error)return res.status(500).json({error:error.message});
  res.json({ok:true});
});

app.get("/admin",(req,res)=>res.sendFile(path.join(__dirname,"public/admin.html")));

app.listen(process.env.PORT||10000,"0.0.0.0",()=>console.log("Tennis-Terminabfrage gestartet"));
