const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');


const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });

const schema = buildSchema(schemaString);

let allBooks = [
	{
		id: '1',
		title: 'Мстительница',
		description: 'Галактика видела, как рождаются и гибнут великие империи, как разрушаются и переделываются планеты.',
		author: {
			id: '1',
			firstName: 'Аластер',
			lastName: 'Рейнольдс'
		}
	},
	{
		id: '2',
		title: 'Задача трёх тел',
		description: 'В те времена, когда Китай переживал последствия жестокой «культурной революции», в ходе секретного военного проекта в космос были посланы сигналы, чтобы установить контакт с инопланетным разумом.',
		author: {
			id: '2',
			firstName: 'Лю',
			lastName: 'Цысинь'
		}
	},
	{
		id: '3',
		title: 'Пространство Откровения',
		description: 'Когда люди вышли в открытый космос и начали исследовать и осваивать другие планеты, они стремились найти другие цивилизации, которые обитают в Галактике.',
		author: {
			id: '1',
			firstName: 'Аластер',
			lastName: 'Рейнольдс'
		}
	}
];


const root = {
	getAllBooks: () => {
		return allBooks;
	},
	getBook: params => {
		return allBooks.find(({ id }) => params.id === id);
	},
	addBook: params => {

		let book_object ={
			id: String(allBooks.length + 1),
			title: params.book.title,
			description: params.book.description,
			author: {
				id: "3",
				firstName: params.book.author.firstName,
				lastName: params.book.author.lastName
			}}
		allBooks.push(
			book_object
		);

		return book_object;
	}
};


const app = express();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
);


app.listen(6006);

console.log('Running a GraphQL API server at http://localhost:6006/graphql' );
