const express = require('express');
const app = express();
const data = require('./user_modules/mysql.js');
const multer = require('multer');
const path = require('path');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, callback) => {
        callback(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo não suportado"), false);
    };
};
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite de 5MB
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public' + '/index.html');
});
app.get('/submit', (req, res) => {
    res.sendFile(__dirname + '/public/admin' + '/painel' + '/send_content.html');
});
app.get('/news/:id', (req, res) => {
    res.sendFile(__dirname + '/public' + '/news.html');
});
app.get('/api/news/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM news WHERE id = ?';
    data.online.query(query, [id], (error, results) => {
        if (error) {
            console.log('Error fetching the data');
        };
        res.json(results);
    });
});
// app.post('/submit', (req, res) => {
//     const title = req.body.title;
//     const content = req.body.content;
//     const querySend = 'INSERT INTO news (title, content) VALUES (?, ?)';
//     data.online.query(querySend, [title, content], (error, results) => {
//         if (error) {
//             console.log('Error sending the data');
//         };
//         res.redirect('/');
//     });
// });
app.post('/submit', upload.array("image", "main_image"), (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const main_title = req.body.main_title;
    const main_content = req.body.main_content;

    // Verifica se os arquivos foram enviados
    if (!req.files) {
        return res.status(400).json({ error: "Nenhuma imagem enviada!" });
    }

    // Insere os dados no banco de dados
    const querySend = 'INSERT INTO news (title, content, image, main_image, main_title, main_content) VALUES (?, ?, ?, ?, ?, ?)';
    data.online.query(querySend, [title, content, req.files[0].filename, req.files[1].filename, main_title, main_content], (error, results) => {
        if (error) {
            console.log('Erro ao enviar os dados:', error);
            return res.status(500).json({ error: "Erro ao salvar no banco de dados" });
        }
        res.redirect('/');
        console.log('Dados enviados com sucesso!');
    });
});

app.listen(3000, (error) => {
    if (error) {
        console.log('Error running the server');
    };
    console.log('Server is running on port 3000');
});
app.get('/api/index', (req, res) => {
    data.online.query('SELECT * FROM news', (error, results) => {
        if (error) {
            console.log('Error fetching the data');
        };
        res.json(results);
    });
});
data.online.connect((error) => {
    if (error) {
        console.log('Error connecting to the database');
    };
    console.log('Connected to the database');
});