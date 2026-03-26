const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.get('/download', async (req, res) => {
const url = req.query.url;

if (!url) {
return res.send("No URL provided");
}

try {
const response = await fetch(`https://tikwm.com/api/?url=${url}`);
const data = await response.json();

```
if (!data.data || !data.data.play) {
  return res.send("Invalid video link");
}

const videoUrl = data.data.play;
const videoRes = await fetch(videoUrl);

res.setHeader('Content-Disposition', 'attachment; filename="tiktok.mp4"');
videoRes.body.pipe(res);
```

} catch (error) {
res.send("Error downloading video");
}
});

app.get('/', (req, res) => {
res.send("Server is running ✅");
});

app.listen(3000, () => console.log("Server running"));
