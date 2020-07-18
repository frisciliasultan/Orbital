import React, { useState } from "react";
import { Card} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCallBackendNow } from "../../actions/modplanActions";

function Subrules(props) {
    // const [isLoading, setIsLoading] = useState(false);
    // const [isRuleFulfilled, setIsRuleFulfilled] = useState();
    // const [isBackendCalled, setIsBackendCalled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const rule = props.rule;

    // useEffect(() => {
    //     const callBackendFunc = async (ruleTag) => {
    //         try{
    //             const link = "https://modtree-api.netlify.app/.netlify/functions/eval/";
    //             const requestOptions = {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json',
    //                             'accept': 'application/json'            
    //                 },
    //                 body: JSON.stringify({ plan: {modules: modules},
    //                                        tag: props.ruleTag
    //                                     })
    //             };
    //             setIsLoading(true);
                
                
    //             const response = await fetch(link, requestOptions);
    //             const status = await response.json();

    //             if(!response.ok) {
    //                 throw new Error("An error has occurred")
    //             } else {
    //                 setIsRuleFulfilled(status);
    //                 setIsLoading(false);
    //                 setIsBackendCalled(true);
    //             }

    //         } catch(error) {
    //                       setIsLoading(false);
    //                       console.error('There was an error!', error);
    //                     };
    //     };

    //     if(props.modplan.callBackendNow) {
    //             callBackendFunc(props.ruleTag);
    //             props.setCallBackendNow(false);
    //     } 
        
    // }, [props.modplan.callBackendNow]);

    return (    
        <div>
            <Card.Title 
                className="rule"
                onClick={() => setIsOpen(!isOpen)}
                style={{color: rule.evaluation ? 'green' : 'red', cursor: 'pointer'}}>{rule.name}</Card.Title>
            {isOpen && <Card.Subtitle>{rule.desc}</Card.Subtitle>}
            
        </div>
    )

}

Subrules.propTypes = {
    setCallBackendNow: PropTypes.func.isRequired,
    modplan: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    modplan: state.modplan
});

export default connect(mapStateToProps, { setCallBackendNow }) (Subrules);