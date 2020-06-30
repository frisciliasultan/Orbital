import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { ModuleList } from "./Components/ModuleList";
import { Dropdown } from './Containers/Dropdown';
import { Table } from './Components/Module Table';
import { Login, Register } from './Pages/Login/LoginPage'
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Nav } from "./Pages/navbar";


let totalGEMMCs = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      faculty: null,
      
      major: null,
      specialisation: null,
      residenceOptions: ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'],
      residence: 'N/A',
      dummyfac: [{'Business': [{'Business Administration': ['A', 'B']},
                                {'Accountancy': ['C', 'D']}]},
                {'FASS': [{'C': ['N/A']},
                          {'D': ['N/A']}]},
                {
                  'Computing': [
                                  {'Computer Science': ['N/A']},
                                  {'Business Analytics': ['N/A']}
                  ]
                }],
      dummymodules: [{GEMs:[
        {"GEH: Human Culture": [{code: 'GEH1001', 
                                name: 'Globalisation and New Media', 
                                MCs: 4, 
                                link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
                                {code: 'GEH1002', 
                                name: "Economic Issues in Dev World", 
                                MCs:2, 
                                link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
                                {code: 'GEH23420', 
                                name: 'lafjkljwe', 
                                MCs: 4, 
                                link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}]}, //end of first object member
        
        {"GES: Singapore Studies": [{code: 'GES324230', 
                                    name: 'adkfjkjfklasj', 
                                    MCs: 4, 
                                    link: 'asdfew'}]} //end of object 2
        ]},
        {coreModules: [
          {code: "MA1521",
           name: "Calculus for Computing",
           MCs: 4,
           link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
           {code: "MA1531",
           name: "Calculus not Computing",
           MCs: 4,
           link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
           {code: "MA1531",
           name: "Calculus not Computing",
           MCs: 4,
           link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}
          ]},
        {specialisationModules: [
          {code: "MA1531",
           name: "Calculus not Computing",
           MCs: 4,
           link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
           {code: "MA1531",
           name: "Calculus not Computing",
           MCs: 4,
           link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}
        ]},
        {unrestrictedModules: [{code: "MA1521",
      name: "Calculus for Computing",
      MCs: 4,
      link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
      ]}
      ],
      dummyrules: [{name: "ULR",
                    tag: "ULR_2018",
                    requirements: {"and": [{name: "Complete Quantitative Reasoning",
                                          tag: "GER",
                                          requirements: {"and": [
                                                                {name: "Complete GER1000",
                                                                 tag: "GER1000",
                                                                 module: {code: "GER1000",
                                                                          name: "Quantitative Reasoning",
                                                                          MCs: 4}
                                                                }
                                                              ]
                                                        }
                                            },

                                            {name: "Complete Human Culture",
                                             tag: "GEH",
                                             requirements: {"or": [{name: "Complete Globalisation and New Media",
                                                                    tag: "GEH1001",
                                                                  module: {code: "GEH1001",
                                                                           name: "Globalisation and New Media",
                                                                           MCs: 4}
                                                                    },
                                 
                                                                    {name: "Complete Economic Issues in Dev World",
                                                                     tag: "GEH1001",
                                                                     module: {code: "GEH1001",
                                                                              name: "Globalisation and New Media",
                                                                              MCs: 4}
                                                                             }
                                                                    ]
                                                            },
                                            }
                                          ]
                                    }
                    },

                   {name: "Core Modules",
                    tag: "Core Modules 2018",
                    requirement: {"and": [
                                          {name: "Computer Science Foundation",
                                           tag: "cs_foundation_2018",
                                           requirement: {"and": [
                                                                  {name: "Complete GER1000",
                                                                  tag: "GER1000",
                                                                  module: {code: "GER1000",
                                                                           name: "Quantitative Reasoning",
                                                                           MCs: 4}
                                                                  },

                                                                  {name: "Complete GER1000",
                                                                   tag: "GER1000",
                                                                   module: {code: "GER1000",
                                                                            name: "Quantitative Reasoning",
                                                                            MCs: 4}
                                                                  },

                                                                  {name: "Complete GER1000",
                                                                 tag: "GER1000",
                                                                 module: {code: "GER1000",
                                                                          name: "Quantitative Reasoning",
                                                                          MCs: 4}
                                                                },

                                                                {name: "Complete GER1000",
                                                                 tag: "GER1000",
                                                                 module: {code: "GER1000",
                                                                          name: "Quantitative Reasoning",
                                                                          MCs: 4}
                                                                }
                                                                ]
                                                        }
                                            },

                                           {name: "Computer Science Breadth and Depth",
                                           tag: "cs_foundation_2018",
                                           requirement: {"condition": {"at least": [{rule: "CS Focus Area"}, {MCs: 12, minLevel: 4000}]},
                                             
                                            "or": [ {name: "CS Focus Area",
                                                                   tag: "GER1000",
                                                                   requirement: { 
                                                                                  "or" : [
                                                                                            {
                                                                                              name: "Algorithms and Theory",
                                                                                              tag: "algorithms",
                                                                                              requirement: { "condition": {"at least": [{number: 3,
                                                                                                                                        level: "any"},
                                                                                                                                        {number: 1,
                                                                                                                                        level: 4000}
                                                                                                                                       ] 
                                                                                                                          },
                                                                                                              "or": [{name: "Ger1000",
                                                                                                                    tag: "GER1000",
                                                                                                                    module: {code: "GER1000",
                                                                                                                             name: "Quantitative Reasoning",
                                                                                                                             MCs: 4}
                                                                                                                            
                                                                                                                     },
                                                                                                                     {name: "Complete GER1000",
                                                                                                                      tag: "GER1000",
                                                                                                                      module: {code: "GER1000",
                                                                                                                              name: "Quantitative Reasoning",
                                                                                                                              MCs: 4}
                                                                                                                            
                                                                                                                     },
                                                                                                                     {name: "Complete GER1000",
                                                                                                                    tag: "GER1000",
                                                                                                                    module: {code: "GER1000",
                                                                                                                             name: "Quantitative Reasoning",
                                                                                                                             MCs: 4}
                                                                                                                            
                                                                                                                     },
                                                                                                                     {name: "Complete GER1000",
                                                                                                                    tag: "GER1000",
                                                                                                                    module: {code: "GER1000",
                                                                                                                             name: "Quantitative Reasoning",
                                                                                                                             MCs: 4}
                                                                                                                            
                                                                                                                     },
                                                                                                                     {name: "Complete GER1000",
                                                                                                                      tag: "GER1000",
                                                                                                                      module: {code: "GER1000",
                                                                                                                             name: "Quantitative Reasoning",
                                                                                                                             MCs: 4}
                                                                                                                              
                                                                                                                     },
                                                                                                                    ]
                                                                                                            }
                                                                                            }
                                                                                          ]
                                                                                        }
                                                                                      },
                                                                                      
                                                                      {name: "CP-coded",
                                                                       tag: "CP-coded",
                                                                       requirement: {"condition": {
                                                                                                    "at most": {MCs: 12, 
                                                                                                                minLevel: 4000}
                                                                                                  },
                                                                                      "or": [
                                                                                              {
                                                                                                name: "Complete GER1000",
                                                                                                                    tag: "GER1000",
                                                                                                                    module: {code: "GER1000",
                                                                                                                             name: "Quantitative Reasoning",
                                                                                                                             MCs: 4}
                                                                                              },

                                                                                              {
                                                                                                name: "Complete GER1000",
                                                                                                                    tag: "GER1000",
                                                                                                                    module: {code: "GER1000",
                                                                                                                             name: "Quantitative Reasoning",
                                                                                                                             MCs: 4}
                                                                                              }
                                                                                      ] 
                                                                                    }                        
                                                                      }
                                                          ]}
                                                    },

                                           {name: "Industrial Experience Requirement",
                                           tag: "cs_foundation_2018",
                                           requirement: {}},

                                           {name: "IT Professionalism",
                                           tag: "cs_foundation_2018",
                                           requirement: {}}
                    ]}},
                   {unrestrictedModules: {} }
                  ],
      
     summary: [{cat: "General Elective Module",
                MCs: 0},
                {cat: "Core Module",
                MCs: 0},
                {cat: "Specialisation Module",
                MCs: 0},
                {cat: "Unrestricted Module",
                MCs: 0}],
    grandTotal: 0,
    isLogginActive: true   //TEMPORARY

    }
    this.changeFaculty = this.changeFaculty.bind(this);
    this.changeMajor=this.changeMajor.bind(this);
    this.changeSpecialisation= this.changeSpecialisation.bind(this);
    this.changeResidence= this.changeResidence.bind(this);
    this.generateOptions =this.generateOptions.bind(this);
    this.makeTable = this.makeTable.bind(this);
    this.generateDropDown = this.generateDropDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countModule = this.countModule.bind(this);
    this.getDropdownMCs = this.getDropdownMCs.bind(this);
    this.changeState = this.changeState.bind(this);
    this.receiveModuleRules=this.receiveModuleRules.bind(this);
  }
  
  componentDidMount() {
    // Call our fetch function below once the component mounts
  this.callBackendAPI()
    .then(res => this.setState({ data: res.express })) // this data should be dummyfac and residence
    .catch(err => console.log(err));
  
  this.rightSide.classList.add('right');

  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
  const response = await fetch('http://localhost:5000/express_backend');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
  };

  //receive the choice of faculty from options.js and change state of faculty
  changeFaculty(value, index) {
    this.setState({
      faculty: value,
      facIndex: index,
      major: null
    });
  }

  changeMajor(value, index) {
    this.setState({
      major: value,
      majorIndex: index
    });
  }

  changeSpecialisation(value) {
    this.setState({
      specialisation: value,
    });
  }
  changeResidence(value) {
    this.setState({
      residence: value,
    });
  }

  //turn array of choices into options dropdown
  generateOptions(choices) {
    let facIndex = this.state.facIndex;
  if(choices === 'faculty'){
    return this.state.dummyfac.map((obj) => {
      return (
      <option value={Object.keys(obj)}>
        {Object.keys(obj)}
      </option>
      );
    });
  } else if(choices === 'major') {
      if(this.state.faculty) {
    return this.state.dummyfac
           [facIndex]
           [this.state.faculty].map((obj) => {
                  return (
                    <option value={Object.keys(obj)}>
                      {Object.keys(obj)}
                    </option>
                  )
              }
    )}
  } else if(choices === 'specialisation') {
      if(this.state.major && this.state.faculty) {
      return this.state.dummyfac
             [facIndex]
             [this.state.faculty][this.state.majorIndex][this.state.major].map((item) => {
                  return (
                    <option>
                      {item}
                    </option>
                  )
                }    
      )}
  } else {
    return this.state.residenceOptions.map((obj) => {
      return (
      <option value={obj}>
        {obj}
      </option>
      );
    });
  }
}

  //takes in array of objects for modules and return a table
  makeTable(item, moduleCat, index) {
    if(item === 'summary') {
      return this.state.summary.map((module) => {
      const { cat, MCs } = module;
      return(
        <div>
          <tr key={cat}>
            <td>{cat}</td>
            <td>{MCs + 'MCs'}</td>
          </tr>
        </div>
      )
      }
    )}

    else{
    let propfunction;
      if (item === 'coreModule'){
        propfunction = this.state.dummymodules[1].coreModules;
      }
      else if(item === 'specialisation') {
        propfunction = this.state.dummymodules[2].specialisationModules;
      } 
      else if(item === 'unrestricted') {
        propfunction = this.state.dummymodules[3].unrestrictedModules;
      } 
      else {
        propfunction = this.state.dummymodules[0].GEMs[index][moduleCat]
      }

   return propfunction.map((module) => {
        const { code, name, MCs} = module
        const desc = name.replace(/ /g, '-');
        const link = `https://nusmods.com/modules/${code}/${desc}`
        if(item === 'GEM') {
          return (
            <div>
                <tr key={code} data-toggle="tooltip" 
                    title="Click row to select module, click on the module code for more information"
                    onClick={() => this.handleClick(code, name, MCs, moduleCat)}
                    >
                    <a href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none">
                    <td>{code}</td>
                    </a>
                    <td>{name}</td>
                    <td>{MCs + 'MCs'}</td>
                </tr>
            </div>
        )
        } else{
        return (
            <div>
                <tr key={code} >
                <a href={link} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="text-white text-decoration-none">
                    <td>{code}</td>
                    <td>{name}</td>
                    <td>{MCs + 'MCs'}</td>
                    </a>
                </tr>
            </div>
        )}
   })
  }
}

  generateDropDown() {
    let title;
    if(this.state.residence === 'N/A') {
      title = <h3>General Elective Modules</h3>;
    }  
      
      return (<div>
      {title}
      {this.state.dummymodules[0].GEMs.map((module, i) => {
        const GEMCat = Object.keys(module)[0]
        return (
        <div>
        <Dropdown cat={GEMCat}
          title={this.state.GEMTitle}
          moduleCat={this.state.moduleCat}
          MCTemp={this.state.MCTemp}
          sendData={this.getDropdownMCs}
          id={"GEM_" + i}
          target={"GEM_" + i}
        module={this.makeTable('GEM', GEMCat, i)} />
        </div>
        )
      })}
        </div>);

    
  
  }

  handleClick(code, name, MCs, moduleCat) {
    const title = code + ': ' + name;
    this.setState({GEMTitle: title,
                   MCTemp: MCs,
                    moduleCat: moduleCat});
  }

  countModule() {
    const GEMs = this.state.totalGEMMCs;
    const coreModules = this.state.dummymodules[1].coreModules.reduce((currentTotal, next) => {
      return currentTotal + next.MCs} , 0);
    const specialisationModules = this.state.dummymodules[2].specialisationModules.reduce((currentTotal, next) => {
      return currentTotal + next.MCs} , 0);
    const unrestrictedModules = this.state.dummymodules[3].unrestrictedModules.reduce((currentTotal, next) => {
      return currentTotal + next.MCs} , 0);
    const grandTotal = GEMs + coreModules + specialisationModules + unrestrictedModules;
      this.setState({summary: [{cat: "General Elective Module",
                               MCs: GEMs},
                              {cat: "Core Module",
                               MCs: coreModules},
                              {cat: "Specialisation Module",
                               MCs: specialisationModules},
                              {cat: "Unrestricted Module",
                               MCs: unrestrictedModules}],
                    grandTotal: grandTotal
                              });
      
    }
  
    getDropdownMCs(MCs) {
      totalGEMMCs += MCs
      this.setState({totalGEMMCs: totalGEMMCs}, () => this.countModule());
    }
  
    receiveModuleRules(rules) {
      this.setState({rules: rules});
    }
 
    changeState() {
      const { isLogginActive } = this.state;

      if (isLogginActive) {
        this.rightSide.classList.remove("right");
        this.rightSide.classList.add("left");
      } else {
        this.rightSide.classList.remove("left");
        this.rightSide.classList.add("right");
      }
      this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    }
    
  render() {
      const { isLogginActive } = this.state;
      const current = isLogginActive ? "Register" : "Login";
      const currentActive = isLogginActive ? "login" : "register";
       return (
         



       <div class="full-container">
         <div className="row">
          <h1 className="display-3 ml-4">
            Module Overview
          </h1>
        </div>

       <div className="row text-left ml-4"> 
          <ModuleList onFacultyChange={this.changeFaculty}
                   onMajorChange={this.changeMajor}
                   onSpecialisationChange={this.changeSpecialisation}
                   onResidenceChange={this.changeResidence}
                   facultyOptions={this.generateOptions('faculty')}
                   majorOptions={this.generateOptions('major')}
                   specialisationOptions={this.generateOptions('specialisation')}
                   residenceOptions={this.generateOptions('residence')}
                   username="abc" //need to change
                   major={this.state.major}
                   specialisation={this.state.specialisation}
                   residence={this.state.residence}
                   receiveModuleRules={this.receiveModuleRules}
                   />
        </div>

        <div className="row"> 





          <div className="col-lg col-md-4 col-sm-6">
              {this.generateDropDown()}
          </div>

          <div className="col-lg col-md-4 col-sm-6">
              <Table
                title="Core Modules"
                module={this.makeTable('coreModule')} />
          </div>

          <div className="col-lg col-md-4 col-sm-6">
            <Table 
              title="Specialisation Modules"
              module={this.makeTable('specialisation')} />
          </div>

          <div className="col-lg col-md-6 col-sm-6">
            <Table
                title="Unrestricted Electives"
                 module={this.makeTable('unrestricted')} />
          </div>


          <div className="col-lg col-md-6">
            <Table
              title="Total Modular Credits"
              module={this.makeTable('summary')}
              total={this.state.grandTotal}/>
          </div>

        </div>





        <div className="App"> 
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>

        </div>

   );
    }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};


export default App;