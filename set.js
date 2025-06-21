




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZ5bGwvT2Zvc210bUZBcXR5T0laMW93Zk5mUWdPV2pTMG4rYnorODQwVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWm9heW5mV2ZzTXhIbU1ndzRDMEEwQ0xFdTRaVUljbFc1OFJQWmlHT0hscz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QXFXL0NpL1gyUnBtcFNXTkFpTmxGejJQdWZTWDhlT1dIcGkwcTFTdFU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFcVB5Q0o2RnVXdnMvQ2lodTJqcVcvSkIvSDVDRkRJYkduZ0FVL0FqOHcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndETXltTUNMV1VjMWJTZGdXbzczMGRjOTZ3ZFJXOHVZZktUVldySm4ybm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVlVGxpdUd5T0txOEVSQzFsb0tRc3h3YnlTOXp2NDJxeDBCYlltbHgwR289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEhVc2drWTJmSUljUWNYT3psa2xxaUg2LzZDdzdWUkdUWmlweFNLcS9HZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVowWWNrb29OSFQ3d2lSNUR6NU44YktsR01jdkZ5bjgxNEl3dnpwbkVuND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRFN2pvRU1XeG05dkYzZmRkM1ZaK2xmVEJEZ2JOSlFEL0RadWljQXZsKzhzbUJRYW9NdXpCY3dDZHhpTnpNeVloVnBQMTU3LzdxZE5qSHV5KzJ1dUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM2LCJhZHZTZWNyZXRLZXkiOiJjMUtIdlBCMnk0Si9CY3JmUkZBeTYvT3hhSEExVlVLT0hkam9GQzNkZVE0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc1ODQ0MzExMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3QjM2NDg4RjI0MUM4QkQ2OTkyNzZCMkYxOUJFMEFDOCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwNTMyNjQwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NTg0NDMxMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzg1ODEyQjc1NjYwOERFRkEyNzUxMDdEMjUzRDUwQTgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDUzMjY0MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiOU4xQUpFNUIiLCJtZSI6eyJpZCI6IjI1NDc1ODQ0MzExMTo5N0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjExNzQ4MDgyNzY1ODI1MDo5N0BsaWQiLCJuYW1lIjoi4pye77iO4piF4Y6v4pi877iO4oSS4pi877iO4oSS4pyp4oSw4pyr4oSV4pmr4pig77iO77iOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOKzQ3ZE1FRUk2RTNNSUdHQ2tnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvMmxXQkN5b0ErVmZpZm9TNlQwbmFGbk4wVnAwL01qTWhVeVJPWUxRUWxNPSIsImFjY291bnRTaWduYXR1cmUiOiIzck1XMXBFV0dIaGE2cytoSldiY3lUUUUzQlE0bHpGYkxCNVovR1J2KzdlTkU4Y2JhTjdjTnBZbVNLeHZxRW1kMUYrL1FGSjV6dU5rYWRKaUJUckJBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoieUxIMnhNbEx3NEwwc0xVeDFac01RVU5sQU1qcEdHZ0theDdDRGw2a016M2VaTlhzL1R4M0Mrdk1wUFlpWnVKVEVYVE5JSFZGVXdTdmZEUXl6SUsxQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NTg0NDMxMTE6OTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZjlwVmdRc3FBUGxYNG42RXVrOUoyaFp6ZEZhZFB6SXpJVk1rVG1DMEVKVCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwNTMyNjM1LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUE2VyJ9',
    PREFIXE: process.env.PREFIX || "¶",
    OWNER_NAME: process.env.OWNER_NAME || "254758443111",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " ✞︎DƐ❥︎ŔƐ√ᎾĿƱŦᎾЯ☠︎︎",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/d0ZdtJSJ/file-1558.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
