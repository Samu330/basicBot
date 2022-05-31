const {
WAConnection,
MessageType,
Presence,
Mimetype,
GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const fs = require('fs')
const {y2mateA, y2mateV} = require('./lib/y2mate.js')
const yts = require('yt-search')
const samuGg = require('google-it')
const samuGgImg = require('g-i-s')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const bienvenida = JSON.parse(fs.readFileSync('./src/bienvenida.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
prefix = setting.prefix
blocked = []

function kyun(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;
}
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);

return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
}

async function starts() {
const samu330 = new WAConnection()
samu330.logger.level = 'warn'
console.log(banner.string)
samu330.on('qr', () => {
console.log(color('[','white'), color('!','red'), color(']','white'), color(' Porfavor escanea el codigo QR'))
})

fs.existsSync('./samu330.json') && samu330.loadAuthInfo('./samu330.json')
samu330.on('connecting', () => {
start('2', 'Connecting...')
})
samu330.on('open', () => {
success('2', 'Connected')
})
await samu330.connect({timeoutMs: 30*1000})
fs.writeFileSync('./samu330.json', JSON.stringify(samu330.base64EncodedAuthInfo(), null, '\t'))

samu330.on('group-participants-update', async (anu) => {
if (!bienvenida.includes(anu.jid)) return
try {
const mdata = await samu330.groupMetadata(anu.jid)
console.log(anu)
if (anu.action == 'add') {
num = anu.participants[0]
try {
ppimg = await samu330.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `Hola @${num.split('@')[0]}\nBienvenido al grupo *${mdata.subject}*`
let buff = await getBuffer(ppimg)
samu330.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
} else if (anu.action == 'remove') {
num = anu.participants[0]
try {
ppimg = await samu330.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `Adios @${num.split('@')[0]}👋`
let buff = await getBuffer(ppimg)
samu330.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}
})

samu330.on('CB:Blocklist', json => {
if (blocked.length > 2) return
for (let i of json[1].blocklist) {
blocked.push(i.replace('c.us','s.whatsapp.net'))
}
})

samu330.on('chat-update', async (sam) => {
try {
if (!sam.hasNewMessage) return
if (!sam.messages) return
if (sam.key && sam.key.remoteJid == 'status@broadcast') {
}
sam = sam.messages.all()[0]
sam.message = (Object.keys(sam.message)[0] === 'ephemeralMessage') ? sam.message.ephemeralMessage.message : sam.message
global.prefix
global.blocked
const content = JSON.stringify(sam.message)
const from = sam.key.remoteJid
const type = Object.keys(sam.message)[0]
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const time = moment.tz('America/Mexico_City').format('DD/MM HH:mm:ss')
const body = (type === 'conversation' && sam.message.conversation.startsWith(prefix)) ? sam.message.conversation : (type == 'imageMessage') && sam.message.imageMessage.caption.startsWith(prefix) ? sam.message.imageMessage.caption : (type == 'videoMessage') && sam.message.videoMessage.caption.startsWith(prefix) ? sam.message.videoMessage.caption : (type == 'extendedTextMessage') && sam.message.extendedTextMessage.text.startsWith(prefix) ? sam.message.extendedTextMessage.text : ''
budy = (type === 'conversation') ? sam.message.conversation : (type === 'extendedTextMessage') ? sam.message.extendedTextMessage.text : ''
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefix)


const q = args.join(' ')
const botNumber = samu330.user.jid
const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`]
const isGroup = from.endsWith('@g.us')
const sender = sam.key.fromMe ? samu330.user.jid : isGroup ? sam.participant : sam.key.remoteJid
const senderNumber = sender.split("@")[0]
const groupMetadata = isGroup ? await samu330.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const isBienvenida = isGroup ? bienvenida.includes(from) : false
const isOwner = ownerNumber.includes(sender)
const itsMe = senderNumber == botNumber
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}



const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? samu330.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : samu330.sendMessage(from, teks.trim(), extendedText, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "5219984907794@s.whatsapp.net" } : {})
},
message: {
"imageMessage": { "caption": `${body}`, 'jpegThumbnail': fs.readFileSync('./skull2.jpg')}}
}, contextInfo: {"externalAdReply": { "title": "꒰ ͜͡➸S̲̲̲̲̲̲̲̲̲̲̲̲̲̅̅̅̅̅̅̅̅̅̅̅̅̅a̲͇̲̲͇͇̲͇̲͇̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅m͇̭͇͇̭͇̭͇̭͇̭̅̿͆̈̅̿͆̈̅̅̿͆̈̿̅̿͆̈͆̅̿͆̈u̲͇̪̲̲͇̪͇̲͇̪̪̲͇̪̲͇̪͋🔥 NyanBot-V2🏹\n", "body": "[ ★ ] 山姆 330", "sourceUrl": `https://www.facebook.com/100046741523390/videos/464846715131937/`,
 "thumbnail": fs.readFileSync('./skull.jpg')}}, contextInfo: {"mentionedJid": memberr}})
}



const reply = async(teks) => {
samu330.sendMessage(from, teks, MessageType.text, {sendEphemeral: true, quoted:  { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"imageMessage": { "caption": `${body}`, 'jpegThumbnail': fs.readFileSync('./skull2.jpg')}}
}, contextInfo: {"externalAdReply": { "title": "꒰ ͜͡➸S̲̲̲̲̲̲̲̲̲̲̲̲̲̅̅̅̅̅̅̅̅̅̅̅̅̅a̲͇̲̲͇͇̲͇̲͇̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅m͇̭͇͇̭͇̭͇̭͇̭̅̿͆̈̅̿͆̈̅̅̿͆̈̿̅̿͆̈͆̅̿͆̈u̲͇̪̲̲͇̪͇̲͇̪̪̲͇̪̲͇̪͋🔥 NyanBot-V2🏹\n", "body": "[ ★ ] 山姆 330", "sourceUrl": `https://www.facebook.com/100046741523390/videos/464846715131937/`,
 "thumbnail": fs.readFileSync('./skull.jpg')}}})
}


const sendMess = (hehe, teks) => {
samu330.sendMessage(hehe, teks, text)
}

colors = ['red','white','black','blue','yellow','green']
const isMedia = (type === 'imageMessage' || type === 'videoMessage')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
	
const faud = {
key:
{ fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ?
{ remoteJid: "status@broadcast" } : {}) },
message: { "audioMessage": {"mimetype": "audio/mp4", "ptt": true, "seconds": -999999}}
}
contextInfo: {
mentionedJid: [sender]}
	
