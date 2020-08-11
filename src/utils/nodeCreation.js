import React from 'react';
import uuid from "uuid";
import FAB from '../widgets/FAB';
import { gql, useMutation } from '@apollo/client';
import _ from 'lodash';
import { xschema } from '../graphql/xschema';


const ADD_TODO = gql`
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      name
    }
  }
`

function initialiseNode(nodeName, nodeSchema, parentNode) {
    console.log("initialising node", nodeName, nodeSchema, parentNode)
    const input = {id: uuid.v4()}

    nodeSchema.fields.filter(field => field.gqlType.type == "String!").forEach(field => input[field.name] = "    ")

    if (parentNode.name == null) {
        return input 
    }
    
    const parentField = nodeSchema.fields.filter((field) => field.gqlType.type == parentNode.name)[0]
    const linkingField = parentField.name + "ID"

    input[linkingField] = parentNode.id
    return input
}

export function CreateNode(props) {
    console.log("Create node", props)
    const nodeSchema = xschema[props.selectedNode.name]
    console.log("Create node", props)
    const [mutate, { data }] = useMutation(ADD_TODO);

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