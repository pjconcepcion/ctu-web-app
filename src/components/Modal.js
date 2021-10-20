import { Component } from "react";
import './Styles.css';


export default class Update extends Component{
    constructor(props){
        super(props);
        this.state = {
            genres: [],
            title: this.props.book.title,
            author: this.props.book.author,
            genre: this.props.book.genre,
            description: this.props.book.description,
            borrowerName: ''
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/book/'+ this.props.book.id)
            .then(response => {return response.json()})
            .then(data => this.setState({book: data[0]}))
            .catch(err => console.log(err));
    }

    updateBook = (e) => {
        fetch('http://localhost:5000/book/'+ this.props.book.id + '/update', {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
            .then(response => alert('Book updated'))
            .catch(err => console.log(err));
    }

    borrowBook = (e) => {
        fetch('http://localhost:5000/book/'+ this.props.book.id + '/borrow', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
            .then(response => alert('Book borrwed'))
            .catch(err => console.log(err));
    }

    displayModal = () => {
        switch (this.props.type){
            case 'isUpdate': return (
                <form onSubmit={this.updateBook}>
                    <h2> Update book Information </h2>
                    <div className="detail-container">
                        <label>Title: </label>
                        <input type="text" required onChange={(e) => this.setState({title: e.target.value})} value={this.state.title}/>
                    </div>
                    <div className="detail-container">
                        <label>Author: </label>
                        <input type="text" required onChange={(e) => this.setState({author: e.target.value})} value={this.state.author}/>
                    </div>
                    <div className="detail-container">
                        <label>Genre: </label>
                        <input type="text" required onChange={(e) => this.setState({genre: e.target.value})} value={this.state.genre}/>
                    </div>
                    <div className="detail-container">
                        <label>Description: </label>
                        <input type="text" onChange={(e) => this.setState({description: e.target.value})} value={this.state.description}/>
                    </div>
                    <div className="detail-container">
                        <label>Maximum quantity: </label>
                        <label>{this.props.book.max_qty}</label>
                        <label>Books borrowed: </label>
                        <label>{this.props.book.borrowed}</label>
                    </div>
                    <div className="center-item">
                        <button type="submit" className="btn-green">Update</button>
                        <button className="btn-red" onClick={this.props.removeBookDetails}>Close</button>
                    </div>
                </form>
            );
            case 'isBorrow': return (
                <form onSubmit={this.borrowBook}>
                    <h2> Borrow a book </h2>
                    <div className="detail-container">
                        <label>Title: </label>
                        <label>{this.state.title}</label>
                    </div>
                    <div className="detail-container">
                        <label>Author: </label>
                        <label>{this.state.author}</label>
                    </div>
                    <div className="detail-container">
                        <label>Quantity left: </label>
                        <label>{this.props.book.max_qty - this.props.book.borrowed}</label>
                    </div>
                    <div className="detail-container">
                        <label>Borrwer's Name: </label>
                        <input type="text" required onChange={(e) => this.setState({borrowerName: e.target.value})}/>
                    </div>
                    <div className="center-item">
                        <button type="submit" className="btn-green">Borrow</button>
                        <button className="btn-red" onClick={this.props.removeBookDetails}>Close</button>
                    </div>
                </form>
            )
        }
    }

    render(){
        return (
            <div className="modal">
                <div className="center-item">
                    {this.displayModal()}
                </div>
            </div>
        )
    }
}