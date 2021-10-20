import { Component } from "react";
import './Styles.css';


export default class Create extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            genre: '',
            description: '',
            max_qty: 0
        }
    }

    addBook = (e) => {
        fetch('http://localhost:5000/book/add', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        })
            .then(response => alert('Book added'))
            .catch(err => console.log(err));
    }

    onChangeQty = (e) => {
        const qty = e.target.value;
        if(isNaN(qty) && qty >= 0){
            this.setState({max_qty: qty})
        }else{
            this.setState({max_qty: 0})
        }
    }


    render(){
        return (
            <div className="modal">
                <div className="center-item">
                    <form onSubmit={this.addBook}>
                        <h2> Add New book </h2>
                        <div className="detail-container">
                            <label>Title: </label>
                            <input type="text" required onChange={(e) => this.setState({title: e.target.value})}/>
                        </div>
                        <div className="detail-container">
                            <label>Author: </label>
                            <input type="text" required onChange={(e) => this.setState({author: e.target.value})}/>
                        </div>
                        <div className="detail-container">
                            <label>Genre: </label>
                            <input type="text" required onChange={(e) => this.setState({genre: e.target.value})}/>
                        </div>
                        <div className="detail-container">
                            <label>Description: </label>
                            <input type="text" onChange={(e) => this.setState({description: e.target.value})}/>
                        </div>
                        <div className="detail-container">
                            <label>Quantity: </label>
                            <input type="number" required onChange={(e) => this.setState({max_qty: e.target.value})} value={this.state.max_qty >=0? this.state.max_qty : 0}/>
                        </div>
                        <div className="center-item">
                            <button type="submit" className="btn-green">Create</button>
                            <button className="btn-red" onClick={this.props.onCloseModal}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}