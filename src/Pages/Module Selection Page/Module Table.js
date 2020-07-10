import React from "react";

export const Table = (props) => {

    let totalMCs = 0;

    const makeTable = () => {
        console.log('called')
        // console.log(props.module)
        console.log(props.title)
    //     let propfunction;
    //       if (item === 'coreModule'){
    //         propfunction = this.state.dummymodules[1].coreModules;
    //       }
    //       else if(item === 'specialisation') {
    //         propfunction = this.state.dummymodules[2].specialisationModules;
    //       } 
    //       else if(item === 'unrestricted') {
    //         propfunction = this.state.dummymodules[3].unrestrictedModules;
    //       } else if(item === 'y1s1') {
    //         propfunction = this.state.dummymodules[1].coreModules;
    //       } else if(item === 'y1s2') {
    //         propfunction = this.state.dummymodules[4].coreModules;
    //       } else if(item === 'y2s1') {
    //         propfunction = this.state.dummymodules[5].coreModules;
    //       } else if(item === 'y2s2') {
    //         propfunction = this.state.dummymodules[6].coreModules;
    //       } else if(item === 'y3s1') {
    //         propfunction = this.state.dummymodules[7].coreModules;
    //       } else if(item === 'y3s2') {
    //         propfunction = this.state.dummymodules[8].coreModules;
    //       } else if(item === 'y4s1') {
    //         propfunction = this.state.dummymodules[9].coreModules;
    //       } else if(item === 'y4s2') {
    //         propfunction = this.state.dummymodules[10].coreModules;
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
            return (
                props.module.filter((object, i) => object.location === props.title)
                .map((object, i) => {
                        const {moduleCode, title, moduleCredit} = object;
                        const desc = title.replace(/ /g, '-');
                        const link = `https://nusmods.com/modules/${moduleCode}/${desc}`
                        totalMCs += Number(object.moduleCredit);
                        return (
                            <tr key={moduleCode} >
                            <a href={link} 
                                       target="_blank" 
                                       rel="noopener noreferrer"
                                       className="text-white text-decoration-none">
                                <td>{moduleCode}</td>
                                <td>{title}</td>
                                <td>{moduleCredit + 'MCs'}</td>
                                </a>
                            </tr>)})   
            )}
    //    })
    //   }
    // }

        return (
            <div>
                <h3>{props.title}</h3>
                <table className="table table-hover settings-table">
                    <tbody>
                        {makeTable()}
                    </tbody>
                </table>
            </div>
        )
}




