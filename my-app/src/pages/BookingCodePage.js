import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import Button from 'react-bootstrap/Button';
import history from './../history';

export default class BookingCodePage extends Component {

    state = {

    }

    getDetails() {

    }

    render() {
        return (
            <React.Fragment>
                <h1>Booking Code Page!</h1>
                <div className="textboxes">

                    <QRCode
                        value={"http://picturesofpeoplescanningqrcodes.tumblr.com/"}
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
                </div>
                <Button variant="primary" onClick={() => history.push({ pathname: '/' })}>Home</Button>

            </React.Fragment >
        );
    }
}