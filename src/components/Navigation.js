import { Component } from "react";
import {Link} from 'react-router-dom';
import Create from './Create';
import './Styles.css'

export default class Navigation extends Component {
    constructor(props){
        super(props)
        this.state={
            isAddVisible: false,
            isBorrowVisible: false
        }
    }

    onCloseAddModal = () => {
        this.setState({isAddVisible: false})
    }

    render(){
        return(
            <div>
                <div className="center-item">
                    <Link to='/'>
                        <button className="btn-grey">Home</button>
                    </Link>
                    <button className="btn-green" onClick={()=> this.setState({isAddVisible: true})}>Add book</button>
                </div>
                {this.state.isAddVisible &&
                    <Create 
                        onCloseModal={this.onCloseAddModal}
                    />
                }
            </div>
            
        )
    }
}