import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import Button from 'react-bootstrap/Button';
import history from './../history';

export default class BookingCodePage extends Component {

    componentDidMount(){
        this.setState({bookingCode:history.location.state.booking_id});
        console.log(history.location.state.booking_id);
      
    }
    

    state = {
        bookingCode: 0,
    }


    render() {
        return (
            <React.Fragment>
                
                <h1 className="BookingCodePage">Ihr Buchung war erfolgreich!</h1>
                <h2>Hier ist ihr QRCode!</h2>

                <div className="QRCode">

                    <QRCode
                        value={"this.state.bookingCode"}
                        size={128}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        imageSettings={{
                            src: "https://static.zpao.com/favicon.png",
                            x: null,
                            y: null,
                            height: 24,
                            width: 24,
                            excavate: true,
                        }}
                    />
                    <p>{this.state.bookingCode}</p>
                </div>
                
                <Button variant="primary" onClick={() => history.push({ pathname: '/' })}>Home</Button>
               
            </React.Fragment >
        );
    }
}