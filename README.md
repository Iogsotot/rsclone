# Kingdom Rush clone

## Task 
https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md

## Технологии

### Phaser 3

Игровой движок Phaser 3. Лично для меня это стало огромным открытием — это невероятно мощный и одновременно удобный инструмент для создания игр любой направленности. К нему идёт хорошая документация (https://photonstorm.github.io/phaser3-docs/index.html) , есть уже упомянутый выше каталог примеров (labs.phaser.io ), есть живое комьюнити в дискорде (https://discord.gg/uVbfwuMy), в котором, судя по нику(photonstorm), отвечает сам создатель движка даже на тривиальные вопросы.

К недостаткам могу отнести только не самую продуманную библиотеку типов для TS, из-за чего использование Phaser 3 в связке с TS порой превращается в мучение.

### TypeScript

TypeScript — если вы делаете большой проект и вас не один человек, то он нужен. Это способ отследить баги до того, как вы задеплоите проект, а если правильно настроить конфиги и линтер, то ошибку даже физически совершить будет очень трудно. Надо понимать каждую строчку написанного тобой кода (это и плюс, но и минус в плане скорости разработки).

### Node.js 
Представляет среду выполнения кода на JavaScript, которая построена на основе движка JavaScript Chrome V8, который позволяет транслировать вызовы на языке JavaScript в машинный код. 
Нами она была выбрана, тк весь наш проект на JS.

### Express

Express использует модуль http, но вместе с тем предоставляет ряд готовых абстракций, которые упрощают создание сервера и серверной логики, в частности, обработка отправленных форм, работа с куками, CORS.

Стандартный фреймворк для создания REST API на Node.js

### Mongo

MongoDB — документоориентированная система управления базами данных, не требующая описания схемы таблиц. Считается одним из классических примеров NoSQL(structured query languages)-систем, использует JSON-подобные документы и схему базы данных.

Мы её выбрали за JSON-подобные документы, которые легко читаются как человеком, так и машиной, и представленной в монго формат BSON который оптимизирован по скорости, пространству и гибкости, это идеальное современное сочетание выбора.

### Mongoose

Mongoose представляет специальную ODM-библиотеку (Object Data Modelling) для работы с MongoDB, которая позволяет сопоставлять объекты классов и документы коллекций из базы данных.
Это удобная и популярная библиотека для работы с mongo, понравилось с ней работать.

### eslint, webpack, scss
Фоорматтер, сборщик и препроцессор - чтобы код был един для всех, собран в один бандл и проще было наводить стили

