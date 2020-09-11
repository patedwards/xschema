import React from 'react';
import uuid from "uuid";
import FAB from '../widgets/FAB';
import { gql, useMutation } from '@apollo/client';
import _ from 'lodash';
import { xschema } from '../graphql/xschema';




function initialiseNode(nodeName, nodeSchema, parentNode) {
    console.log("initialising node", nodeName, nodeSchema, parentNode)
    const input = {id: uuid.v4()}

    nodeSchema.fields.filter(field => field.gqlType.type == "String!").forEach(field => input[field.name] = "    ")

    const parentField = nodeSchema.fields.filter((field) => field.gqlType.type == parentNode.name)[0]
    if (parentField == null) {
        return input 
    }
    
    
    const linkingField = parentField.name + "ID"

    input[linkingField] = parentNode.id
    return input
}

/*

const data = client.readQuery({ query: xschema.Blog.listQuery });

console.log("The data", data)

client.writeQuery({
  query: xschema.Blog.listQuery,
  data: {
    listBlogs: {
      items: [
        {
          __typename: "Blog",
          id: "12345",
          name: "TEMP"
        }
      ]
    },
  },
})


*/

export function CreateNode(props) {
    console.log("Create node", props)
    const nodeSchema = xschema[props.selectedNode.name]
    console.log("Create node", props)
    const [mutate, { data }] = useMutation(nodeSchema.createMutation);

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
        console.log("Done init", input)
    }

    return (
        <FAB onClick={handleClick}/>
    )
}