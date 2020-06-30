import React from "react";



export class ModuleList extends React.Component {
  constructor(props) {
    super(props);
    this.handleFacultyChange = this.handleFacultyChange.bind(this);
    this.handleMajorChange = this.handleMajorChange.bind(this);
    this.handleSpecialisationChange = this.handleSpecialisationChange.bind(this);
    this.handleResidenceChange= this.handleResidenceChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  //when users pick their faculty, it sends the choice to app.js
  handleFacultyChange(e) {
    let value = e.target.value;
    let index = (e.target.selectedIndex - 1)
    this.props.onFacultyChange(value, index);
  }
  
  handleMajorChange(e) {
    let value = e.target.value;
    let index = (e.target.selectedIndex - 1)
    this.props.onMajorChange(value, index);
  }

  handleSpecialisationChange(e) {
    let value = e.target.value;
    this.props.onSpecialisationChange(value);
  }

  handleResidenceChange(e) {
    let value = e.target.value;
    this.props.onResidenceChange(value);
  }
  
  async handleSubmit(e){
    e.preventDefault();
    const request = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
        },
      body: JSON.stringify ({
        username: this.props.username,
        userCourse: { major: [{name: this.props.major,
                                spec: this.props.speialisation}],
                      minor: [],
                      residence: [this.props.residence]
                    }
        })
    };
    
    const response = await fetch('http://localhost:5000/', request)
        .then(async response => {
          const data = await response.json();
           // check for error response
           if (!response.ok) {
            // get error message from body or default to response status
            throw Error(data.message)
          }

          return data;
        })
        .then(data => console.log(data))

      .catch(error => {
        alert('nooope');
        console.error('There was an error!', error);
    });
  }

  render() {
      return (
       <div>
      <form onSubmit={this.handleSubmit}>
       <label>Your Faculty  </label>
       <select
          id="Faculty" 
          onChange={this.handleFacultyChange}>
            <option selected disabled>
              Choose Your Faculty
             </option>
           {this.props.facultyOptions}
        </select>   
        <br/>
        <br/>

        <label>Your Major  </label>
        <select
          id="Major"
          onChange={this.handleMajorChange}>
            (<option selected disabled>
              Choose Your Major
             </option>)
           { this.props.majorOptions }
        </select>
        <br/>
        <br/>

        <label>Your Specialisation  </label>
        <select
          id="Specialisation"
          onChange={this.handleSpecialisationChange}>
             (<option selected disabled>
              Choose Your Specialisation
             </option>)
           {this.props.specialisationOptions}
        </select>
        <br/>
        <br/>

        <label>Your Residential College  </label>
        <select
          id="Residence"
          onChange={this.handleResidenceChange}>
             (<option selected disabled>
              Choose Your Residence
             </option>)
           {this.props.residenceOptions}
        </select>
        <br/>
        <br/>

        <input 
          type="submit" 
          name="submit" 
          value="Create Module Plan" 
          className="btn btn-secondary"/>
        <br/>
        <br/>
      </form>
      </div>
      )}};


