import React from 'react';
import { Menu } from "semantic-ui-react";

export default function SideMenu({books, selectBook}) {

  const renderTitle = () => (
    books.map(book => (<Menu.Item 
                          as={'a'} 
                          onClick={()=>selectBook(book)}
                        >
                            {book.title}
                      </Menu.Item>))
  )

  return (
    <Menu vertical inverted>
        {renderTitle()}
    </Menu>
  )
}
