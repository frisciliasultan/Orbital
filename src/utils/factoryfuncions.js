// export const createNamespaceReducer = (namespace) => 
//     (reducerFunction, actions) => (state, action)

export const createNamedReducer = (reducerFunction, reducerName) => 
    (state, action) => {
        const { name } = action;
        const isInitializationCall = (state === undefined);
        
        if (name !== reducerName && !isInitializationCall) {
            return state;
        } 

        return reducerFunction(state, action)
    }

export const createNamedActions = (namespace) => (actionCreator)
    => (...actionArgs) => { 
        const action = actionCreator(...actionArgs);
        return { ...action, namespace}; 
    };

