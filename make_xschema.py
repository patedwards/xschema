valid_gql_types = set(["ID", "ID!", "String", "String!"])


"""

Go back to the drawing board a bit. Remember the goal here is to be able to write any component and have it get all the data it needs
from it's props.

A post Node should always know where to look for it's data:
 - it's own ID will pull the node data down via GQL
 - it can generate lists of GQL children and pass these to it's react child

"""

def make_amplify_header_string(index_node):
    if index_node is None:
        return "@model"
    return f"@model @key(name: \"by{index_node}\", fields: [\"{index_node}ID\"])"

def make_amplify_connection_string(this_node, connecting_node, connection_type):
    if connection_type == "oneToMany":
        return f"@connection(keyName: \"by{this_node}\", fields: [\"id\"])"
    return f"@connection(fields: [\"{connecting_node}ID\"])"

link = "server"
#link = "amplify"

xschema = {}

graph = {
    "Blog": {
        "id": "ID!",
        "name": "String!",
        "posts": ["Post"],
        "poles": ["Pole"],
    },
    "Post": {
        "id": "ID!",
        "title": "String!",
        "blogID": "ID!",
        "blog": "Blog",
        "content": "String!",
        "comments": ["Comment"]
    },
    "Pole": {
        "id": "ID!",
        "title": "String!",
        "blogID": "ID!",
        "blog": "Blog",
        "content": "String!",
    },
    "Comment": {
        "id": "ID!",
        "postID": "ID!",
        "post": "Post",
        "content": "String!",
        "replys": ["Reply"] 
    },
    "Reply": {
        "id": "ID!",
        "commentID": "ID!",
        "comment": "Comment", 
        "content": "String"
    }
}

schema_text = ""

header_amplify = "__header_amplify__"
header_apolloserver = "__header_apolloserver__"

body_amplify = "__body_amplify__"
body_apolloserver = "__body_apolloserver__"

for node_name, node_data in graph.items():
    node_data[header_amplify] = f"type {node_name} @model "
    node_data[header_apolloserver] = f"type {node_name} " + "{"

    node_data[body_amplify] = "  "
    node_data[body_apolloserver] = "  "

    for key, value in node_data.items():
        if key[:2] == "__":
            continue
        node_data[key] = { "gqlType" : f"\"{value}\"" }
        if type(value) == list and value[0] in valid_gql_types:
            continue
        elif type(value) == list and value[0] in graph.keys():
            node_data[key]["connection_type"] = "oneToMany"
            node_data[key]["connecting_node"] = value[0]
        elif value in graph.keys():
            node_data[key]["connection_type"] = "oneToOne"
            node_data[key]["connecting_node"] = value


xschema_body = "export const xschema = { " 

for node_name, node_data in graph.items():
    xschema_body += f"{node_name}: {{\n"
    xschema_body += f"  createMutation: gql(create{node_name}),\n"
    xschema_body += f"  updateMutation: gql(update{node_name}),\n"
    xschema_body += f"  deleteMutation: gql(delete{node_name}),\n"
    xschema_body += f"  listQuery: gql(list{node_name}s),\n"
    xschema_body +=  "  fields: [\n"
    for field_name, field_data in node_data.items():
        if field_name[:2] == "__":
            continue
        gql_type = field_data["gqlType"]
        gql_type = field_data["gqlType"]
        xschema_body += f"    {{name: '{field_name}', gqlType: {{type: {gql_type}"
        if field_data.get("connection_type") == "oneToMany":
              connecting_node = field_data["connecting_node"]
              xschema_body += f" ,connectionType: 'oneToManyConnection', "
              lower_node_name = node_name[0].lower() + node_name[1:]
              if link == "server":
                  xschema_body += f"query: (id) => [gql(list{connecting_node}s), {{pollInterval: 50, variables: {{{{lower_node_name}ID: id}}}}]}}}},\n"
              else:
                xschema_body += f"query: (id) => [gql(list{connecting_node}s), {{pollInterval: 50, variables: {{filter: {{{lower_node_name}ID: {{eq: id}}}}}}}}]}}}},\n"
        elif field_data.get("connection_type") == "oneToOne":
            xschema_body += f" ,connectionType: 'oneToOneConnection', "
            if link == "server":
                xschema_body += f"query: (id) => [gql(get{connecting_node}), {{pollInterval: 50, variables: {{id:  id}}}}]}}}},\n"
            else:
                xschema_body += f"query: (id) => [gql(get{connecting_node}), {{pollInterval: 50, variables: {{id:  {{eq: id}}}}}}]}}}},\n"
        else:
            xschema_body += "}},\n"
    xschema_body += "    ]\n  },\n"
xschema_body += "\n}"

print(xschema_body)