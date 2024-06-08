# Запуск

Для запуска приложения потребуется:
- создать .env файл
- указать в нём переменные окружения:
    + MONGO_URL=[адрес базы данных mongodb]
    + MONGO_DB_NAME=[название базы]
    + MONGO_USERS_COLLECTION=[название коллекции с пользователями]
    + PORT=[порт для запуска приложения]

# Описание конечных точек API

## Пользователи

### [GET] /users - получение всех пользователей

- Тело ответа:

        [
            {
                "id": string,
                "name": string,
                "email": string,
                "age": int,
                "comments": [
                    {
                        "id": int,
                        "title": string,
                        "body": string
                    }, ...
                ]
            }, ...
        ]

- Пример запроса:

        fetch('http://localhost:5000/users').then(res => res.json())

- Пример ответа:

        [
            {
              id: 'b9a67743-378e-4434-8609-d73d6617ea5a',
              name: 'Eugen',
              email: 'eUgEn@mail.com',
              age: 30,
              comments: []
            },
            {
              id: 'beb1c2ee-575e-42d9-971e-e627551e9f1b',
              name: 'Artem',
              email: 'ortemka@yandex.ru',
              age: 20,
              comments: []
            }
        ]

### [GET] /users/sorted - получение пользователей, отсортированных по именам в алфавитном порядке

- Тело ответа:

        [
            {
                "id": string,
                "name": string,
                "email": string,
                "age": int,
                "comments": [
                    {
                        "id": int,
                        "title": string,
                        "body": string
                    }, ...
                ]
            }, ...
        ]

- Пример запроса:

        fetch('http://localhost:5000/users/sorted').then(res => res.json())

- Пример ответа:

        [
            {
              id: 'beb1c2ee-575e-42d9-971e-e627551e9f1b',
              name: 'Artem',
              email: 'ortemka@yandex.ru',
              age: 20,
              comments: []
            },
            {
              id: 'b9a67743-378e-4434-8609-d73d6617ea5a',
              name: 'Eugen',
              email: 'eUgEn@mail.com',
              age: 30,
              comments: []
            }
        ]

### [GET] /users/:id - получение пользователя по id

- Параметры:
    - id: string - идентификатор пользователя, информацию о котором нужно вывести

- Тело ответа:

        {
            "id": string,
            "name": string,
            "email": string,
            "age": int,
            "comments": [
                {
                    "id": int,
                    "title": string,
                    "body": string
                }, ...
            ]
        }

- Пример запроса:

        fetch('http://localhost:5000/users/beb1c2ee-575e-42d9-971e-e627551e9f1b').then(res => res.json())

- Пример ответа:

        {
          id: 'beb1c2ee-575e-42d9-971e-e627551e9f1b',
          name: 'Artem',
          email: 'ortemka@yandex.ru',
          age: 20,
          comments: []
        }

### [GET] /users/age/:age - получение пользователей, старше указанного возраста

- Параметры:
    - age: int - возраст, по которому будут определяться пользователи старше

- Тело ответа:

        [
            {
                "id": string,
                "name": string,
                "email": string,
                "age": int,
                "comments": [
                    {
                        "id": int,
                        "title": string,
                        "body": string
                    }, ...
                ]
            }, ...
        ]

- Пример запроса:

        fetch('http://localhost:5000/users/age/20').then(res => res.json())

- Пример ответа:

        {
            id: 'b9a67743-378e-4434-8609-d73d6617ea5a',
            name: 'Eugen',
            email: 'eUgEn@mail.com',
            age: 30,
            comments: []
        }

### [GET] /users/domain/:domain - получение пользователей с указанным доменом email

- Параметры:
    - domain: string - домен электронной почты (yandex, vk, mail и т. д.)

- Тело ответа:

        [
            {
                "id": string,
                "name": string,
                "email": string,
                "age": int,
                "comments": [
                    {
                        "id": int,
                        "title": string,
                        "body": string
                    }, ...
                ]
            }, ...
        ]

- Пример запроса:

        fetch('http://localhost:5000/users/domain/yandex').then(res => res.json())

- Пример ответа:

        {
            id: 'beb1c2ee-575e-42d9-971e-e627551e9f1b',
            name: 'Artem',
            email: 'ortemka@yandex.ru',
            age: 20,
            comments: []
        }

### [POST] /users - добавление пользователя

- Тело запроса: 

        {
            "name": string,
            "email": string,
            "age": int
        }

- Тело ответа:

        {
            "id": string,
            "name": string,
            "email": string,
            "age": int,
            "comments": [
                {
                    "id": int,
                    "title": string,
                    "body": string
                }, ...
            ]
        }

