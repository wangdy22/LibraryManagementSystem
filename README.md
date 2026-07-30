# LibraryManagementSystem

## Endpoints
- `POST /api/users/register` — `{ name, email, password }`
- `POST /api/users/login` — `{ email, password }`
- `POST /api/books/add` — `{ title, author }`
- `GET  /api/books/all`
- `GET  /api/books/search?title=abc`
- `POST /api/borrow/{userId}/{bookId}`
- `POST /api/borrow/return/{bookId}`
- `GET  /api/borrow/open`