const fvid = {
key:
{ fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ?
{ remoteJid: "status@broadcast" } : {}) },
message: { "videoMessage": {"mimetype": "video/mp4", "seconds": -999999}}
}
contextInfo: {
mentionedJid: [sender]}	
	
	
const sendFileFromUrl = async(link, type, options) => {
hasil = await getBuffer(link)
samu330.sendMessage(from, hasil, type, options).catch(e => {
fetch(link).then((hasil) => {
samu330.sendMessage(from, hasil, type, options).catch(e => {
samu330.sendMessage(from, { url : link }, type, options).catch(e => {
reply('_[ ! ] Error al descargar el archivo_')
console.log(e)
})
})
})
})
}

const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
img = gam1
loc = {
"degreesLatitude": 0,
"degreesLongitude": 0,
"jpegThumbnail": img
}
mhan = await samu330.prepareMessage(from, img, location)
const buttonMessages = {
locationMessage: loc,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 6
}
samu330.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}


	
	
if (sam.message.buttonsResponseMessage){
test = sam.message.buttonsResponseMessage.selectedButtonId
if (test.includes(`@voz`)){
cancion = `${test.split('@')[0]}`

let plist = await yts(cancion)
imgCnc = await getBuffer(plist.all[0].image)
linkCnc = await y2mateA(plist.all[0].url)

sendFileFromUrl(linkCnc[0].link, audio, {quoted: faud, mimetype: 'audio/mp4', ptt: true, sendEphemeral: true, contextInfo: { externalAdReply: { title: `${plist.all[0].title}`, body: "🎁Da click Aqui para descargar el archivo al Dispositivo!", sourceUrl: `${linkCnc[0].link}`, thumbnail: imgCnc}}})
}
}
	
