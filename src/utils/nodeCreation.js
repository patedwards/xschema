import React from 'react';
import uuid from "uuid";
import FAB from '../widgets/FAB';
import { useMutation } from '@apollo/client';
import _ from 'lodash';
import { xschema } from '../graphql/xschema';


function initialiseNode(nodeName, nodeSchema, parentNode) {
    console.log("initialising node", nodeName, nodeSchema, parentNode)
    const input = {id: uuid.v4()}

    nodeSchema.fields.filter(field => field.gql == "String!").forEach(field => input[field.name] = "    ")

    if (parentNode.name == null) {
        return input 
    }
    
    const parentField = nodeSchema.fields.filter((field) => field.gql.type == parentNode.name)[0]
    const linkingField = parentField.name + "ID"

    input[linkingField] = parentNode.id
    return input
}

export function CreateNode(props) {
    console.log("Create node", props)
    const nodeSchema = xschema[props.selectedNode.name]
    const [mutate] = useMutation(nodeSchema.createMutation);

    function handleClick() {
        const input = initialiseNode(props.selectedNode.name, nodeSchema, props.parentNode)
        console.log("Initialising", input)
        mutate(
            {
                variables: {
                    input
                }
            }     
        )
    }

    return (
        <FAB onClick={handleClick}/>
    )
}