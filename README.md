# Верстка проекта #

Верстка проекта выполнена с учетом BEM методологии [https://ru.bem.info](https://ru.bem.info) при использовании сборщика GULP [http://gulpjs.com](http://gulpjs.com) проектов

## Файловая структура верстки ##

* blocks - BEM блоки
* xs - основной уровень переопределения и элементы страницы
* sm - уровень доопределения для планшетов
* md - уровень доопределения для стандартных экранов
* lg - уровень доопределения для широких экранов
* blocks/{BEMBLOCK}/{BEMBLOCK}.jade - шаблон блока
* blocks/{BEMBLOCK}/{BEMBLOCK}.json - данные блока
* blocks/data.json - временный файл со всеми данными для блоков
* node_modules - зависимости npm
* public - временная папка со сборкой страницы проекта
* gulpfile.js - задачи для gulp (сборщика верстки)
* webpack.config.js - конфиг сборки javascript модулей

### 1. Установка npm и зависимостей ###

[https://www.npmjs.com/package/npm](https://www.npmjs.com/package/npm) - должно быть установлено глобально, требует поддержки git команд в консоли, после корректной установки выполнить:

> npm install

### 2. Сборка проекта ###

[https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) - должен быть установлен глобально с помощью команды:

> npm install --g gulp

запуск сборки проекта, команда:

> gulp         - запуск в development режиме
> gulp -prod   - запуск в production режиме - без sourcemaps и с минификацией js кода

## Файл заданий gulpfile.js ##

Проект состоит из нескольких задач: default, server, build, html, css, images, js. Чтобы запустить конкретной задачу можно воспользоваться командой:

> gulp имя_задачи

Задачи css, images, js собираются в папку html/public

Подключаемые модули gulp подключены в самом верху файла

Конфигурация сборщика храниться в объекте params и содержит следующие переменные:

* out - папка для сборки (public)
* prod - путь для сборки для основного вебсайта
* htmlSrc - собираемый макет
* html - отслеживаемые pug и json файлы
* levels - уровни переопределения
* js - внешние js файлы
* css - внешние css файлы
* images - внешние файлы изображений
* type - типы распозноваемых файлов для заданий

### 1. Задача default ###

Запускает задачи server и build

### 2. Задача server ###

Подготоваливает компонент browserSync, открывает браузер и смотрит за изменениями в файлах заданий: html, css, images, js, при необоходимости перезагружает браузер

### 3. Задача build ###

Запускает задачи сборки проекта html, css, images, js

### 4. Задача html ###

Переименовывает собираемый макет params.htmlSrc и сохраняет в params.out

### 5. Задача css ###

Собирает указанные в params.css и params.type.css в файл с именем styles.css, сохраняет в params.out. Обрезает неиспользуемые классы стилей за исключением указанных в params.ignore (указывается либо регулярное выражение, либо css селектор)

### 6. Задача images ###

Собирает указанные в params.images и params.type.images, сохраняет в папку params.out/images

**Важно:** изображения с одинаковым именем перезаписываются

### 7. Задача js ###

Запускает сборку JavaScript модулей с помощью Webpack - попутно разрешает все зависимости, собирает в один файл с именем main.js, сохраняет в params.out

### 7. Задача jsLibs ###

Собирает указанные в params.js в файл с именем libs.js, сохраняет в params.out

### 8. Задача createAllBlocks ###

Создает файлы и папки ваших блоков в папки уровней переопределения блоков (блоки добавляются в виде строк в массив params.blocks)

### 9. Задача imgMin ###

Минифицирует изображения (можно использовать вместо таска images, если нужны минифицированные изображения). Собирает указанные в params.images и params.type.images, минифицирует и сохраняет в папку params.out/images

### 10. Задача sprite ###

Собирает svg-файлы из директории, указаной в params.sprite, в один svg-спрайт, сохраняет в params.out/images

### 11. Задача imagesToWebp ###

Преобразует файлы в директории params.type.imagesToWebp в изображения в формате webp, сохраняет в params.out/images. 

### 12. Задача imagesResize ###

Нарезает файлы в директории params.imagesToResizeDirectory по заданным в таске параметрам, сохраняет в params.out/images. Принимаются файлы только с расширением .jpg. 