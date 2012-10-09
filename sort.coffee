merge = (array1, array2) ->
  sorted = []
  
  while array1.length or array2.length
    if array1.length and array2.length
      if array1[0] < array2[0]
        sorted.push array1.shift()
      else
        sorted.push array2.shift()
    else if array1.length
      sorted.push array1.shift()
    else if array2.length
      sorted.push array2.shift()
      
  return sorted
    
sort = (numbers) ->
  return numbers if numbers.length < 2
  
  middle = Math.ceil(numbers.length / 2)
  left = numbers.slice(0, middle)
  right = numbers.slice(middle)
  
  return merge(sort(left), sort(right));
  
console.log sort([2,1,4,3,3,10,11,0])