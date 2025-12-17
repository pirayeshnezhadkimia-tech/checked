
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

const port = 8080;


app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {


    const data = {
            "todos":[{"id":1,"name":"kimia" ,"isChecked":false },{"id":2,"name":"kimia 2" ,"isChecked":false }],
            "doing": [],
            "done" : []
        }
    
    app.get('/', (req, res) => {
        
        var title = "Express Test Title";
        var name = "Kimia Pirayesh Nezhad 22";
        var subtitle = "Amoot Soft";

        if(req.query.islost){
            data.todos[0].isChecked=true;
        }

        res.render('Main', { title, name, subtitle,data });
    })

    app.post('/todos', (req, res) => {
        // console.log(req.headers['content-type']);
        // console.log(req.body);

        res.json({ok:true});
    })
} catch (error) {

}

app.listen(port, () => {
    console.log('App Is Running on ', port);
})
