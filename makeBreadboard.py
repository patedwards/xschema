import json

xschema = {
    "Blog": {
        "reactComponent": "NodeCard",
        "fields": [
            {"name": "id",
                "gql": "ID!",
                "reactComponent": "MakeUUID"
            },
            {"name": "name",
                "gql": "String!",
                "reactComponent": "TextField"
            },
            {"name": "posts",
                "gql": {
                    "type": "[Post]",
                    "connectionType": "oneToManyConnection",
                    "keyName": "byBlog",
                    "startField": ["Blog", "id"],
                },
                "reactComponent": "NodeList"
            },
            {"name": "poles",
                "gql": {
                    "type": "[Pole]",
                    "connectionType": "oneToManyConnection",
                    "keyName": "byBlog",
                    "startField": ["Blog", "id"],
                },
                "reactComponent": "NodeList"
            }
        }
    },
    "Post": {
        "modelParameters" : {"name": "byBlog", "fields": ["blogID"]},
        "reactComponent": "NodeCard",
        "fields": {
            "id": {
                "gql": "ID!",
                "reactComponent": "MakeUUID"
            },
            "title": {
                "gql": "String!",
                "reactComponent": "TextField"
            },
            "blogID": {
                "gql": "ID!",
                "reactComponent": "hidden"
            },
            "blog": {
                "gql": {
                    "type": "Blog",
                    "connectionType": "oneToOneConnection",
                    "startField": ["Post", "blogID"],
                },
                "reactComponent": "ParentLink"
            },
            "content": {
                "gql": "String!",
                "reactComponent": "TextField"
            },
            "comments": {
                "gql": {
                    "type": "[Comment]",
                    "connectionType": "oneToManyConnection",
                    "keyName": "byPost",
                    "startField": ["Post", "id"],
                },
                "reactComponent": "NodeList"
            }
        }
    },
    "Pole": {
        "modelParameters" : {"name": "byBlog", "fields": ["blogID"]},
        "reactComponent": "NodeCard",
        "fields": {
            "id": {
                "gql": "ID!",
                "reactComponent": "MakeUUID"
            },
            "title": {
                "gql": "String!",
                "reactComponent": "TextField"
            },
            "blogID": {
                "gql": "ID!",
                "reactComponent": "hidden"
            },
            "blog": {
                "gql": {
                    "type": "Blog",
                    "connectionType": "oneToOneConnection",
                    "startField": ["Pole", "blogID"],
                },
                "reactComponent": "ParentLink"
            },
            "content": {
                "gql": "String!",
                "reactComponent": "TextField"
            }
        }
    },
    "Comment": {
        "reactComponent": "NodeCard",
        "modelParameters" : {"name": "byPost", "fields": ["postID", "content"]},
        "fields": {
            "id": {
                "gql": "ID!",
                "reactComponent": "MakeUUID"
            },
            "postID": {
                "gql": "ID!",
                "reactComponent": "hidden"
            },
            "post": {
                "gql": {
                    "type": "Post",
                    "connectionType": "oneToOneConnection",
                    "startField": ["Comment", "postID"],
                    "endField": ["Post", "id"]
                },
                "reactComponent": "ParentLink"
            },
            "content": {
                "gql": "String!",
                "reactComponent": "TextField"
            },
        },
    },
    "Reply": {
        "reactComponent": "NodeCard",
        "modelParameters" : {"name": "byComment", "fields": ["commentID", "content"]},
        "fields": {
            "id": {
                "gql": "ID!",
                "reactComponent": "MakeUUID"
            },
            "commentID": {
                "gql": "ID!",
                "reactComponent": "hidden"
            },
            "comment": {
                "gql": {
                    "type": "Comment",
                    "connectionType": "oneToOneConnection",
                    "startField": ["Reply", "commentID"],
                    "endField": ["Comment", "id"]
                },
                "reactComponent": "ParentLink"
            },
            "content": {
                "gql": "String!",
                "reactComponent": "TextField"
            },
        }
    }
}

gql_string = ""

for node, node_data in xschema.items():
    gql_string += f"type {node} @model"
    if "modelParameters" in node_data:
        name = node_data["modelParameters"]["name"]
        fields = node_data["modelParameters"]["fields"]
        print(fields)
        gql_string += f" @key(name: \"{name}\", fields: {fields})"
    gql_string += " {\n"

    for field, field_data in node_data["fields"].items():
        gql_field = field_data["gql"]
        if type(gql_field) == str:
            gql_string += f"  {field}: {gql_field}\n"
        elif type(gql_field) == dict and field_data["gql"]["connectionType"] == "oneToOneConnection":
            """@connection(fields: ["blogID"])"""
            field_type = gql_field["type"]
            start_field = field_data["gql"]["startField"][1]
            gql_string += f"  {field}: {field_type} @connection(fields: [\"{start_field}\"])\n"
        elif type(gql_field) == dict and field_data["gql"]["connectionType"] == "oneToManyConnection":
            """@connection(keyName: "byBlog", fields: ["id"])"""
            field_type = gql_field["type"]
            start_field = field_data["gql"]["startField"][1]
            keyName = field_data["gql"]["keyName"]
            gql_string += f"  {field}: {field_type} @connection(keyName: \"{keyName}\", fields: [\"{start_field}\"])\n"
            

    gql_string += "}\n\n"

gql_string.replace("\'", "\"")

print(gql_string)