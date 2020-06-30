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