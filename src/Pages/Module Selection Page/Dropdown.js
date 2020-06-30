import React from "react";


export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: this.props.cat,
            open: false,
            title: this.props.cat,
            prevMCs: 0,
            currentMCs: 0,
        }
        this.toggle = this.toggle.bind(this);
        this.getMCs=this.getMCs.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.moduleCat === prevState.cat){ 
            if(nextProps.MCTemp === prevState.currentMCs) {       
          return {
                  title: nextProps.title,
                  };
                }
            else {
                return {
                    title: nextProps.title,
                    prevMCs: prevState.currentMCs,
                    currentMCs: nextProps.MCTemp,
                };
            }
        }
        else {return null};
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevState.currentMCs !== this.state.currentMCs) {
            this.getMCs(this.state.currentMCs);
        }
      }

    toggle() {
        this.setState({open: !this.state.open})
    }

    getMCs() {
         this.props.sendData(this.state.currentMCs - this.state.prevMCs);
    }

    render(){
        return(
        <div>
        <button type="button" 
                class="btn btn-dark" 
                data-toggle="tooltip" title="Click to expand list and select a module"
                onClick={() => this.toggle()}
                >
                    <h5>{this.state.title}</h5>
        </button>

            {this.state.open && (
                <table className="table table-dark table-hover">
                    <tbody onClick={() => this.setState({open: false})}>
                        {this.props.module}
                    </tbody>
                </table>)
                } 
    
        
        </div>
        
        )
    }
}

  
  