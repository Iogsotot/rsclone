# Kingdom Rush clone

## Task 
https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md

## Team 

## Description

## Implemented features

### UI:
- [ ] Есть возможность управление приложением/игрой с клавиатуры или наличие более пяти hot keys (20 баллов) `пауза, выход, след. волна, выбор башни и тд`
- [ ] Есть возможность переключения 2 и более языков (10 баллов за каждый дополнительный язык, но не более 20 баллов) `надо подумать`
- [x] Есть хотя бы один модальный диалог (10 баллов) ```если доделаем модалку с выбором уровня```
- [ ] Реализован routing (без перезагрузки страницы приложения) (20 баллов)
- [ ] Возможность кастомизации приложения, настроек пользователя (20 баллов)  ```в нашем случае это должна быть громкость звука, сложности игры, можно добавить аватарку для отображения в статистике```
- [x] Реализовано 3+ анимации, для создания которых используются ключевые кадры или svg-анимация (20 баллов)
- [ ] Приложение выполнено в едином стиле, для стилизации используется Bootstrap/Material UI/Ant design/etc (20 баллов) ```у нас есть ui_set, поэтому если мы его добавим в игру, то да, этот пункт будет выполнен```
- [ ] Приложение работает на телефоне/планшете/PC (10 баллов за каждое дополнительное устройство)

### Работа игры:
- [ ] Действие игры происходит на разных уровнях, картах, локациях, **используются анимированные переходы между уровнями**, анимации победы, поражения (30 баллов) ```у нас нет переходов в явном виде - нужен прелоадер```
- [ ] Расширенные настройки звука/видео/графики. Уровни громкости, язык озвучивания, вкл/выкл отображение теней, частиц (20 баллов)
- [ ] **Есть статистика, которая отображает прогресс игры,** нанесенный урон, потраченное на игру время, процент выполнения задания или уровня etc (20 баллов)
- [ ] Написание логики для компьютерного противника (40 баллов) ```если под это подходит реализация стат противника и разные волны атак - то да, будет```
- [ ] *можно реализовать обучение на первом уровне*

## Технический стек:
- [x] Использован Canvas/WebGL/etc (20 баллов)
- [ ] Работа с Audio API (10 баллов)
- [ ] Есть не меньше двадцати Unit test (20 баллов)
- [x] Использован webpack (10 баллов)
- [ ] Сохранение и загрузка чего-либо с использованием Local storage (10 баллов)
- [x] Приложение/игра написанны на TypeScript (40 баллов) ```надо доделать конфиги и проверить всё ли корректно отрабатывает```
## Работа с кодом:
- [ ] Использован eslint, eslint-config-airbnb-base (10 баллов)  ```надо доделать конфиги и проверить всё ли корректно отрабатывает```
- [ ] Понятный, читаемый код. Имена переменных и функций отражают то что в них содержится/то что они делают. Функция выполняет одно действие. Повторение логики сведено к минимуму. (20 баллов) ```нужен рефакторинг кода```
## Back-end:
- [ ] Использован RESTful API (30 баллов)
- [ ] Подключение и работа с БД (30 баллов)
- [ ] Аутентификация (20 баллов)
- [ ] Приложение отображает какую-либо статистику/графики/таблицы, данные для которых получает от бекенда (20 баллов)
- [ ] Реализован nodejs и express, отдаёт корректные ответы, отдаёт HTTP ошибки с нормальными body, по которым можно понять, что произошло, пишет читаемые логи (40 балов)