- Пример запроса: 

        fetch("http://localhost:5000/users", {
            method: "POST",
            body: JSON.stringify({
              name: "user",
              email: "user@mail.com",
              age: 30
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json());

- Пример ответа: 

        {
            id: '4985b66e-dfeb-463e-80c9-beb74af673d9',
            name: 'user',
            email: 'user@mail.com',
            age: 30,
            comments: []
        }

### [PUT] /users/:id - обновление пользователя по id 

- Параметры:
    - id: int - идентификатор пользователя, который будет обновлен

- Тело запроса: 

        {
            "name": string,
            "email": string,
            "age": int
        }

- Тело ответа:

        {
            "id": string,
            "name": string,
            "email": string,
            "age": int,
            "comments": [
                {
                    "id": int,
                    "title": string,
                    "body": string
                }, ...
            ]
        }

- Пример запроса: 

        fetch("http://localhost:5000/users/4985b66e-dfeb-463e-80c9-beb74af673d9", {
            method: "PUT",
            body: JSON.stringify({
              name: "user1",
              email: "user@yandex.ru",
              age: 30
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json());

- Пример ответа: 

        {
            id: '4985b66e-dfeb-463e-80c9-beb74af673d9',
            name: 'user1',
            email: 'user@yandex.ru',
            age: 30,
            comments: []
        }


### [DELETE] /users/:id - удаление пользователя по id

- Параметры:
    - id: int - идентификатор пользователя, который будет удален

- Пример запроса: 

        fetch("http://localhost:5000/users/4985b66e-dfeb-463e-80c9-beb74af673d9", {
            method: "DELETE"
        })

## Комментарии

### [GET] /users/:userId/comments - получение всех комментариев пользователя

- Параметры:
    - userId: int - идентификатор пользователя

- Тело ответа:

        [
            {
                "_id": string,
                "title": string,
                "body": string
            }, ...
        ]

- Пример запроса:

        fetch('http://localhost:5000/users/b1430ff3-6499-44e8-a6d8-314a986aa7ad/comments')
            .then(res => res.json())

- Пример ответа:

        [
            {
              _id: '1ec8255e-a708-4cf8-8977-57ad968298bc',
              title: 'comment #1',
              body: 'good comment'
            },
            {
              _id: 'c95f7965-ad89-4c8a-93f2-0ceb111cbd8f',
              title: 'comment #2',
              body: 'bad comment'
            }
        ]


### [GET] /users/:userId/comments/:commentId - получение комментария пользователя по id

- Параметры:
    - userId: int - идентификатор пользователя
    - commentId: int - Идентификатор комментария

- Тело ответа:

        {
            "_id": string,
            "title": string,
            "body": string
        }

- Пример запроса:

        fetch('http://localhost:5000/users/b1430ff3-6499-44e8-a6d8-314a986aa7ad/comments/c95f7965-ad89-4c8a-93f2-0ceb111cbd8f')
        .then(res => res.json())

- Пример ответа:

        {
            _id: 'c95f7965-ad89-4c8a-93f2-0ceb111cbd8f',
            title: 'comment #2',
            body: 'bad comment'
        }


### [POST] /users/:userId/comments - добавление комментария пользователю

- Параметры:
    - userId: int - идентификатор пользователя

- Тело запроса: 

        {
            "title": string,
            "body": string
        }

- Тело ответа:

        [
            {
                "_id": string,
                "title": string,
                "body": string
            }, ...
        ]

- Пример запроса:

        fetch("http://localhost:5000/users/b1430ff3-6499-44e8-a6d8-314a986aa7ad/comments", {
        method: "POST",
        body: JSON.stringify({
          title: "comment #3",
          body: "good comment ",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
        }).then(res => res.json())

- Пример ответа:

            [              
                {
                  _id: '1ec8255e-a708-4cf8-8977-57ad968298bc',
                  title: 'comment #1',
                  body: 'good comment'
                },
                {
                  _id: 'c95f7965-ad89-4c8a-93f2-0ceb111cbd8f',
                  title: 'comment #2',
                  body: 'bad comment'
                },
                {
                  _id: 'e542b45b-2649-4091-9a10-e17d1e97cbc9',
                  title: 'comment #3',
                  body: 'good comment '
                }
            ]


### [PUT] /users/:userId/comments/:commentId - изменения комментария по id

- Параметры:
    - userId: int - идентификатор пользователя
    - commentId: int - идентификатор комментария

- Тело запроса:

        {
            "title": string,
            "body": string
        }

- Тело ответа: 

        {
            "_id": string
            "title": string,
            "body": string
        }

- Пример запроса:

        fetch("http://localhost:5000/users/b1430ff3-6499-44e8-a6d8-314a986aa7ad/comments/c95f7965-ad89-4c8a-93f2-0ceb111cbd8f", {
        method: "PUT",
        body: JSON.stringify({
          title: "comment #2",
          body: "good comment ",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
        }).then(res => res.json())

- Пример ответа:

        {
            _id: 'c95f7965-ad89-4c8a-93f2-0ceb111cbd8f',
            title: 'comment #2',
            body: 'good comment '
        }


### [DELETE] /users/:userId/comments/:commentId - удаления комментария по id

- Параметры:
    - userId: int - идентификатор пользователя
    - commentId: int - идентификатор комментария

- Пример запроса:

        fetch("http://localhost:5000/users/b1430ff3-6499-44e8-a6d8-314a986aa7ad/comments/0dd4716a-3174-4841-95a6-911413732093", {
            method: "DELETE"});


 ## Валидация

 На запросы, которые имеют тело, предусмотрена базовая валидация - проверяется заполнения всех обязательных полей: name, email, age. Также проверяется корректность значений age (возможные значение от 1 до 150) и email (по регулярному выражению).

 - Пример запроса:

        fetch("http://localhost:5000/users", {
            method: "POST",
            body: JSON.stringify({
              name: "",
              email: "user%mail.com",
              age: -1
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
            }).then(res => res.json());


 - Пример ответа:

        {
            status: 400,
            message: 'name: field is empty; email: incorrect value; age: incorrect value'
        }

