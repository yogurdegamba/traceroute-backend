import express from "express"
import cors from "cors"
import { execFile } from "child_process"
import { promisify } from "util"
//const execFileAsync = promisify(execFile) //para poder poner await y esperar los datos json que da la api sin que se ralle la funcion callback de execfile
const app = express()
app.set("trust proxy", true)  //Para que de la ip del visitante y no el proxy
app.use(cors())

app.get("/api/traceroute", (req, res) => {
    const ipVisitante = query.ip;
  const host = req.query.host;
  const ipVisitante = req.ip
  if (!host || !(/^[a-zA-Z0-9.-]+$/.test(host || ""))){
    res.status(400).send("Solicitud inválida por error de sintaxis")
  }else{
    Exec(host,res,ipVisitante);
  }
})

app.listen(3001, () => {
  console.log("Servidor escuchando en http://localhost:3001")
})


<<<<<<< HEAD
const Exec = (host, res,ip) => {
    execFile("traceroute", [host], async (error, stdout, stderr) => {
    if (error) {
        console.log("ERROR:", error)
        console.log("STDERR:", stderr)
        res.status(500).send(stderr)
    }else{
        const lineas = stdout.split("\n")
        console.log(lineas)
        const ips =[]
        let ips_validas =[]
        for (let i=0; i<lineas.length; i++){
            ips[i] = lineas[i].match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)
        }
        ips_validas = ips.filter(element => element!==null) //function(element) {return element!== null}
        console.log(ips_validas)
        console.log(ips_validas[1][0])
        const resultados = [ip]
        for (let i=0; i<ips_validas.length; i++){
            const mapeo = await fetch(`http://ip-api.com/json/${ips_validas[i][0]}`)
            const datos = await mapeo.json()
            resultados.push(datos)
        }
        const resultadosValidos = resultados.filter(resultado => resultado.status === "success")
        res.json(resultadosValidos)
        console.log(resultadosValidos)
    }
    })

}

