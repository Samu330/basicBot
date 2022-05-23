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
teks = `Halo @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*`
let buff = await getBuffer(ppimg)
samu330.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
} else if (anu.action == 'remove') {
num = anu.participants[0]
try {
ppimg = await samu330.getProfilePicture(`${num.split('@')[0]}@c.us`)
} catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
teks = `Sayonara @${num.split('@')[0]}👋`
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
sam = sam.messages.all()[0]
if (!sam.message) return
if (sam.key && sam.key.remoteJid == 'status@broadcast') return
if (sam.key.fromMe) return
global.prefix
global.blocked
const content = JSON.stringify(sam.message)
const from = sam.key.remoteJid
const type = Object.keys(sam.message)[0]
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
body = (type === 'conversation' && sam.message.conversation.startsWith(prefix)) ? sam.message.conversation : (type == 'imageMessage') && sam.message.imageMessage.caption.startsWith(prefix) ? sam.message.imageMessage.caption : (type == 'videoMessage') && sam.message.videoMessage.caption.startsWith(prefix) ? sam.message.videoMessage.caption : (type == 'extendedTextMessage') && sam.message.extendedTextMessage.text.startsWith(prefix) ? sam.message.extendedTextMessage.text : ''
budy = (type === 'conversation') ? sam.message.conversation : (type === 'extendedTextMessage') ? sam.message.extendedTextMessage.text : ''
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefix)

mess = {
wait: '⌛ Sedang di Prosess ⌛',
success: '✔️ Berhasil ✔️',
error: {
stick: '❌ Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ❌',
Iv: '❌ Link tidak valid ❌'
},
only: {
group: '❌ Perintah ini hanya bisa di gunakan dalam group! ❌',
ownerG: '❌ Perintah ini hanya bisa di gunakan oleh owner group! ❌',
ownerB: '❌ Perintah ini hanya bisa di gunakan oleh owner bot! ❌',
admin: '❌ Perintah ini hanya bisa di gunakan oleh admin group! ❌',
Badmin: '❌ Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❌'
}
}

const q = args.join(' ')
const botNumber = samu330.user.jid
const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
const isGroup = from.endsWith('@g.us')
const sender = isGroup ? sam.participant : sam.key.remoteJid
const groupMetadata = isGroup ? await samu330.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.jid : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender) || false
const isBienvenida = isGroup ? bienvenida.includes(from) : false
const isOwner = ownerNumber.includes(sender)
const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
const reply = (teks) => {
samu330.sendMessage(from, teks, text, {quoted:sam})
}
const sendMess = (hehe, teks) => {
samu330.sendMessage(hehe, teks, text)
}
const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? samu330.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : samu330.sendMessage(from, teks.trim(), extendedText, {quoted: sam, contextInfo: {"mentionedJid": memberr}})
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


	
	

switch(command) {


case 'musica':
if (!q) return reply('*Que audio quieres descargar?.....*')
let plist = await yts(q)
sendFileFromUrl(plist.all[0].image, image, {quoted: sam, caption: '_*Si no ves la lista de descarga de tu audio, prueba usando el comando play2*_'})

sendButLocation(from, `✍🏻Informacion de su Audio.
*🏹Subido hace* ${plist.all[0].ago}
*👀Vistas :* ${plist.all[0].views}
*⏳Duracion :* ${plist.all[0].timestamp}
*🌐Canal :* ${plist.all[0].author.name}
*📝Link del Canal :* ${plist.all[0].author.url}`, '*Selecciona el formato de descarga:*', `plist.all[0].image`,		
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


case 'welcome':
if (!isGroup) return reply(mess.only.group)
if (!isGroupAdmins) return reply(mess.only.admin)
if (args.length < 1) return reply('Hmmmm')
if (Number(args[0]) === 1) {
if (isBienvenida) return reply('Udah aktif um')
bienvenida.push(from)
fs.writeFileSync('./src/bienvenida.json', JSON.stringify(bienvenida))
reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
} else if (Number(args[0]) === 0) {
bienvenida.splice(from, 1)
fs.writeFileSync('./src/bienvenida.json', JSON.stringify(bienvenida))
reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
} else {
reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
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
