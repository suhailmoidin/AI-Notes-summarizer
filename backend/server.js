const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { execSync } = require('child_process'); // Use execSync for blocking execution

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/summarize', (req, res) => {
    try {
        const noteText = req.body.text;
        if (!noteText) {
            return res.status(400).json({ error: "Text is required" });
        }

        console.log("Received request:", noteText);

        // Synchronously execute Ollama
        const output = execSync(`ollama run deepseek-r1:1.5b " ${noteText}"`, { encoding: 'utf-8' });

        console.log("Ollama Output:", output.trim());

        res.json({ summary: output.trim() });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => console.log('Server running on port 5000'));
