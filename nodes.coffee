node =
  name: 'node 1',
  children: [
    {
      name: 'node 2',
      children: [
        {
          name: 'node 4',
          children: [
            {
              name: 'node 5',
              children: []
            },
            {
              name: 'node 6',
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'node 3',
      children: []
    }
  ]

names = []

do getNames = (node) ->
  names.push(node.name)
  
  if node.children.length > 0
    getNames(item) for item in node.children
  
console.log names
  