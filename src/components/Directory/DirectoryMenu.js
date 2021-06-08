import React from 'react'
import Directory from './Directory';
import {Link} from 'react-router-dom';
import "./DirectoryMenu.scss";

class DirectoryMenu extends React.Component {
    constructor() {
      super();
  
      this.state = {
        sections: [
          {
            title: 'hats',
            imageUrl: 'https://media.gq.com/photos/5a04f9a398002d2e253679f5/master/pass/fall-hats-gq-style-0816-01-1.jpg',
            id: 1
          },
          {
            title: 'jackets',
            imageUrl: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlrZXIlMjBqYWNrZXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
            id: 2
          },
          {
            title: 'sneakers',
            imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
            id: 3
          },
          {
            title: 'womens',
            imageUrl: 'https://centralandme.com/wp-content/uploads/2018/08/brand-womens-ethnic-bg.jpg',
            size: 'large',
            id: 4
          },
          {
            title: 'mens',
            imageUrl: 'https://i.pinimg.com/736x/15/6b/5c/156b5cc5c7cfa051704d2c350463b080.jpg',
            size: 'large',
            id: 5
          }
        ]
      };
    }
  
    render() {
      return (
        <div className='directory-menu'>
          {this.state.sections.map(({ title, imageUrl, id, size }) => (
            <Directory key={id}  title={title} imageUrl={imageUrl} size={size} />
          ))}
        </div>
      );
    }
  }
  
  export default DirectoryMenu;
