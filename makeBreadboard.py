import json

with open("./amplify/backend/api/xschema/schema.graphql") as fp:
    lines = fp.readlines()

queries = "import {"
mutations = "import {"

body = "{"

server_typedefs = "const typeDefs = gql`"

for line in lines:
    line = line.replace("\n", "")
    if "type" in line:
        nodeName = line.split(" ")[1]
        at_index = line.index("@") if "@" in line else -1
        server_typedefs += line[:at_index] + "{\n"
        queries += f"list{nodeName}s, "
        mutations += f"update{nodeName}, create{nodeName}, delete{nodeName}, "
        body += "\n".join([
            f"{nodeName}: " + "{", 
            f"  createMutation: gql(create{nodeName}),",
            f"  updateMutation: gql(update{nodeName}),",
            f"  deleteMutation: gql(delete{nodeName}),",
            f"  listQuery: gql(list{nodeName}s),",
             "  fields: ["
        ])
    elif ":" in line:
        line = line.replace(" ","")
        at_index = line.index("@") if "@" in line else -1
        server_typedefs += line[:at_index] + "\n"        
        if "@connection" in line:
            field_by_type, connection_info = line.split("@connection")
            connection_info = connection_info[1:-1] # remove the ( and )
            name, gql_type = field_by_type.split(":")
            field_data = "{" + f"name: '{name}', gqlType: " + "{" + f"type: '{gql_type}', "
            
            if "keyName" in connection_info:
                upper_field_name = name[0].upper() + name[1:]
                camel_node_name = nodeName[0].lower() + nodeName[1:]
                field_data += "'connectionType': 'oneToManyConnection', "
                field_data +=  "query: (id) => ["
                field_data += f"gql(list{upper_field_name}), "
                field_data +=  "{"
                field_data +=  "pollInterval: 50, "
                field_data +=  "variables: {"
                field_data +=  "filter: {"
                field_data += f"{camel_node_name}ID: "
                field_data += "{eq: id}}}}]"
                if "listPostss" in field_data:
                    import pdb; pdb.set_trace()
            else:
                upper_field_name = name[0].upper() + name[1:]
                camel_node_name = nodeName[0].lower() + nodeName[1:]
                field_data += "'connectionType': 'oneToOneConnection', "
                field_data +=  "query: (id) => ["
                field_data += f"gql(list{upper_field_name}s), "
                field_data +=  "{"
                field_data +=  "pollInterval: 50, "
                field_data +=  "variables: {"
                field_data +=  "filter: {"
                field_data +=  "id: {eq: id}}}}]"
            field_data += "}},"
            
        else:
            field_by_type, connection_info = line, None
            name, gql_type = field_by_type.split(":")
            field_data = "{" + f"name: '{name}', gqlType: " + "{" + f"type: '{gql_type}'"
            field_data += "}},"
            
        body += "\n    " + field_data 
    elif line == "}":
        body += "\n]\n},\n"
        server_typedefs += "}\n"
body += "}"
server_typedefs += "`;\n"

queries += "} from '../graphql/queries';\n"
mutations += "} from '../graphql/mutations';\n"

#import { listBlogs, listPosts, listComments, listReplys, listPoles } from '../graphql/queries';
#import {updateBlog, createBlog, deleteBlog, createPost, updatePost, deletePost, createPole, updatePole, deletePole, createComment, updateComment, deleteComment, createReply, updateReply, deleteReply } from '../graphql/mutations'
"import { gql } from 'apollo-boost'\n"

with open('./src/graphql/xschema.js', "w") as fp:
    fp.write(queries)
    fp.write(mutations)
    fp.write("import { gql } from 'apollo-boost'\n\n")
    fp.write("export const xschema = ")
    fp.write(body)

server_head = "const { ApolloServer, gql } = require('apollo-server');"

with open('../x-schema-server/index.js', "w") as fp:
