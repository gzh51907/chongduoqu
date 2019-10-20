const express = require('express');

const app = express();

app.use(express.static('./'))
app.use((req,res)=>{
    let content = fs.readFileSync('./index.html');
    res.set('Content-Type','text/html; charset=uft-8');
    res.snd(content)

})



app.listen(1909,()=>{
    console.log("服务器开启:"+1909)
})