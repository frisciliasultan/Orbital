<Router>
           <Nav />
            <Switch>
              <Route path="/login" component={ Login } />
              <Route path="/select-modules" component={SelectModules} />
              <Route path="/module-list" component={ModuleList} />
              <Route path="/module-planner" component={ModulePlanner} />
              <Route path="/customise-your-own-planner" component={Customise} />
            </Switch>
          </Router>



dummyfac: [{'Business': [{'Business Administration': ['A', 'B']},
                                {'Accountancy': ['C', 'D']}]},
                {'FASS': [{'C': ['N/A']},
                          {'D': ['N/A']}]}],



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



//POST REQUEST
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
                          
                          const response = await fetch('http://172.31.21.121:5000/', request)
                              .then(async response => {
                                const data = await response.json();
                                 // check for error response
                                 if (!response.ok) {
                                  // get error message from body or default to response status
                                  throw new Error(data.message)
                                }
                      
                                return data;
                              })
                              .then(data => console.log(data))
                      
                            .catch(error => {
                              alert('nooope');
                              console.error('There was an error!', error);
                          });


<div>
                <h1 className="display-3">Module Planner</h1>

                <Card style={{ width: '35rem' }}>
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">0 MCs</Card.Subtitle>

                    <div className="row">

                      <div className="col">
                      <Card style={{width: '16rem'}}>
                        <Card.Body>
                        <Card bg="primary" style={{ width: '13rem'}}>
                        <Card.Title><strong>CS1101S: </strong> Programming Methodology</Card.Title>
                        <Card.Subtitle>4MCs</Card.Subtitle>

                        <Card bg="success" style={{ width: '13rem'}}>
                        <Card.Title><strong>CS1101S: </strong> Programming Methodology</Card.Title>
                        <Card.Subtitle>4MCs</Card.Subtitle>
                    </Card>
                        </Card>
                        </Card.Body>
                      </Card>

                      </div>

                      <div className="col">
                      
                      <Card bg="primary" style={{ width: '16rem'}}>
                      <Card.Title><strong>CS1101S: </strong> Programming Methodology</Card.Title>
                      <Card.Subtitle>4MCs</Card.Subtitle>
                    </Card>
                    <Card bg="success" style={{ width: '16rem'}}>
                      <Card.Title><strong>CS1101S: </strong> Programming Methodology</Card.Title>
                      <Card.Subtitle>4MCs</Card.Subtitle>
                    </Card>
                      </div>
                    </div>
                    
                            <Button>Add Module</Button>

                  </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Year 1 Semester 1</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">0 MCs</Card.Subtitle>
                    <Card.Text>
                      Hello
                    </Card.Text>
                            <Button>Add Module</Button>

                  </Card.Body>
                </Card>

                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Year 2 Semester 1</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">0 MCs</Card.Subtitle>
                    <Card.Text>
                      Hello
                    </Card.Text>
                            <Button>Add Module</Button>

                  </Card.Body>
                </Card>

            </div>




<div class="scrolling-wrapper">
            <div className="row">

                <Card class="card" style={{width: '16rem'}}>
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                  </Card.Body>
                </Card>


                <Card class="card">
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                  </Card.Body>
                </Card>


                <Card class="card">
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                  </Card.Body>
                </Card>
            
                <Card class="card">
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                  </Card.Body>
                </Card>
              
                <Card class="card">
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                  </Card.Body>
                </Card>
           
                <Card class="card">
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                  </Card.Body>
                </Card>
              
                <Card class="card">
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                  </Card.Body>
                </Card>
    
                <Card class="card">
                  <Card.Body>
                    <Card.Title>Year 1</Card.Title>
                  </Card.Body>
                </Card>

            </div>
          </div>

                        