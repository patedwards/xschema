import uuid from "uuid";

export function initialiseField(fieldInfo) {
    return fieldInfo.type == 'id' ? uuid.v4() : ""
}
  
export function fieldIsValidForInput(field) {
    return field.childrenNodeName == null && field.component != "parent-link"
}

export function initialiseNode(nodeInfo) {
    const input = {}
    const fieldsToInitialise = nodeInfo.fields.filter(field => fieldIsValidForInput(field))
    console.log("Testing", fieldsToInitialise)
    fieldsToInitialise.forEach(field => input[field.name] = initialiseField(field))
    return input
}