if (sam.message.buttonsResponseMessage){
test = sam.message.buttonsResponseMessage.selectedButtonId
if (test.includes(`@mp3`)){
cancion = `${test.split('@')[0]}`

let plist = await yts(cancion)
imgCnc = await getBuffer(plist.all[0].image)
linkCnc = await y2mateA(plist.all[0].url)

sendFileFromUrl(linkCnc[0].link, audio, {quoted: faud, mimetype: 'audio/mp4', fileName: `${plist.all[0].title} By Samu330✔`, sendEphemeral: true, contextInfo: { externalAdReply: { title: `${plist.all[0].title}`, body: "🎁Da click Aqui para descargar el archivo al Dispositivo!", sourceUrl: `${linkCnc[0].link}`, thumbnail: imgCnc}}})
}
}	
	
if (sam.message.buttonsResponseMessage){
test = sam.message.buttonsResponseMessage.selectedButtonId
if (test.includes(`@video`)){
cancion = `${test.split('@')[0]}`

let plist = await yts(cancion)
imgCnc = await getBuffer(plist.all[0].image)
linkCnc = await y2mateV(plist.all[0].url)

sendFileFromUrl(linkCnc[0].link, video, {quoted: fvid, mimetype: 'video/mp4', fileName: `${plist.all[0].title} By Samu330✔`, sendEphemeral: true, contextInfo: { externalAdReply: { title: `${plist.all[0].title}`, body: "🎁Da click Aqui para descargar el archivo al Dispositivo!", sourceUrl: `${linkCnc[0].link}`, thumbnail: imgCnc}}})
}
}
	
if (sam.message.buttonsResponseMessage){
test = sam.message.buttonsResponseMessage.selectedButtonId
if (test.includes(`gato`)){
rm = ['100', '101', '102', '200', '201', '202', '203', '204', '207', '300', '301', '302', '303', '304', '305', '308', '400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422', '423']
nk = rm[Math.floor(Math.random() * rm.length)]
let imGato = await getBuffer(`https://http.cat/${nk}`)
sendFileFromUrl(imGato, image, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "5219984907794@s.whatsapp.net" } : {})
},
message: {
"imageMessage": { "caption": `${body}`, 'jpegThumbnail': fs.readFileSync('./skull2.jpg')}}
}, contextInfo: {"externalAdReply": { "title": "꒰ ͜͡➸S̲̲̲̲̲̲̲̲̲̲̲̲̲̅̅̅̅̅̅̅̅̅̅̅̅̅a̲͇̲̲͇͇̲͇̲͇̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅m͇̭͇͇̭͇̭͇̭͇̭̅̿͆̈̅̿͆̈̅̅̿͆̈̿̅̿͆̈͆̅̿͆̈u̲͇̪̲̲͇̪͇̲͇̪̪̲͇̪̲͇̪͋🔥 NyanBot-V2🏹\n", "body": "[ ★ ] 山姆 330", "sourceUrl": `https://www.facebook.com/100046741523390/videos/464846715131937/`,
 "thumbnail": fs.readFileSync('./skull.jpg')}}, caption: `*${nk}*`})
}
}



