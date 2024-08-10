# Algoritma Test

To run the algorithm test use this command in terminal:

```
node Algoritma-Test/FileName
```

note: Change Filename

# Backend Test

These test made using:

- Express js as framework
- Mongodb As Nosql Database
- API Docs Uisng Swagger UI

To run the backent test, you need several requirements there are:

- Node (v22.2.0)
- NPM (v10.7.0)
- MongoDB (v7.0.8)

## Run Program

To run this program, follow this method:

1. Inside folder "infrastructure/Database/libraryDB.zip", extract it.
2. Create new database in mongodb name it with "libraryDB"
3. Create Collection "members", "loan_books", and "books"
4. Import files that extracted to mongodb with mongodb compass "Add data -> insert json -> choose all files" each collection
5. Inside project repository, open command then type: "npm install"
6. Last but not least start the local server with command "npm start"

## See the swagger docs

To run swagger docs you can type "http://localhost:3000/api-docs"
