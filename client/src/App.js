import React, { useState } from 'react';
import "./App.css"

import {gql} from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {useMutation} from "@apollo/client";


const GetBook = gql`query GetBook($id: ID!) {
    getBook(id: $id) {
        id
        title
        description
        author {
            id
            firstName
            lastName
        }
    }
}`

const GetAllBooks = gql`query GetAllBooks {
    getAllBooks {
        id
        title
    }
}`
const AddBook55555 = gql`
    mutation addBook($book: BookInput){
        addBook(book: $book){
            id
            title
            description
            author {
                        firstName
                        lastName
                    }
        }
    }
 `



function SingleBook(props) {
    const { data, loading } = useQuery(GetBook,{
        variables: {
            id: props.id
        }
    });


    return <div className={"podrobnee"}>
        <h3>Подробнее</h3>
        {loading ? <h2>Loading...</h2> :
         <div className="single">
            <div> книга: {data.getBook.title}</div>
            <div> описание: {data.getBook.description}</div>
            <div> автор: {data.getBook.author.firstName + " " + data.getBook.author.lastName}</div>
        </div>
        }
    </div>
}

function AddBookC(props) {
    const [text1,setText1] = useState("")
    const [text2,setText2] = useState("")
    const [text3,setText3] = useState("")
    const [text4,setText4] = useState("")
    const [addBook2] = useMutation(AddBook55555)

    const addB =  async  () =>{
        let data = await addBook2({
            variables: {
                book: {
                    title: text1,
                    description: text2,
                    author: {
                        firstName: text3,
                        lastName: text4
                    }
                }
            }
        })
        console.log(data)
    }

    return <div>
        <div className="addWindow">
            <p>Название книги</p>
            <input value={text1} onChange={e => setText1(e.target.value)} type="text"/>
            <p>Описание книги</p>
            <input value={text2} onChange={e => setText2(e.target.value)} type="text"/>
            <p>Имя автора</p>
            <input value={text3} onChange={e => setText3(e.target.value)} type="text"/>
            <p>Фамлия автора</p>
            <input value={text4} onChange={e => setText4(e.target.value)} type="text"/>
        </div>
        <span onClick={addB} className="button">добавить книгу</span>
    </div>
}

export default () => {
    const { data, loading } = useQuery(GetAllBooks,{pollInterval: 500});
    const [idBook,setIdBook] = useState(0)
    const [adds,setAdds] = useState(false)

  return (
      <div>
          <h2>Список книг</h2>
          <div className="list">
              {loading ? <h1>Loading...</h1> :  data.getAllBooks.map(e => <div onClick={() => setIdBook(e.id) } key={e.id} >{e.title}</div>
              )   }
          </div>


          {idBook > 0 &&
          <SingleBook id={idBook} />
          }
            <span onClick={() => setAdds(!adds)} className="add">
                 добавление
            </span>
          {adds && <AddBookC />}
      </div>
  );
};