switch(command) {

case 'dox':
mentioned = sam.message.extendedTextMessage.contextInfo.mentionedJid
samuM = '5219984907794'
if (!mentioned) return reply(`Etiqueta a una persona porfavor!`)		
mentions(`*Estimado Usuario @${mentioned.split('@')[0]}*\nUsted ah sido Doxeado!`, mentioned, true)
dox = await fetchJson(`https://randomuser.me/api/`)
let imgmDox = await getBuffer(dox.results.picture.medium)
sendButLocation(from, `_Doxeo realizado a las ${time}_
*🔎 Nombre:* ${dox.results.name.title} ${dox.results.name.first}
    Apellido: ${dox.results.name.last}
*🚥 Calle #* ${dox.results.location.street.number}
    Nombre de la Calle: ${dox.results.location.street.name}
*🛑 Ciudad:* ${dox.results.location.city}
    Estado: ${dox.results.location.state}
    Pais: ${dox.results.location.country}
    Codigo Postal: ${dox.results.location.postcode}
*📌 Cordenadas:* 
    Latitud: ${dox.results.location.coordinates.latitude}
    Longitud: ${dox.results.location.coordinates.longitude}
*🌐 Zona Horaria:* ${dox.results.location.timezone.offset}
    Descripcion: ${dox.results.location.timezone.description}
*📧 Correo electronico:* ${dox.results.email}
    Nombre de Usuario: ${dox.results.email.login.username}
    Contraseña: ${dox.results.email.login.password}
*📅 Fecha de Nacimiento:* ${dox.results.dob.date}
    Edad Actual: ${dox.results.dob.age}
*📝 Feacha de Registro:* ${dox.results.registered.date}
    Edad al Momento del Registro: ${dox.results.registered.age}
*📞 Telefono:* ${dox.results.phone}
*📱 Celular:* ${dox.results.cell}
*👤 Identificacion:* ${dox.results.id.name}
    Valor: ${dox.results.id.value}`, `_FakeDox By @${samuM.split('@')[0]}_`, imgmDox,
[{buttonId: `gato`, 
buttonText: {displayText: 'Cat images for HTTP status codes'}, 
type: 1},
{quoted: sam, contextInfo: {mentionedJid: [samuM], forwardingScore: 508, isForwarded: true, sendEphemeral: true}})
break

case 'musica':
case 'play':
if (!q) return reply('*Que audio quieres descargar?.....*')
let plist = await yts(q)
let imgm = await getBuffer(plist.all[0].image)
		
sendButLocation(from, `✍🏻Informacion de su Audio.
*🏹Subido hace* ${plist.all[0].ago}
*👀Vistas :* ${plist.all[0].views}
*⏳Duracion :* ${plist.all[0].timestamp}
*🌐Canal :* ${plist.all[0].author.name}
*📝Link del Canal :* ${plist.all[0].author.url}`, '*Selecciona el formato de descarga:*', imgm,		
[{buttonId: `${plist.all[0].title}@voz`, 
buttonText: {displayText: '[🎙] Nota de Voz'}, 
type: 1},
{buttonId: `${plist.all[0].title}@mp3`, 
buttonText: {displayText: '[🎶] Formato MP3'}, 
type: 1},
{buttonId: `${plist.all[0].title}@video`, 
buttonText: {displayText: '[📽] video'}, 
type: 1}],
{quoted: sam, contextInfo: { forwardingScore: 508, isForwarded: true, sendEphemeral: true}})	
break


case 'sider':
if (!isGroup) return reply('Solo disponible para grupos!')
infom = await samu330.messageInfo(from, sam.message.extendedTextMessage.contextInfo.stanzaId)
tagg = []
teks = `✅ Este Mensaje ah sido visto por:\n\n`
for(let i of infom.reads){
teks += '@' + i.jid.split('@')[0] + '\n'
teks += `📲 Hora: ` + moment(`${i.t}` * 1000).tz('America/Mexico_City').format('DD/MM/YYYY HH:mm:ss') + '\n\n'
tagg.push(i.jid)
}
mentions(teks, tagg, true)
break
		

case 'welcome':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length < 1) return reply(`*1 para activar y 0 para desactivar.*\nEjemplo: ${prefix}bienvenida 1`)
if (Number(args[0]) === 1) {
if (isBienvenida) return reply('La bienvenida ya ah estado activa!')
bienvenida.push(from)
fs.writeFileSync('./src/bienvenida.json', JSON.stringify(bienvenida))
reply('La binvenida se ah activado con exito ✔️')
} else if (Number(args[0]) === 0) {
bienvenida.splice(from, 1)
fs.writeFileSync('./src/bienvenida.json', JSON.stringify(bienvenida))
reply('La binvenida se ah desactivado con exito ✔️')
} else {
reply(`*1 para activar y 0 para desactivar.*\nEjemplo: ${prefix}bienvenida 1`)
}
break
	
case 'lirik':
case 'letra':
case 'letras':
if (args.length < 1) return reply('Escribe el nombre de la cancion')
samu330.updatePresence(from, Presence.composing)
if (!q) return reply('*Cual es el nombre de la cancion?*')
try {
anu = await fetchJson(`https://some-random-api.ml/lyrics?title=${q}`)
lyrics = `🥰Resultado de ${anu.title}:\n\n*Autor:* ${anu.author}\n\n____________________\n\n${anu.lyrics}\n\n🌬Link: ${anu.links.genius}`
sendFileFromUrl(anu.thumbnail.genius, image, {quoted: sam, caption: lyrics, sendEphemeral: true})
} catch {
reply('*_Error_*')
}
break
		
case 'ip':
ips = args.join(' ')
if (!q) return reply('Y la ip?')
ip = await fetchJson(`http://ip-api.com/json/${ips}`)
if(ip.status == 'fail') return reply('*ip incorrecta*')
reply('*Recopilando información.... Tiempo Aproximado:*\n```3 seconds```')
datos = `*🔍Ip:* _${ips}_
      *Latitud de ip*: ${ip.lat}
      *Longitud de ip*: ${ip.lon}
🌆 *País*: _${ip.country}_
      *Código de país*: ${ip.countryCode}
🏡 *Región*: _${ip.region}_
      *Nombre de región*: ${ip.regionName}
🏙️  *Ciudad*: _${ip.city}_
📚 *Código postal*: _${ip.zip}_
🕐 *Zona horaria*: _${ip.timezone}_
🌐 *Proveedor de servicios de Internet*:
_${ip.isp}_                                                                                                                                                                                                    
🕋 *Organización*: _${ip.org}_                                                                                                                                                                                  
_©${ip.as}™_`                            
samu330.sendMessage(from, datos, MessageType.text, {quoted: sam})
/*NO CAMBIAR DATOS NI NOMBRES*/samu330.sendMessage(from, { degreesLatitude: `${ip.lat}`, degreesLongitude: `${ip.lon}`, name: '📌Búsqueda por 🐉Samu330🐉', address : `${ip.city}`}, MessageType.liveLocation, {quoted : sam})
break
		
//Evaluar ecuaciones By Samu330
/**/case 'calc':
/**/global.math = global.math ? global.math : {}
/**/let ed = from
/**/if (ed in global.math) {
/**/clearTimeout(global.math[ed][3])
/**/delete global.math[ed]
/**/reply('Hmmm...y la ecuacion?')
/**/}
/**/let val = q
/**/.replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
/**/.replace(/×/g, '*')
/**/.replace(/÷/g, '/')
/**/.replace(/π|pi/gi, 'Math.PI')
/**/.replace(/e/gi, 'Math.E')
/**/.replace(/\/+/g, '/')
/**/.replace(/\++/g, '+')
/**/.replace(/-+/g, '-')
/**/let format = val
/**/.replace(/Math\.PI/g, 'π')
/**/.replace(/Math\.E/g, 'e')
/**/.replace(/\//g, '÷')
/**/.replace(/\*×/g, '×')
/**/try {
/**/console.log(val)
/**/let result = (new Function('return ' + val))()
/**/if (!result) throw result
/**/reply(`
           CALCULADORA
╭──╼┥𝈸𖾗ᷤ𖾕꯭ͣ𖾔꯭𖾔ͫ𖽙ͧ𝈹┝╾──╮
╽ ┌──────────┐ ┃
┃   *${format}*
┃ ├──────────┤ ┃
┃   *Resultado*:
┃ ├──────────┤ ┃
┃  _${result}_
╿ └──────────┘ ╿
╰─┨ ⃞📟 𝜍𝛼𝜄𝜍 📟⃞ ┠─╯`)
/**/} catch (e) {
/**/if (e == undefined) throw '?'
/**/throw 'Formato incorrecto, solo 0-9 y símbolo -, +, *, /, ×, ÷, π, e, (, ) son compatibles'
/**/}
/**/break

case 'google':
let buscar = args.join(' ')
if (!buscar) return reply('Que deseas buscar?')
let search = await samuGg({ query: buscar })
let ggsm = ``
for (let i of search) {
ggsm += `
*Titulo :* ${i.title}
*Link :* ${i.link}
*Contenido :* ${i.snippet}
`
}
var nyangg = ggsm.trim()
reply(`*🔍Busqueda realizada por* 🐉Samu330🐉\n\n${nyangg}`)
break
			
case 'imagen':
if (args.length < 1) return reply('Que deseas buscar?')
reply(`Porfavor espera un momento mientras busco imagenes de ` + args.join(' '))
ggimg = args.join(' ')
res = await samuGgImg(ggimg, google)
function google(error, result){
if (error){ return reply('_[ ! ] *Intentalo de nuevo*_')}
else {
var gugIm = result
var random =  gugIm[Math.floor(Math.random() * gugIm.length)].url
sendFileFromUrl(random, image, {quoted: sam, caption: `*🔍Busqueda de* _${ggimg}_\n*Realizada por 🐉Samu330🐉*`})
}
}
break


default:

}
} catch (e) {
console.log('Error : %s', color(e, 'red'))
}
})
}
starts()
