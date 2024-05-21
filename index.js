const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
    ctx.reply('Привет, я бот USDF! Выбери /info для получения списка учасников на сайте')
})
bot.command('info', (ctx) => {
    ctx.reply('Загружаю информацию...')

    const url = 'https://usdf.com.ua/json.php'

    try {
        fetch (url)
        .then(response => response.json())
        .then(data => {
           
            ctx.reply('Учасников на сайте: '+ data.length)
            let list = '';
            data.forEach(value => {
                list += `${value.name}|${value.style}|${value.category}|${value.liga}|${value.nomination}| Клуб: ${value.club}\n`
                
            });
            ctx.reply(list)
        }).catch (() => {
           
            ctx.reply('Учасники не найдены ')
        } )
    } catch(e) {
        console.log(e)
    }
})
bot.help((ctx) => ctx.reply('Введите /info для получения списка'))
 
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
//
//