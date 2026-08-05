const fs = require('fs');
const path = 'c:/Users/thein/OneDrive/Desktop/regen-power-website/portfolio-data.ts';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/"System Size":\s*"[^"]+",\s*/g, '');
fs.writeFileSync(path, content, 'utf8');
console.log('System Size cleaned!');
