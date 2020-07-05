import React, { useEffect } from "react";
import { Dropdown } from './Dropdown';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "is-empty";
import { generateObject } from "../../utils/commonFunctions";

let totalGEMMCs = 0;

export const ModuleSelectionPage = (props) => {
          // data: null,
          // faculty: null,
          
          // major: null,
          // specialisation: null,
          // residenceOptions: ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'],
          // residence: 'N/A',
          // dummyfac: [{'Business': [{'Business Administration': ['A', 'B']},
          //                           {'Accountancy': ['C', 'D']}]},
          //           {'FASS': [{'C': ['N/A']},
          //                     {'D': ['N/A']}]},
          //           {
          //             'Computing': [
          //                             {'Computer Science': ['N/A']},
          //                             {'Business Analytics': ['N/A']}
          //             ]
          //           }],
          // dummymodules: [{GEMs:[
          //   {"GEH: Human Culture": [{code: 'GEH1001', 
          //                           name: 'Globalisation and New Media', 
          //                           MCs: 4, 
          //                           link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
          //                           {code: 'GEH1002', 
          //                           name: "Economic Issues in Dev World", 
          //                           MCs:2, 
          //                           link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
          //                           {code: 'GEH23420', 
          //                           name: 'lafjkljwe', 
          //                           MCs: 4, 
          //                           link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}]}, //end of first object member
            
          //   {"GES: Singapore Studies": [{code: 'GES324230', 
          //                               name: 'adkfjkjfklasj', 
          //                               MCs: 4, 
          //                               link: 'asdfew'}]} //end of object 2
          //   ]},
          //   {coreModules: [
          //     {code: "CS1231",
          //      name: "Discrete Structures",
          //      MCs: 4,
          //      link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
          //      {code: "MA1101",
          //      name: "Linear Algebra I",
          //      MCs: 4,
          //      link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
          //      {code: "MA1521",
          //      name: "Calculus for Computing",
          //      MCs: 4,
          //      link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
          //      {
          //        code: "GER1000",
          //        name: "Quantitative Reasoning",
          //        MCs: 4
          //      },
          //      {
          //       code: "CS1101S",
          //       name: "Programming Methodology",
          //       MCs: 4
          //     }
          //     ]},
          //   {specialisationModules: [
          //     {code: "MA1531",
          //      name: "Calculus not Computing",
          //      MCs: 4,
          //      link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
          //      {code: "MA1531",
          //      name: "Calculus not Computing",
          //      MCs: 4,
          //      link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}
          //   ]},
          //   {unrestrictedModules: [{code: "MA1521",
          // name: "Calculus for Computing",
          // MCs: 4,
          // link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
          // ]},

          // //y1s2 4
          // {coreModules: [
          //   {
          //     code: "CS2030",
          //     name: "Programming Methodology II",
          //     MCs: 4
          //   },
          //   {
          //     code: "CS2040",
          //     name: "Data Structures and Algorithms",
          //     MCs: 4
          //   },
          //   {
          //     code: "IS1103",
          //     name: "IS Innovations in Organisations and Society",
          //     MCs: 4
          //   },
          //   {
          //     code: "GEH1000",
          //     name: "Cultural Diversity in ASEAN",
          //     MCs: 4
          //   },
          //   {
          //     code: "GEQ1000",
          //     name: "Asking Questions",
          //     MCs: 4
          //   },
          //   ]},
          //   //y2s1 5
          //   {coreModules: [
          //     {
          //       code: "GET1000",
          //       name: "Ethics at Work: Rhyme, Reason and Reality",
          //       MCs: 4
          //     },
          //     {
          //       code: "GES1000",
          //       name: "Labour Law in Singapore",
          //       MCs: 4
          //     },
          //     ]},

          //     //y2s2 6
          //     {coreModules: [
          //       {
          //         code: "CS2100",
          //         name: "Computer Organisation",
          //         MCs: 4
          //       },
          //       {
          //         code: "CS2103T",
          //         name: "Software Engineering",
          //         MCs: 4
          //       },
          //       {
          //         code: "CS2106",
          //         name: "Introduction to Operating Systems",
          //         MCs: 4
          //       },
          //       {
          //         code: "CS3230",
          //         name: "Design and Analysis of Algorithms",
          //         MCs: 4
          //       },
          //       ]},

          //       // y3s1 7
          //       {coreModules: [
          //         {
          //           code: "CP4101",
          //           name: "B.Comp. Dissertation",
          //           MCs: 12
          //         },
          //         {
          //           code: "CS3236",
          //           name: "Introduction to Information Theory",
          //           MCs: 4
          //         },
          //         {
          //           code: "CS4231",
          //           name: "Parallel and Distributed Algorithms",
          //           MCs: 4
          //         },
          //         {
          //           code: "CS4234",
          //           name: "Optimisatin Algorithms",
          //           MCs: 4
          //         },
          //         {
          //           code: "CS3203",
          //           name: "Software Engineering Project",
          //           MCs: 8
          //         },

          //         ]},

          //         // y3s2 8
          //         {coreModules: [
          //           {
          //             code: "CP3880",
          //             name: "Advanced Technology Attachment Programme",
          //             MCs: 12
          //           },
          //           ]},

          //           // y4s1 9
          //           {coreModules: [
          //             {
          //               code: "ST2334",
          //               name: "Probability and Statistics",
          //               MCs: 4
          //             },
          //             ]},

          //             // y4s2 10
          //             {coreModules: [
          //               {
          //                 code: "ES2660",
          //                 name: "Communicating in The Information Age",
          //                 MCs: 4
          //               },
          //               {
          //                 code: "CS2101",
          //                 name: "Effective Communication for Computing",
          //                 MCs: 4
          //               },
          //               {
          //                 code: "CM1121",
          //                 name: "Organic Chemistry 1",
          //                 MCs: 4
          //               },
          //               ]},

































          // ],
          // dummyrules: [{name: "ULR",
          //               tag: "ULR_2018",
          //               requirements: {"and": [{name: "Complete Quantitative Reasoning",
          //                                     tag: "GER",
          //                                     requirements: {"and": [
          //                                                           {name: "Complete GER1000",
          //                                                            tag: "GER1000",
          //                                                            module: {code: "GER1000",
          //                                                                     name: "Quantitative Reasoning",
          //                                                                     MCs: 4}
          //                                                           }
          //                                                         ]
          //                                                   }
          //                                       },
    
          //                                       {name: "Complete Human Culture",
          //                                        tag: "GEH",
          //                                        requirements: {"or": [{name: "Complete Globalisation and New Media",
          //                                                               tag: "GEH1001",
          //                                                             module: {code: "GEH1001",
          //                                                                      name: "Globalisation and New Media",
          //                                                                      MCs: 4}
          //                                                               },
                                     
          //                                                               {name: "Complete Economic Issues in Dev World",
          //                                                                tag: "GEH1001",
          //                                                                module: {code: "GEH1001",
          //                                                                         name: "Globalisation and New Media",
          //                                                                         MCs: 4}
          //                                                                        }
          //                                                               ]
          //                                                       },
          //                                       }
          //                                     ]
          //                               }
          //               },
    
          //              {name: "Core Modules",
          //               tag: "Core Modules 2018",
          //               requirement: {"and": [
          //                                     {name: "Computer Science Foundation",
          //                                      tag: "cs_foundation_2018",
          //                                      requirement: {"and": [
          //                                                             {name: "Complete GER1000",
          //                                                             tag: "GER1000",
          //                                                             module: {code: "GER1000",
          //                                                                      name: "Quantitative Reasoning",
          //                                                                      MCs: 4}
          //                                                             },
    
          //                                                             {name: "Complete GER1000",
          //                                                              tag: "GER1000",
          //                                                              module: {code: "GER1000",
          //                                                                       name: "Quantitative Reasoning",
          //                                                                       MCs: 4}
          //                                                             },
    
          //                                                             {name: "Complete GER1000",
          //                                                            tag: "GER1000",
          //                                                            module: {code: "GER1000",
          //                                                                     name: "Quantitative Reasoning",
          //                                                                     MCs: 4}
          //                                                           },
    
          //                                                           {name: "Complete GER1000",
          //                                                            tag: "GER1000",
          //                                                            module: {code: "GER1000",
          //                                                                     name: "Quantitative Reasoning",
          //                                                                     MCs: 4}
          //                                                           }
          //                                                           ]
          //                                                   }
          //                                       },
    
          //                                      {name: "Computer Science Breadth and Depth",
          //                                      tag: "cs_foundation_2018",
          //                                      requirement: {"condition": {"at least": [{rule: "CS Focus Area"}, {MCs: 12, minLevel: 4000}]},
                                                 
          //                                       "or": [ {name: "CS Focus Area",
          //                                                              tag: "GER1000",
          //                                                              requirement: { 
          //                                                                             "or" : [
          //                                                                                       {
          //                                                                                         name: "Algorithms and Theory",
          //                                                                                         tag: "algorithms",
          //                                                                                         requirement: { "condition": {"at least": [{number: 3,
          //                                                                                                                                   level: "any"},
          //                                                                                                                                   {number: 1,
          //                                                                                                                                   level: 4000}
          //                                                                                                                                  ] 
          //                                                                                                                     },
          //                                                                                                         "or": [{name: "Ger1000",
          //                                                                                                               tag: "GER1000",
          //                                                                                                               module: {code: "GER1000",
          //                                                                                                                        name: "Quantitative Reasoning",
          //                                                                                                                        MCs: 4}
                                                                                                                                
          //                                                                                                                },
          //                                                                                                                {name: "Complete GER1000",
          //                                                                                                                 tag: "GER1000",
          //                                                                                                                 module: {code: "GER1000",
          //                                                                                                                         name: "Quantitative Reasoning",
          //                                                                                                                         MCs: 4}
                                                                                                                                
          //                                                                                                                },
          //                                                                                                                {name: "Complete GER1000",
          //                                                                                                               tag: "GER1000",
          //                                                                                                               module: {code: "GER1000",
          //                                                                                                                        name: "Quantitative Reasoning",
          //                                                                                                                        MCs: 4}
                                                                                                                                
          //                                                                                                                },
          //                                                                                                                {name: "Complete GER1000",
          //                                                                                                               tag: "GER1000",
          //                                                                                                               module: {code: "GER1000",
          //                                                                                                                        name: "Quantitative Reasoning",
          //                                                                                                                        MCs: 4}
                                                                                                                                
          //                                                                                                                },
          //                                                                                                                {name: "Complete GER1000",
          //                                                                                                                 tag: "GER1000",
          //                                                                                                                 module: {code: "GER1000",
          //                                                                                                                        name: "Quantitative Reasoning",
          //                                                                                                                        MCs: 4}
                                                                                                                                  
          //                                                                                                                },
          //                                                                                                               ]
          //                                                                                                       }
          //                                                                                       }
          //                                                                                     ]
          //                                                                                   }
          //                                                                                 },
                                                                                          
          //                                                                 {name: "CP-coded",
          //                                                                  tag: "CP-coded",
          //                                                                  requirement: {"condition": {
          //                                                                                               "at most": {MCs: 12, 
          //                                                                                                           minLevel: 4000}
          //                                                                                             },
          //                                                                                 "or": [
          //                                                                                         {
          //                                                                                           name: "Complete GER1000",
          //                                                                                                               tag: "GER1000",
          //                                                                                                               module: {code: "GER1000",
          //                                                                                                                        name: "Quantitative Reasoning",
          //                                                                                                                        MCs: 4}
          //                                                                                         },
    
          //                                                                                         {
          //                                                                                           name: "Complete GER1000",
          //                                                                                                               tag: "GER1000",
          //                                                                                                               module: {code: "GER1000",
          //                                                                                                                        name: "Quantitative Reasoning",
          //                                                                                                                        MCs: 4}
          //                                                                                         }
          //                                                                                 ] 
          //                                                                               }                        
          //                                                                 }
          //                                                     ]}
          //                                               },
    
          //                                      {name: "Industrial Experience Requirement",
          //                                      tag: "cs_foundation_2018",
          //                                      requirement: {}},
    
          //                                      {name: "IT Professionalism",
          //                                      tag: "cs_foundation_2018",
          //                                      requirement: {}}
          //               ]}},
          //              {unrestrictedModules: {} }
          //             ],
          
        //  summary: [{cat: "General Elective Module",
        //             MCs: 0},
        //             {cat: "Core Module",
        //             MCs: 0},
        //             {cat: "Specialisation Module",
        //             MCs: 0},
        //             {cat: "Unrestricted Module",
        //             MCs: 0}],
        // grandTotal: 0,
    
    
        
        // this.changeFaculty = this.changeFaculty.bind(this);
        // this.changeMajor=this.changeMajor.bind(this);
        // this.changeSpecialisation= this.changeSpecialisation.bind(this);
        // this.changeResidence= this.changeResidence.bind(this);
        // this.generateOptions =this.generateOptions.bind(this);
      //   this.makeTable = this.makeTable.bind(this);
      //   this.generateDropDown = this.generateDropDown.bind(this);
      //   this.handleClick = this.handleClick.bind(this);
      //   this.countModule = this.countModule.bind(this);
      //   this.getDropdownMCs = this.getDropdownMCs.bind(this);
      //   this.receiveModuleRules=this.receiveModuleRules.bind(this);
    //   // }
      
    //   componentDidMount() {
    //     // Call our fetch function below once the component mounts
    //   this.callBackendAPI()
    //     .then(res => this.setState({ data: res.express }))
    //     .catch(err => console.log(err));
    // }
    //   // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    // callBackendAPI = async () => {
    //   const response = await fetch('http://localhost:5001/');
    //   const body = await response.json();
    
    //   if (response.status !== 200) {
    //     throw Error(body.message) 
    //   }
    //   return body;
    // };
    
      //receive the choice of faculty from module.js and change state of faculty
    //   changeFaculty(value, index) {
    //     this.setState({
    //       faculty: value,
    //       facIndex: index,
    //       major: null
    //     });
    //   }
    
    //   changeMajor(value, index) {
    //     this.setState({
    //       major: value,
    //       majorIndex: index
    //     });
    //   }
    
    //   changeSpecialisation(value) {
    //     this.setState({
    //       specialisation: value,
    //     });
    //   }
    //   changeResidence(value) {
    //     this.setState({
    //       residence: value,
    //     });
    //   }
    
    //   //turn array of choices into options dropdown
    //   generateOptions(choices) {
    //     let facIndex = this.state.facIndex;
    //   if(choices === 'faculty'){
    //     return this.state.dummyfac.map((obj) => {
    //       return (
    //       <option value={Object.keys(obj)}>
    //         {Object.keys(obj)}
    //       </option>
    //       );
    //     });
    //   } else if(choices === 'major') {
    //       if(this.state.faculty) {
    //     return this.state.dummyfac
    //            [facIndex]
    //            [this.state.faculty].map((obj) => {
    //                   return (
    //                     <option value={Object.keys(obj)}>
    //                       {Object.keys(obj)}
    //                     </option>
    //                   )
    //               }
    //     )}
    //   } else if(choices === 'specialisation') {
    //       if(this.state.major && this.state.faculty) {
    //       return this.state.dummyfac
    //              [facIndex]
    //              [this.state.faculty][this.state.majorIndex][this.state.major].map((item) => {
    //                   return (
    //                     <option>
    //                       {item}
    //                     </option>
    //                   )
    //                 }    
    //       )}
    //   } else {
    //     return this.state.residenceOptions.map((obj) => {
    //       return (
    //       <option value={obj}>
    //         {obj}
    //       </option>
    //       );
    //     });
    //   }
    // }
    
      //takes in array of objects for modules and return a table
    //   makeTable(item, moduleCat, index) {
    //     if(item === 'summary') {
    //       return this.state.summary.map((module) => {
    //       const { cat, MCs } = module;
    //       return(
    //         <div>
    //           <tr key={cat}>
    //             <td>{cat}</td>
    //             <td>{MCs + 'MCs'}</td>
    //           </tr>
    //         </div>
    //       )
    //       }
    //     )}
    
    //     else{
    //     let propfunction;
    //       if (item === 'coreModule'){
    //         propfunction = this.state.dummymodules[1].coreModules;
    //       }
    //       else if(item === 'specialisation') {
    //         propfunction = this.state.dummymodules[2].specialisationModules;
    //       } 
    //       else if(item === 'unrestricted') {
    //         propfunction = this.state.dummymodules[3].unrestrictedModules;
    //       } 
    //       else {
    //         propfunction = this.state.dummymodules[0].GEMs[index][moduleCat]
    //       }
    
    //    return propfunction.map((module) => {
    //         const { code, name, MCs} = module
    //         const desc = name.replace(/ /g, '-');
    //         const link = `https://nusmods.com/modules/${code}/${desc}`
    //         if(item === 'GEM') {
    //           return (
    //             <div>
    //                 <tr key={code} data-toggle="tooltip" 
    //                     title="Click row to select module, click on the module code for more information"
    //                     onClick={() => this.handleClick(code, name, MCs, moduleCat)}
    //                     >
    //                     <a href={link}
    //                       target="_blank"
    //                       rel="noopener noreferrer"
    //                       className="text-decoration-none">
    //                     <td>{code}</td>
    //                     </a>
    //                     <td>{name}</td>
    //                     <td>{MCs + 'MCs'}</td>
    //                 </tr>
    //             </div>
    //         )
    //         } else{
    //         return (
    //             <div>
    //                 <tr key={code} >
    //                 <a href={link} 
    //                            target="_blank" 
    //                            rel="noopener noreferrer"
    //                            className="text-white text-decoration-none">
    //                     <td>{code}</td>
    //                     <td>{name}</td>
    //                     <td>{MCs + 'MCs'}</td>
    //                     </a>
    //                 </tr>
    //             </div>
    //         )}
    //    })
    //   }
    // }
    
  useEffect(() => {
    if(!isEmpty(props.settings.userInfo.modPlan) && isEmpty(props.modplan.selectedModules)) {
        console.log(props.modplan.selectedModules)
        props.setSelectedModules(null, props.settings.userInfo.modPlan)
    }
  }, [props.settings.userInfo])
    
  const handleClick = (code, name, MCs, moduleCat) => {
        const title = code + ': ' + name;
        this.setState({GEMTitle: title,
                       MCTemp: MCs,
                        moduleCat: moduleCat});
      }
    
  const countModule = () => {
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
    
      // takes in array of objects for modules and return a table
  const makeTable = (item, moduleCat, index) => {
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
          } else if(item === 'y1s1') {
            propfunction = this.state.dummymodules[1].coreModules;
          } else if(item === 'y1s2') {
            propfunction = this.state.dummymodules[4].coreModules;
          } else if(item === 'y2s1') {
            propfunction = this.state.dummymodules[5].coreModules;
          } else if(item === 'y2s2') {
            propfunction = this.state.dummymodules[6].coreModules;
          } else if(item === 'y3s1') {
            propfunction = this.state.dummymodules[7].coreModules;
          } else if(item === 'y3s2') {
            propfunction = this.state.dummymodules[8].coreModules;
          } else if(item === 'y4s1') {
            propfunction = this.state.dummymodules[9].coreModules;
          } else if(item === 'y4s2') {
            propfunction = this.state.dummymodules[10].coreModules;
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

  return (
    <div class="full-container">
      {!isEmpty(props.settings.userInfo.matriculationYear) 
                && generateObject(props.settings.userInfo.matriculationYear, 
                        props.settings.userInfo.targetGradYear,
                        "tables")}
      {/* <div className="row">
        <h1 className="display-3 ml-4">
          Module Information
        </h1>
      </div>

      <div className="row"> 

      <div className="col-lg col-md-4 col-sm-6">
        <Table
              title="Year 1 Semester 1"
              module={makeTable('y1s1')} />
      </div>

      <div className="col-lg col-md-4 col-sm-6">
        <Table
              title="Year 1 Semester 2"
              module={makeTable('y1s2')} />
      </div>

      <div className="col-lg col-md-4 col-sm-6">
        <Table
              title="Year 2 Semester 1"
              module={makeTable('y2s1')} />
      </div>

      <div className="col-lg col-md-4 col-sm-6">
        <Table
              title="Year 2 Semester 2"
              module={makeTable('y2s2')} />
      </div>

      </div>


      <div className="row"> 
        <div className="col-lg col-md-4 col-sm-6">
          <Table
                title="Year 3 Semester 1"
                module={makeTable('y3s1')} />
        </div>

        <div className="col-lg col-md-4 col-sm-6">
          <Table
                title="Year 3 Semester 2"
                module={makeTable('y3s2')} />
        </div>


          
        <div className="col-lg col-md-4 col-sm-6">
          <Table
                title="Year 4 Semester 1"
                module={makeTable('y4s1')} />
        </div>

        <div className="col-lg col-md-4 col-sm-6">
          <Table
                title="Year 4 Semester 2"
                module={makeTable('y4s2')} />
        </div>
      
      </div> */}
  </div>
  )
}

ModuleSelectionPage.propTypes = {
  modplan: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  modplan: state.modplan,
  settings: state.settings
});

export default connect(mapStateToProps) 
                  (ModuleSelectionPage);