import React from "react";

export class Table extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <table className="table table-dark table-hover">
                    <tbody>
                        <div>
                        {this.props.module}
                        {this.props.title === 'Total Modular Credits' && 
                         (<tr key="total">
                            <td>Total Module</td>
                            <td>{this.props.total + 'MCs'}</td>
                          </tr>)}
                        </div>
                    </tbody>

                </table>
            </div>
        )
    }
}




