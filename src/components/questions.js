const tests = [
{
    test_id: 0,
    questions: [
        {
            category: "easy",
            correct_answer: "Неверно",
            incorrect_answers: ['Верно'],
            question: ' Если Вы вкладываете в банк на счёт $100 при ставке процента 7% годовых, то для увеличения этой суммы до $800 потребуется около 40 лет.',
            origin: "МОШ 2009"
        },    {
            category: "easy",
            correct_answer: 'Неверно',
            incorrect_answers: ['Верно'],
            question: 'По данным Росстата, среднемесячная заработная плата в России в 2016 году составила 35 369 рублей. Это значит, что половина населения России получала заработную плату ниже 35 369 рублей.',
            origin: "Региональный этап ВОШ 2018"
        },
        {
            category: "easy",
            correct_answer: "Неверно",
            incorrect_answers: ["Верно"],
            question: 'Кривая производственных возможностей показывает минимальные количества двух ресурсов, необходимые для производства экономического блага.',
            origin: 'Муниципальный этап (Москва) 2005'
        },
        
        {
            category: "easy",
            correct_answer: "Неверно",
            incorrect_answers: ["Верно"],
            question: 'Если у предпринимателя есть собственное помещение для офиса, то ему всегда выгоднее использовать его, а не брать в аренду другое, потому что использование своего помещения не влечет издержек.',
            origin: 'Региональный этап ВОШ 2013'
        },
        {        category: "easy",
            correct_answer: "Снизилась на 4%",
            incorrect_answers: ['Выросла на 4%',' Выросла на 2%','Снизилась на 2%'],
            question: "В связи с ростом цен на авиабилеты, цена и величина спроса на туристические путёвки изменились на 20%. Как изменилась выручка турфирмы?",
            origin: 'МОШ 2014'
        }
    ,
        {        category: "easy",
            correct_answer: '5',
            incorrect_answers: ['10', '15', '20', '25'],
            question: 'В месяц ученик 10 класса Василий П. может сделать 20 домашних заданий или посмотреть 30 фильмов, причем альтернативные издержки просмотра одного фильма постоянны. На текущий момент Василий уже посмотрел 10 фильмов и сделал 10 домашних заданий. Какое максимальное число фильмов он ещё может посмотреть?',
            origin: "Высшая проба 20162"
        },
        {        category: "easy",
            correct_answer: 'Верно',
            incorrect_answers: ['Неверно'],
            question: 'Кривая рыночного спроса строится по кривым индивидуального спроса путем их сложения по горизонтали.',
            origin: "Заключительный этап ВОШ 2000"
        },{        category: "easy",
            correct_answer: 'Верно',
            incorrect_answers: ['Неверно'],
            question: 'При равновесной цене для данных спроса и предложения продается максимально возможное количество товара.',
            origin: "Сибириада 2005"
    }
    , {     category: "easy",
            correct_answer: 'Никак',
            incorrect_answers: ['QS = 2P − 150 ', ' QS = 2P − 100', 'QS = 2P − 250'],
            question: 'Кривая предложения детских пальто описывается уравнением QS = 2P −200, где Р - цена в рублях. Правительство решило закупить для детей-сирот 50 пальто по цене 100 рублей. Как это скажется на предложении детских пальто?',
            origin: "Региональный этап ВОШ 2000"
    },
    {        category: "easy",
            correct_answer: '89',
            incorrect_answers: ['110', '7', '3','120'],
            question: 'В некоторой стране функция предложения на бананы имеет вид Qs = 7P + 40. Также известно, что функция спроса на некоторыйтовар линейна и при цене P = 10 величина спроса на него составляет 80, а при цене P = 30 снижается и равна 20. Тогда равновесный объём продаж товара равен:',
            origin: "Высшая проба 2019"
    }
    ]
},{
    test_id: 1,
    questions: [
        {        category: "easy",
            correct_answer: "Цены вырастут, а объём продаж снизится",
            incorrect_answers: ['Цены останутся на прежнем уровне, а объём продаж вырастет', 'Цены снизятся, а объём продаж возрастет', 'Цены вырастут, а объём продаж останется на прежнем уровне', 'Цены снизятся, а объём продаж останется на прежнем уровне'],
            question: 'Предположим, что одновременно выросли цены на картофель и снизились доходы населения. Какая из перечисленных ситуаций может реализоваться на рынке картофельных чипсов?',
            origin: "Сибириада 2011"
        },    {        category: "easy",
            correct_answer: 'уменьшением спроса на алюминий в мире',
            incorrect_answers: ['уменьшением объёмов экспорта алюминия из Российской Федерации', 'открытием новых месторождений бокситов', ' увеличением экспорта алюминия из стран Латинской Америки'],
            question: 'В 1996 году на мировом рынке цена и объём продаж алюминия уменьшились. Это могло быть вызвано',
            origin: "Заключительный этап ВОШ 1997"
        },
        {        category: "easy",
            correct_answer: "ПРОФИ!",
            incorrect_answers: ["Я с основы пацан", "че такое профи?", "Я между"],
            question: 'Вы профи или основа?',
            origin: 'ВЭШ 2007'
        },
        {        category: "easy",
            correct_answer: "Ответ.",
            incorrect_answers: ["не ответ", "и это не ответ?", "НЕ ответик"],
            question: 'Нажмите на ответ',
            origin: 'МОШ 2018'
        },
        {        category: "easy",
            correct_answer: "Снизилась на 4%",
            incorrect_answers: ['Выросла на 4%',' Выросла на 2%','Снизилась на 2%'],
            question: "В связи с ростом цен на авиабилеты, цена и величина спроса на туристические путёвки изменились на 20%. Как изменилась выручка турфирмы?",
            origin: 'МОШ 2014'
        }
    ,
        {        category: "easy",
            correct_answer: 'this is correct answer12',
            incorrect_answers: ['incorrect12', 'incorrect22', 'incorrect32'],
            question: 'where is the correct?2',
            origin: "Высшая проба 20162"
        },
        {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
        },{        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    , {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    },
    {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    ]
},
{
    test_id: 2,
    questions: [
        {        category: "easy",
            correct_answer: "MC",
            incorrect_answers: ['AVC', 'SRAS', 'LRAS'],
            question: 'Чему равен MR?',
            origin: "Школьный этап ВСОШ 2020"
        },    {        category: "easy",
            correct_answer: 'this is correct answer',
            incorrect_answers: ['incorrect1', 'incorrect2', 'incorrect3'],
            question: 'where is the correct?',
            origin: "Высшая проба 2016"
        },
        {        category: "easy",
            correct_answer: "ПРОФИ!",
            incorrect_answers: ["Я с основы пацан", "че такое профи?", "Я между"],
            question: 'Вы профи или основа?',
            origin: 'ВЭШ 2007'
        },
        {        category: "easy",
            correct_answer: "Ответ.",
            incorrect_answers: ["не ответ", "и это не ответ?", "НЕ ответик"],
            question: 'Нажмите на ответ',
            origin: 'МОШ 2018'
        },
        {        category: "easy",
            correct_answer: "Снизилась на 4%",
            incorrect_answers: ['Выросла на 4%',' Выросла на 2%','Снизилась на 2%'],
            question: "В связи с ростом цен на авиабилеты, цена и величина спроса на туристические путёвки изменились на 20%. Как изменилась выручка турфирмы?",
            origin: 'МОШ 2014'
        }
    ,
        {        category: "easy",
            correct_answer: 'this is correct answer12',
            incorrect_answers: ['incorrect12', 'incorrect22', 'incorrect32'],
            question: 'where is the correct?2',
            origin: "Высшая проба 20162"
        },
        {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
        },{        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    , {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    },
    {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    ]
},
{
    test_id: 3,
    questions: [
        {        category: "easy",
            correct_answer: "MC",
            incorrect_answers: ['AVC', 'SRAS', 'LRAS'],
            question: 'Чему равен MR?',
            origin: "Школьный этап ВСОШ 2020"
        },    {        category: "easy",
            correct_answer: 'this is correct answer',
            incorrect_answers: ['incorrect1', 'incorrect2', 'incorrect3'],
            question: 'where is the correct?',
            origin: "Высшая проба 2016"
        },
        {        category: "easy",
            correct_answer: "ПРОФИ!",
            incorrect_answers: ["Я с основы пацан", "че такое профи?", "Я между"],
            question: 'Вы профи или основа?',
            origin: 'ВЭШ 2007'
        },
        {        category: "easy",
            correct_answer: "Ответ.",
            incorrect_answers: ["не ответ", "и это не ответ?", "НЕ ответик"],
            question: 'Нажмите на ответ',
            origin: 'МОШ 2018'
        },
        {        category: "easy",
            correct_answer: "Снизилась на 4%",
            incorrect_answers: ['Выросла на 4%',' Выросла на 2%','Снизилась на 2%'],
            question: "В связи с ростом цен на авиабилеты, цена и величина спроса на туристические путёвки изменились на 20%. Как изменилась выручка турфирмы?",
            origin: 'МОШ 2014'
        }
    ,
        {        category: "easy",
            correct_answer: 'this is correct answer12',
            incorrect_answers: ['incorrect12', 'incorrect22', 'incorrect32'],
            question: 'where is the correct?2',
            origin: "Высшая проба 20162"
        },
        {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
        },{        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    , {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    },
    {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    ]
},
{
    test_id: 4,
    questions: [
        {        category: "easy",
            correct_answer: "MC",
            incorrect_answers: ['AVC', 'SRAS', 'LRAS'],
            question: 'Чему равен MR?',
            origin: "Школьный этап ВСОШ 2020"
        },    {        category: "easy",
            correct_answer: 'this is correct answer',
            incorrect_answers: ['incorrect1', 'incorrect2', 'incorrect3'],
            question: 'where is the correct?',
            origin: "Высшая проба 2016"
        },
        {        category: "easy",
            correct_answer: "ПРОФИ!",
            incorrect_answers: ["Я с основы пацан", "че такое профи?", "Я между"],
            question: 'Вы профи или основа?',
            origin: 'ВЭШ 2007'
        },
        {        category: "easy",
            correct_answer: "Ответ.",
            incorrect_answers: ["не ответ", "и это не ответ?", "НЕ ответик"],
            question: 'Нажмите на ответ',
            origin: 'МОШ 2018'
        },
        {        category: "easy",
            correct_answer: "Снизилась на 4%",
            incorrect_answers: ['Выросла на 4%',' Выросла на 2%','Снизилась на 2%'],
            question: "В связи с ростом цен на авиабилеты, цена и величина спроса на туристические путёвки изменились на 20%. Как изменилась выручка турфирмы?",
            origin: 'МОШ 2014'
        }
    ,
        {        category: "easy",
            correct_answer: 'this is correct answer12',
            incorrect_answers: ['incorrect12', 'incorrect22', 'incorrect32'],
            question: 'where is the correct?2',
            origin: "Высшая проба 20162"
        },
        {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
        },{        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    , {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    },
    {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    ]
},
{
    test_id: 5,
    questions: [
        {        category: "easy",
            correct_answer: "MC",
            incorrect_answers: ['AVC', 'SRAS', 'LRAS'],
            question: 'Чему равен MR?',
            origin: "Школьный этап ВСОШ 2020"
        },    {        category: "easy",
            correct_answer: 'this is correct answer',
            incorrect_answers: ['incorrect1', 'incorrect2', 'incorrect3'],
            question: 'where is the correct?',
            origin: "Высшая проба 2016"
        },
        {        category: "easy",
            correct_answer: "ПРОФИ!",
            incorrect_answers: ["Я с основы пацан", "че такое профи?", "Я между"],
            question: 'Вы профи или основа?',
            origin: 'ВЭШ 2007'
        },
        {        category: "easy",
            correct_answer: "Ответ.",
            incorrect_answers: ["не ответ", "и это не ответ?", "НЕ ответик"],
            question: 'Нажмите на ответ',
            origin: 'МОШ 2018'
        },
        {        category: "easy",
            correct_answer: "Снизилась на 4%",
            incorrect_answers: ['Выросла на 4%',' Выросла на 2%','Снизилась на 2%'],
            question: "В связи с ростом цен на авиабилеты, цена и величина спроса на туристические путёвки изменились на 20%. Как изменилась выручка турфирмы?",
            origin: 'МОШ 2014'
        }
    ,
        {        category: "easy",
            correct_answer: 'this is correct answer12',
            incorrect_answers: ['incorrect12', 'incorrect22', 'incorrect32'],
            question: 'where is the correct?2',
            origin: "Высшая проба 20162"
        },
        {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
        },{        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    , {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    },
    {        category: "easy",
            correct_answer: 'this is correct answer122',
            incorrect_answers: ['incorrect122', 'incorrect222', 'incorrect322'],
            question: 'where is the correct?22',
            origin: "Высшая проба 201622"
    }
    ]
}
]

export default tests;