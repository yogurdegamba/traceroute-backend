import express from "express"
import cors from "cors"
import { execFile } from "child_process"
import { promisify } from "util"
//const execFileAsync = promisify(execFile) //para poder poner await y esperar los datos json que da la api sin que se ralle la funcion callback de execfile
const app = express()
app.set("trust proxy", true)  //Para que de la ip del visitante y no el proxy
app.use(cors())

app.get("/api/traceroute", (req, res) => {
  const host = req.query.host;
  const ipVisitante = req.ip
  if (!host || !(/^[a-zA-Z0-9.-]+$/.test(host || ""))){
    res.status(400).send("Solicitud inválida por error de sintaxis")
  }else{
    Exec(res,ipVisitante);
  }
})

app.listen(3001, () => {
  console.log("Servidor escuchando en http://localhost:3001")
})


const Exec = async(res,ip) => {
    console.log(ip)
    const mapeo = await fetch(`http://ip-api.com/json/${ip}`)
    const ip_coordenadas = await mapeo.json()
    console.log(ip_coordenadas)
}

