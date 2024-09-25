import express from 'express'
import axios from 'axios';
import {pool} from "./db.js";
const app=express();
app.use(express.json());
app.post('/crptoinsert',async (req,res)=>{
    try{
    //wazirx api call
const response=await axios.get('https://api.wazirx.com/api/v2/tickers');
//{destructure the resopnse into data}
const {data}=response;
//get top 10 data from it using object.keys and slice method 
const top10data=Object.keys(data).slice(0,10);
//loop over top10 data
for(let i of top10data){
    //again destrure
    const client = await pool.connect();
    const { name ,low , high , last , open , sell ,buy ,base_unit,volume}=data[i];
    const query=(`insert into crpto (name,last,buy,sell,volume,baseunit) values(
    '${name}','${last}','${buy}','${sell}','${volume}','${base_unit}'
    )`);

        await client.query(query);
        client.release();
}

    res.status(200).json({
        mesag:"DATA SAVE"
    })
}
catch(error){
    res.status(400).json({
        mesag:error
    })
}
});

app.listen(3000,()=>{
    console.log(`Server run on 3000`)
})