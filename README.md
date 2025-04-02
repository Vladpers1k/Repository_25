# Express + MongoDB у Docker

## 📌 Як запустити:

1. Встановіть [Docker](https://www.docker.com/get-started)
2. Клонувати репозиторій:
3. Запустити Docker-контейнери:
4. Відкрити у браузері:

## 🛠 Команди для керування контейнерами:

- Запустити: `docker-compose up -d`
- Зупинити: `docker-compose down`
- Переглянути контейнери: `docker ps`
- Переглянути логи: `docker-compose logs -f`
- Видалення контейнерів та очищення томів: `docker-compose down -v`
- Перегляд працюючих контейнерів: `docker ps`
- Перегляд логів контейнера додатку: `docker-compose logs -f app`
- Отримання доступу до MongoDB у контейнері: `docker exec -it <mongo-container-id> mongosh`

### Підключення до контейнера MongoDB

- docker exec -it mongo_container mongosh

### Використання бази даних studentDB

- use studentDB

### Додавання 5 документів

db.assignments.insertMany([

- { name: "Іван", subject: "Математика", score: 78 },
- { name: "Марія", subject: "Фізика", score: 85 },
- { name: "Петро", subject: "Хімія", score: 90 },
- { name: "Оксана", subject: "Математика", score: 88 },
- { name: "Андрій", subject: "Фізика", score: 82 }
  ])

### Запит: знайти всі документи, де score більше 80

- db.assignments.find({ score: { $gt: 80 } })

### Оновлення: збільшити score на 5 для студента, у якого бал менше 85

- db.assignments.updateOne({ score: { $lt: 85 } }, { $inc: { score: 5 } })

### Видалення студента з найнижчим балом

- db.assignments.find().sort({ score: 1 }).limit(1).forEach(doc => db.assignments.deleteOne({ \_id: doc.\_id }))

### Вивести тільки ім'я та бал студентів

- db.assignments.find({}, { \_id: 0, name: 1, score: 1 })

### Агрегація: середній бал за предметами (>75)

- db.assignments.aggregate([
  { $group: { _id: "$subject", averageScore: { $avg: "$score" } } },
  { $match: { averageScore: { $gt: 75 } } }
  ])
