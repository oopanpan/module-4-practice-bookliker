import React, { useState, useEffect } from "react";
import axios from 'axios';
import SideMenu from './component/SideMenu'
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";
const booksURL = 'http://localhost:3000/books'
const usersURL = 'http://localhost:3000/users'
const currentUser = {"id":1, "username":"pouros"}

function App() {

  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState({})

  useEffect( () => {
    getAllBooks()
  },[selectedBook])

  const getAllBooks = async () =>{
    await axios.get(booksURL)
    .then(r => setBooks(r.data))
  }

  const selectBook = (book) => {
    setSelectedBook(book)
  }

  const renderUsers = () => selectedBook.users.map( user => <List.Item icon="user" content={user.username} />)

  const handleLike = () => {
    let updatedUsers
    const currentLikes = selectedBook.users.map(user=> user.id)
    if (!currentLikes.includes(currentUser.id)){
      updatedUsers = [...selectedBook.users, currentUser]
      console.log(updatedUsers)
    } else {
      updatedUsers = selectedBook.users.filter( user => user.id !== currentUser.id)
    }
    axios.patch(`${booksURL}/${selectedBook.id}`,{users: updatedUsers})
    .then(r => setSelectedBook(r.data))
  }

  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <SideMenu books={books} selectBook={selectBook}/>
        <Container text>
          <Header>{selectedBook.title ? selectedBook.title : 'Book title'}</Header>
          <Image
            src={selectedBook.img_url? selectedBook.img_url :"https://react.semantic-ui.com/images/wireframe/image.png"}
            size="small"
          />
          <p>{selectedBook.description ? selectedBook.description : 'Book description'}</p>
          <Button
            onClick={handleLike}
            disabled={selectedBook.title ? false : true}
            color="red"
            content="Like"
            icon="heart"
            label={{
              basic: true,
              color: "red",
              pointing: "left",
              content: selectedBook.users ? selectedBook.users.length : "2,048"
            }}
          />
          <Header>Liked by</Header>
          <List>
            {selectedBook.users ?
            renderUsers() :
            <List.Item icon="user" content="User name" />}
          </List>
        </Container>
      </main>
    </div>
  );
}

export default App;
