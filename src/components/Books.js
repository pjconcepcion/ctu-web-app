import { Component } from 'react';
import {Link} from 'react-router-dom';
import Modal from './Modal';
import './Styles.css';

export default class Books extends Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            book: {
                id: '',
                title: '',
                author: '',
                genre: '',
                description: ''
            },
            isUpdate: false,
            isBorrow: false,
            isReturn: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/book/')
            .then(response => {return response.json()})
            .then(data => this.setState({books: data}))
            .catch(err => console.log(err));
    }

    getBooks = () => {
        return this.state.books.map(book => {
            return (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.description}</td>
                    <td>{book.max_qty - book.borrowed}</td>
                    <td>
                        <button className="btn-blue" onClick={() => this.viewBooks(book.id)}>View</button>
                    </td>
                    <td>
                        {(book.max_qty - book.borrowed) > 0?
                            <button className="btn-green" onClick={() => this.borrowBooks(book.id)}>Borrow</button> :
                            <label> Out of stock/s </label>                      
                        }
                    </td>                                    
                    <td>
                        <Link to={`${book.id}`}>
                            <button className="btn-grey">Return</button>
                        </Link>
                    </td>
                    <td>
                        <button className="btn-red" onClick={() => this.deleteBook(book.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    viewBooks = (id) =>{this.getBookDetails(id, 'isUpdate')}
    borrowBooks = (id) =>{this.getBookDetails(id, 'isBorrow')}

    getBookDetails = (id, modalType) => {
        fetch('http://localhost:5000/book/'+ id)
            .then(response => {return response.json()})
            .then(data => this.setState({book: data[0], isModalVisible: true, modalType}))
            .catch(err => console.log(err));
    }

    removeBookDetails = () => {
        this.setState({isModalVisible: false});
    }

    deleteBook = (id) => {
        fetch('http://localhost:5000/book/'+ id + '/delete',{method: 'PUT'})
            .then(response => {
                this.setState((state) => ({
                    books: state.books.filter(book => book.id != id)
                }));
            })
            .catch(err => console.log(err));
    }

    render(){
        return (
        <div className="center-item">
            <div id="book-list">
                <table className="text-align-l">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th colSpan={4}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getBooks()}
                    </tbody>
                </table>
            </div>
            <div>
                {this.state.isModalVisible &&
                    <Modal 
                        book={this.state.book}
                        removeBookDetails={this.removeBookDetails}
                        type={this.state.modalType}
                    />
                }
            </div>
        </div>
        );
    }
}