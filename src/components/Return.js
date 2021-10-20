import { Component } from 'react';
import Modal from './Modal';
import './Styles.css';

export default class Return extends Component{
    constructor(props){
        super(props);
        this.state = {
            borrowers: [],
            book: {}
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/book/' + this.props.match.params.id + '/borrower')
            .then(response => {return response.json()})
            .then(data => this.setState({borrowers: data}))
            .catch(err => console.log(err));

        
        fetch('http://localhost:5000/book/'+ this.props.match.params.id)
            .then(response => {return response.json()})
            .then(data => this.setState({book: data[0]}))
            .catch(err => console.log(err));
    }
    

    getBorrowers = () => {
        return this.state.borrowers.map(borrower => {
            return (
                <tr key={borrower.id}>
                    <td>{borrower.id}</td>
                    <td>{borrower.name}</td>
                    <td>{new Date(borrower.date_borrowed).toLocaleString()}</td>
                    <td>
                        <button className="btn-red" onClick={() => this.returnBook(borrower.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    returnBook = (id) => {
        fetch('http://localhost:5000/book/'+ this.props.match.params.id + '/borrower/'+id+'/delete',{method: 'PUT'})
            .then(response => {
                this.setState((state) => ({
                    borrowers: state.borrowers.filter(borrower => borrower.id != id)
                }));
            })
            .catch(err => console.log(err));
    }

    render(){
        return (
        <div className="center-item">
            <div id="book-list">
                <h2>{this.state.book.title}</h2>
                <p>by {this.state.book.author}</p>
                <p>{this.state.book.max_qty - this.state.borrowers.length} left</p>
                <table className="text-align-l">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Borrower's name</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.borrowers.length > 0? 
                            this.getBorrowers() : 
                            <td colSpan={4}>No borrowers</td>
                        }
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
